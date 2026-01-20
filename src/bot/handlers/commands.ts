import { Context } from 'grammy';
import { MESSAGES } from '../../config/constants';
import { backToMenuKeyboard } from '../keyboards/inline';

export async function handleCreateDeal(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(MESSAGES.CREATE_DEAL_STUB, {
    reply_markup: backToMenuKeyboard
  });
}

export async function handleActivDeals(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(MESSAGES.ACTIVE_DEALS_STUB, {
    reply_markup: backToMenuKeyboard
  });
}

export async function handleDealHistory(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(MESSAGES.DEAL_HISTORY_STUB, {
    reply_markup: backToMenuKeyboard
  });
}

export async function handleCancelDeal(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(MESSAGES.CANCEL_DEAL_STUB, {
    reply_markup: backToMenuKeyboard
  });
}

// Text command handlers (alternatives to callback)
export async function handleCreateDealCommand(ctx: Context): Promise<void> {
  await ctx.reply(MESSAGES.CREATE_DEAL_STUB, {
    reply_markup: backToMenuKeyboard
  });
}

export async function handleActiveDealsCommand(ctx: Context): Promise<void> {
  await ctx.reply(MESSAGES.ACTIVE_DEALS_STUB, {
    reply_markup: backToMenuKeyboard
  });
}

export async function handleDealHistoryCommand(ctx: Context): Promise<void> {
  await ctx.reply(MESSAGES.DEAL_HISTORY_STUB, {
    reply_markup: backToMenuKeyboard
  });
}

export async function handleCancelDealCommand(ctx: Context): Promise<void> {
  await ctx.reply(MESSAGES.CANCEL_DEAL_STUB, {
    reply_markup: backToMenuKeyboard
  });
}