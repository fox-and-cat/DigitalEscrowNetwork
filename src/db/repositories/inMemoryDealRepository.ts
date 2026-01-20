import { Deal, CreateDealDto, UpdateDealDto } from '../models/deal';
import { DEAL_STATUS, DealStatus } from '../../config/constants';

export class InMemoryDealRepository {
  private deals: Map<string, Deal> = new Map();
  private sequenceCounter: number = 0;

  async init(): Promise<void> {
    console.log('📦 In-memory deal repository initialized');
  }

  generateDealId(): string {
    this.sequenceCounter++;
    return `DEN_DEAL_${this.sequenceCounter.toString().padStart(9, '0')}`;
  }

  async create(dto: CreateDealDto): Promise<Deal> {
    const now = new Date();
    const dealId = this.generateDealId();

    const deal: Deal = {
      dealId,
      initiatorId: dto.initiatorId,
      initiatorUsername: dto.initiatorUsername,
      counterpartyId: dto.counterpartyId,
      counterpartyUsername: dto.counterpartyUsername,
      buyerId: dto.buyerId,
      sellerId: dto.sellerId,
      amount: dto.amount,
      description: dto.description,
      status: DEAL_STATUS.WAITING_ACCEPT,
      createdAt: now,
      updatedAt: now,
    };

    this.deals.set(dealId, deal);
    return deal;
  }

  async findByDealId(dealId: string): Promise<Deal | null> {
    return this.deals.get(dealId) || null;
  }

  async findByUserId(userId: number): Promise<Deal[]> {
    const userDeals: Deal[] = [];
    
    for (const deal of this.deals.values()) {
      if (deal.initiatorId === userId || deal.counterpartyId === userId) {
        userDeals.push(deal);
      }
    }

    return userDeals.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async findActiveByUserId(userId: number): Promise<Deal[]> {
    const deals = await this.findByUserId(userId);
    
    return deals.filter(deal => 
      deal.status === DEAL_STATUS.WAITING_ACCEPT || 
      deal.status === DEAL_STATUS.TERMS_EDIT
    );
  }

  async update(dealId: string, dto: UpdateDealDto): Promise<Deal | null> {
    const deal = this.deals.get(dealId);
    
    if (!deal) {
      return null;
    }

    const updatedDeal: Deal = {
      ...deal,
      ...dto,
      updatedAt: new Date(),
    };

    this.deals.set(dealId, updatedDeal);
    return updatedDeal;
  }

  async updateStatus(dealId: string, status: DealStatus): Promise<Deal | null> {
    return this.update(dealId, { status });
  }

  // Debug методы
  getAllDeals(): Deal[] {
    return Array.from(this.deals.values());
  }

  clear(): void {
    this.deals.clear();
    this.sequenceCounter = 0;
  }

  getCount(): number {
    return this.deals.size;
  }
}