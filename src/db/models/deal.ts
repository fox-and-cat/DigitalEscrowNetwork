import { DealStatus } from '../../config/constants';

export interface Deal {
  dealId: string;
  
  // Участники
  initiatorId: number;
  initiatorUsername: string | null;
  counterpartyId: number;
  counterpartyUsername: string;
  
  // Роли
  buyerId: number;
  sellerId: number;
  
  // Детали
  amount: number;
  description: string;
  
  // Статус
  status: DealStatus;
  
  // Метаданные
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDealDto {
  initiatorId: number;
  initiatorUsername: string | null;
  counterpartyId: number;
  counterpartyUsername: string;
  buyerId: number;
  sellerId: number;
  amount: number;
  description: string;
}

export interface UpdateDealDto {
  status?: DealStatus;
}