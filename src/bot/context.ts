import { Context, SessionFlavor } from 'grammy';
import { ConversationFlavor } from '@grammyjs/conversations';

// Данные создаваемой сделки
export interface CreateDealSession {
  counterpartyUsername?: string;
  role?: 'buyer' | 'seller';
  amount?: number;
  description?: string;
  step?: 'counterparty' | 'role' | 'amount' | 'description' | 'confirmation' | 'edit';
  messageId?: number;
}

// Структура сессии
export interface SessionData {
  createDeal?: CreateDealSession;
}

// Кастомный контекст
export type BotContext = Context & 
  SessionFlavor<SessionData> & 
  ConversationFlavor;