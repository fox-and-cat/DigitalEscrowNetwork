import { database } from '../db';
import { Deal, CreateDealDto } from '../db/models/deal';
import { DEAL_STATUS, DealStatus, USER_ROLES } from '../config/constants';

export interface CreateDealParams {
  initiatorId: number;
  initiatorUsername: string | null;
  counterpartyUsername: string;
  initiatorRole: 'buyer' | 'seller';
  amount: number;
  description: string;
}

export interface CreateDealResult {
  success: boolean;
  deal?: Deal;
  error?: string;
  counterpartyId?: number;
}

export class DealService {
  
  async createDeal(params: CreateDealParams): Promise<CreateDealResult> {
    const userRepo = database.userRepository!;
    const dealRepo = database.dealRepository!;

    // Найти контрагента
    const counterparty = await userRepo.findByUsername(params.counterpartyUsername);
    
    if (!counterparty) {
      return {
        success: false,
        error: 'counterparty_not_found',
      };
    }

    // Проверка на самого себя
    if (counterparty.userId === params.initiatorId) {
      return {
        success: false,
        error: 'self_deal',
      };
    }

    // Определить buyer и seller
    const buyerId = params.initiatorRole === 'buyer' 
      ? params.initiatorId 
      : counterparty.userId;
    
    const sellerId = params.initiatorRole === 'seller' 
      ? params.initiatorId 
      : counterparty.userId;

    // Создать сделку
    const dealDto: CreateDealDto = {
      initiatorId: params.initiatorId,
      initiatorUsername: params.initiatorUsername,
      counterpartyId: counterparty.userId,
      counterpartyUsername: params.counterpartyUsername,
      buyerId,
      sellerId,
      amount: params.amount,
      description: params.description,
    };

    const deal = await dealRepo.create(dealDto);

    console.log(`📝 Deal created: ${deal.dealId} by user ${params.initiatorId}`);

    return {
      success: true,
      deal,
      counterpartyId: counterparty.userId,
    };
  }

  async acceptDeal(dealId: string, userId: number): Promise<{
    success: boolean;
    deal?: Deal;
    error?: string;
  }> {
    const dealRepo = database.dealRepository!;
    
    const deal = await dealRepo.findByDealId(dealId);
    
    if (!deal) {
      return { success: false, error: 'deal_not_found' };
    }

    if (deal.counterpartyId !== userId) {
      return { success: false, error: 'not_authorized' };
    }

    if (deal.status !== DEAL_STATUS.WAITING_ACCEPT) {
      return { success: false, error: 'invalid_status' };
    }

    const updatedDeal = await dealRepo.updateStatus(dealId, DEAL_STATUS.TERMS_EDIT);
    
    console.log(`✅ Deal accepted: ${dealId} by user ${userId}`);

    return { success: true, deal: updatedDeal };
  }

  async declineDeal(dealId: string, userId: number): Promise<{
    success: boolean;
    deal?: Deal;
    error?: string;
  }> {
    const dealRepo = database.dealRepository!;
    
    const deal = await dealRepo.findByDealId(dealId);
    
    if (!deal) {
      return { success: false, error: 'deal_not_found' };
    }

    if (deal.counterpartyId !== userId) {
      return { success: false, error: 'not_authorized' };
    }

    if (deal.status !== DEAL_STATUS.WAITING_ACCEPT) {
      return { success: false, error: 'invalid_status' };
    }

    const updatedDeal = await dealRepo.updateStatus(dealId, DEAL_STATUS.DECLINED);
    
    console.log(`❌ Deal declined: ${dealId} by user ${userId}`);

    return { success: true, deal: updatedDeal };
  }

  async getActiveDeals(userId: number): Promise<Deal[]> {
    const dealRepo = database.dealRepository!;
    return dealRepo.findActiveByUserId(userId);
  }

  async getDealById(dealId: string): Promise<Deal | null> {
    const dealRepo = database.dealRepository!;
    return dealRepo.findByDealId(dealId);
  }

  getUserRoleInDeal(deal: Deal, userId: number): 'buyer' | 'seller' | null {
    if (deal.buyerId === userId) return 'buyer';
    if (deal.sellerId === userId) return 'seller';
    return null;
  }

  getCounterpartyUsername(deal: Deal, userId: number): string {
    if (deal.initiatorId === userId) {
      return deal.counterpartyUsername;
    }
    return deal.initiatorUsername || 'Unknown';
  }
}

export const dealService = new DealService();