import { Bot, session, GrammyError, HttpError } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import config from '../config';
import { 
  CALLBACK_DATA, 
  MESSAGES, 
  DEAL_RESPONSE_CB,
  ACTIVE_DEALS_CB 
} from '../config/constants';
import { BotContext, SessionData } from './context';
import { loggerMiddleware } from './middleware/logger';
import { 
  handleStart, 
  handleAgreementAccept, 
  handleAgreementDecline,
  handleRoleSelection 
} from './handlers/start';
import { handleMenu, handleBackToMenu } from './handlers/menu';
import {
  handleActiveDeals,
  handleViewDeal,
  handleDealHistory,
  handleCancelDeal,
  handleActiveDealsCommand,
  handleDealHistoryCommand,
  handleCancelDealCommand
} from './handlers/commands';
import { handleDealAccept, handleDealDecline } from './handlers/dealResponse';
import { createDealConversation } from './conversations/createDeal';

export function createBot(): Bot<BotContext> {
  const bot = new Bot<BotContext>(config.botToken);

  // Session middleware
  bot.use(session({
    initial: (): SessionData => ({}),
  }));

  // Conversations middleware
  bot.use(conversations());
  bot.use(createConversation(createDealConversation));

  // Logger middleware
  bot.use(loggerMiddleware);

  // Commands
  bot.command('start', handleStart);
  bot.command('menu', handleMenu);
  bot.command('active_deals', handleActiveDealsCommand);
  bot.command('deal_history', handleDealHistoryCommand);
  bot.command('cancel_deal', handleCancelDealCommand);

  // Callback queries - Agreement
  bot.callbackQuery(CALLBACK_DATA.ACCEPT_AGREEMENT, handleAgreementAccept);
  bot.callbackQuery(CALLBACK_DATA.DECLINE_AGREEMENT, handleAgreementDecline);

  // Callback queries - Role selection (registration)
  bot.callbackQuery(CALLBACK_DATA.SELECT_ROLE_BUYER, (ctx) => 
    handleRoleSelection(ctx, 'buyer')
  );
  bot.callbackQuery(CALLBACK_DATA.SELECT_ROLE_SELLER, (ctx) => 
    handleRoleSelection(ctx, 'seller')
  );

  // Callback queries - Menu actions
  bot.callbackQuery(CALLBACK_DATA.CREATE_DEAL, async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.conversation.enter('createDealConversation');
  });
  
  bot.callbackQuery(CALLBACK_DATA.ACTIVE_DEALS, handleActiveDeals);
  bot.callbackQuery(CALLBACK_DATA.DEAL_HISTORY, handleDealHistory);
  bot.callbackQuery(CALLBACK_DATA.CANCEL_DEAL, handleCancelDeal);
  bot.callbackQuery(CALLBACK_DATA.BACK_TO_MENU, handleBackToMenu);

  // Callback queries - Deal response (accept/decline)
  bot.callbackQuery(new RegExp(`^${DEAL_RESPONSE_CB.ACCEPT}`), handleDealAccept);
  bot.callbackQuery(new RegExp(`^${DEAL_RESPONSE_CB.DECLINE}`), handleDealDecline);

  // Callback queries - View deal details
  bot.callbackQuery(new RegExp(`^${ACTIVE_DEALS_CB.VIEW_DEAL}`), handleViewDeal);

  // Handle unknown messages (when not in conversation)
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