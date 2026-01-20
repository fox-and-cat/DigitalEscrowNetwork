import { InlineKeyboard } from 'grammy';
import { CREATE_DEAL_CB, DEAL_RESPONSE_CB, ACTIVE_DEALS_CB, CALLBACK_DATA } from '../../config/constants';
import { Deal } from '../../db/models/deal';

// Клавиатура отмены на первом шаге
export const cancelOnlyKeyboard = new InlineKeyboard()
  .text('❌ Cancel', CREATE_DEAL_CB.CANCEL);

// Клавиатура с Back и Cancel
export const backCancelKeyboard = new InlineKeyboard()
  .text('⬅ Back', CREATE_DEAL_CB.BACK)
  .text('❌ Cancel', CREATE_DEAL_CB.CANCEL);

// Выбор роли
export const roleSelectionKeyboard = new InlineKeyboard()
  .text('🛒 I am Buyer', CREATE_DEAL_CB.SELECT_ROLE_BUYER)
  .row()
  .text('🛠 I am Seller', CREATE_DEAL_CB.SELECT_ROLE_SELLER)
  .row()
  .text('⬅ Back', CREATE_DEAL_CB.BACK)
  .text('❌ Cancel', CREATE_DEAL_CB.CANCEL);

// Подтверждение сделки
export const confirmationKeyboard = new InlineKeyboard()
  .text('✅ Confirm', CREATE_DEAL_CB.CONFIRM)
  .row()
  .text('✏️ Edit', CREATE_DEAL_CB.EDIT)
  .row()
  .text('❌ Cancel', CREATE_DEAL_CB.CANCEL);

// Редактирование сделки
export const editKeyboard = new InlineKeyboard()
  .text('👤 Change counterparty', CREATE_DEAL_CB.EDIT_COUNTERPARTY)
  .row()
  .text('🎭 Change role', CREATE_DEAL_CB.EDIT_ROLE)
  .row()
  .text('💰 Change amount', CREATE_DEAL_CB.EDIT_AMOUNT)
  .row()
  .text('📝 Change description', CREATE_DEAL_CB.EDIT_DESCRIPTION)
  .row()
  .text('⬅ Back to summary', CREATE_DEAL_CB.BACK_TO_SUMMARY);

// Клавиатура для принятия/отклонения сделки
export function dealResponseKeyboard(dealId: string): InlineKeyboard {
  return new InlineKeyboard()
    .text('✅ Accept', `${DEAL_RESPONSE_CB.ACCEPT}${dealId}`)
    .text('❌ Decline', `${DEAL_RESPONSE_CB.DECLINE}${dealId}`);
}

// Клавиатура для списка активных сделок
export function activeDealsKeyboard(deals: Deal[]): InlineKeyboard {
  const keyboard = new InlineKeyboard();
  
  deals.forEach(deal => {
    keyboard.text(deal.dealId, `${ACTIVE_DEALS_CB.VIEW_DEAL}${deal.dealId}`).row();
  });
  
  keyboard.text('⬅ Back to Menu', CALLBACK_DATA.BACK_TO_MENU);
  
  return keyboard;
}

// Клавиатура для просмотра сделки
export const backToDealsKeyboard = new InlineKeyboard()
  .text('⬅ Back to Deals', CALLBACK_DATA.ACTIVE_DEALS)
  .row()
  .text('⬅ Back to Menu', CALLBACK_DATA.BACK_TO_MENU);