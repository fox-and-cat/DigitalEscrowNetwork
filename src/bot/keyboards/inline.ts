import { InlineKeyboard } from 'grammy';
import { CALLBACK_DATA } from '../../config/constants';

export const agreementKeyboard = new InlineKeyboard()
  .text('✅ Accept', CALLBACK_DATA.ACCEPT_AGREEMENT)
  .text('❌ Decline', CALLBACK_DATA.DECLINE_AGREEMENT);

export const roleSelectionKeyboard = new InlineKeyboard()
  .text('🛒 Buyer', CALLBACK_DATA.SELECT_ROLE_BUYER)
  .row()
  .text('🛠 Seller', CALLBACK_DATA.SELECT_ROLE_SELLER);

export const mainMenuKeyboard = new InlineKeyboard()
  .text('➕ Create Deal', CALLBACK_DATA.CREATE_DEAL)
  .row()
  .text('📂 Active Deals', CALLBACK_DATA.ACTIVE_DEALS)
  .row()
  .text('📜 Deal History', CALLBACK_DATA.DEAL_HISTORY)
  .row()
  .text('❌ Cancel Deal', CALLBACK_DATA.CANCEL_DEAL);

export const backToMenuKeyboard = new InlineKeyboard()
  .text('⬅ Back to Menu', CALLBACK_DATA.BACK_TO_MENU);