import { BotContext } from '../context';
import { database } from '../../db';
import { dealService } from '../../services/dealService';
import { MESSAGES, DEAL_STATUS_LABELS, ACTIVE_DEALS_CB } from '../../config/constants';
import { backToMenuKeyboard } from '../keyboards/inline';
import { activeDealsKeyboard, backToDealsKeyboard } from '../keyboards/deal';

export async function handleActiveDeals(ctx: BotContext): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    await ctx.answerCallbackQuery({ text: 'Error occurred' });
    return;
  }

  await ctx.answerCallbackQuery();

  const deals = await dealService.getActiveDeals(userId);

  if (deals.length === 0) {
    await ctx.editMessageText(MESSAGES.ACTIVE_DEALS_EMPTY, {
      reply_markup: backToMenuKeyboard,
    });
    return;
  }

  // Формируем список сделок
  let message = MESSAGES.ACTIVE_DEALS_LIST(deals.length);

  deals.forEach((deal, index) => {
    const role = dealService.getUserRoleInDeal(deal, userId);
    const counterparty = dealService.getCounterpartyUsername(deal, userId);
    const statusLabel = DEAL_STATUS_LABELS[deal.status];

    message += MESSAGES.DEAL_LIST_ITEM({
      index: index + 1,
      dealId: deal.dealId,
      role: role === 'buyer' ? 'Buyer' : 'Seller',
      counterparty,
      amount: deal.amount,
      status: statusLabel,
    });
  });

  message += '\n\nSelect a deal for details:';

  await ctx.editMessageText(message, {
    reply_markup: activeDealsKeyboard(deals),
  });
}

export async function handleViewDeal(ctx: BotContext): Promise<void> {
  const userId = ctx.from?.id;
  const callbackData = ctx.callbackQuery?.data;

  if (!userId || !callbackData) {
    await ctx.answerCallbackQuery({ text: 'Error occurred' });
    return;
  }

  await ctx.answerCallbackQuery();

  const dealId = callbackData.replace(ACTIVE_DEALS_CB.VIEW_DEAL, '');
  const deal = await dealService.getDealById(dealId);

  if (!deal) {
    await ctx.editMessageText('Deal not found', {
      reply_markup: backToDealsKeyboard,
    });
    return;
  }

  const role = dealService.getUserRoleInDeal(deal, userId);
  const counterparty = dealService.getCounterpartyUsername(deal, userId);
  const statusLabel = DEAL_STATUS_LABELS[deal.status];

  const message = `📋 Deal Details

🆔 Deal ID: ${deal.dealId}
📊 Status: ${statusLabel}

👤 Counterparty: @${counterparty}
🎭 Your role: ${role === 'buyer' ? 'Buyer' : 'Seller'}
💰 Amount: ${deal.amount.toFixed(2)} USDT

📝 Description:
${deal.description}

📅 Created: ${deal.createdAt.toLocaleDateString()}`;

  await ctx.editMessageText(message, {
    reply_markup: backToDealsKeyboard,
  });
}

export async function handleDealHistory(ctx: BotContext): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(MESSAGES.DEAL_HISTORY_STUB, {
    reply_markup: backToMenuKeyboard,
  });
}

export async function handleCancelDeal(ctx: BotContext): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(MESSAGES.CANCEL_DEAL_STUB, {
    reply_markup: backToMenuKeyboard,
  });
}

// Text command handlers
export async function handleActiveDealsCommand(ctx: BotContext): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    await ctx.reply(MESSAGES.ERROR_OCCURRED);
    return;
  }

  const deals = await dealService.getActiveDeals(userId);

  if (deals.length === 0) {
    await ctx.reply(MESSAGES.ACTIVE_DEALS_EMPTY, {
      reply_markup: backToMenuKeyboard,
    });
    return;
  }

  let message = MESSAGES.ACTIVE_DEALS_LIST(deals.length);

  deals.forEach((deal, index) => {
    const role = dealService.getUserRoleInDeal(deal, userId);
    const counterparty = dealService.getCounterpartyUsername(deal, userId);
    const statusLabel = DEAL_STATUS_LABELS[deal.status];

    message += MESSAGES.DEAL_LIST_ITEM({
      index: index + 1,
      dealId: deal.dealId,
      role: role === 'buyer' ? 'Buyer' : 'Seller',
      counterparty,
      amount: deal.amount,
      status: statusLabel,
    });
  });

  message += '\n\nSelect a deal for details:';

  await ctx.reply(message, {
    reply_markup: activeDealsKeyboard(deals),
  });
}

export async function handleDealHistoryCommand(ctx: BotContext): Promise<void> {
  await ctx.reply(MESSAGES.DEAL_HISTORY_STUB, {
    reply_markup: backToMenuKeyboard,
  });
}

export async function handleCancelDealCommand(ctx: BotContext): Promise<void> {
  await ctx.reply(MESSAGES.CANCEL_DEAL_STUB, {
    reply_markup: backToMenuKeyboard,
  });
}