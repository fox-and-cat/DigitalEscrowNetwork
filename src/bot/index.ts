import { Bot, GrammyError, HttpError } from 'grammy';
import config from '../config';
import { CALLBACK_DATA, MESSAGES } from '../config/constants';
import { loggerMiddleware } from './middleware/logger';
import { 
  handleStart, 
  handleAgreementAccept, 
  handleAgreementDecline,
  handleRoleSelection 
} from './handlers/start';
import { handleMenu, handleBackToMenu } from './handlers/menu';
import {
  handleCreateDeal,
  handleActivDeals,
  handleDealHistory,
  handleCancelDeal,
  handleCreateDealCommand,
  handleActiveDealsCommand,
  handleDealHistoryCommand,
  handleCancelDealCommand
} from './handlers/commands';

export function createBot(): Bot {
  const bot = new Bot(config.botToken);

  // Middleware
  bot.use(loggerMiddleware);

  // Commands
  bot.command('start', handleStart);
  bot.command('menu', handleMenu);
  bot.command('create_deal', handleCreateDealCommand);
  bot.command('active_deals', handleActiveDealsCommand);
  bot.command('deal_history', handleDealHistoryCommand);
  bot.command('cancel_deal', handleCancelDealCommand);

  // Callback queries - Agreement
  bot.callbackQuery(CALLBACK_DATA.ACCEPT_AGREEMENT, handleAgreementAccept);
  bot.callbackQuery(CALLBACK_DATA.DECLINE_AGREEMENT, handleAgreementDecline);

  // Callback queries - Role selection
  bot.callbackQuery(CALLBACK_DATA.SELECT_ROLE_BUYER, (ctx) => 
    handleRoleSelection(ctx, 'buyer')
  );
  bot.callbackQuery(CALLBACK_DATA.SELECT_ROLE_SELLER, (ctx) => 
    handleRoleSelection(ctx, 'seller')
  );

  // Callback queries - Menu actions
  bot.callbackQuery(CALLBACK_DATA.CREATE_DEAL, handleCreateDeal);
  bot.callbackQuery(CALLBACK_DATA.ACTIVE_DEALS, handleActivDeals);
  bot.callbackQuery(CALLBACK_DATA.DEAL_HISTORY, handleDealHistory);
  bot.callbackQuery(CALLBACK_DATA.CANCEL_DEAL, handleCancelDeal);
  bot.callbackQuery(CALLBACK_DATA.BACK_TO_MENU, handleBackToMenu);

  // Handle unknown messages
  bot.on('message', async (ctx) => {
    await ctx.reply(MESSAGES.UNKNOWN_COMMAND);
  });

  // Error handling
  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    
    const e = err.error;
    
    if (e instanceof GrammyError) {
      console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
      console.error('Could not contact Telegram:', e);
    } else {
      console.error('Unknown error:', e);
    }
  });

  return bot;
}

export default createBot;