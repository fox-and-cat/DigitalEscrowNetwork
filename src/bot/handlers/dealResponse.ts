import { BotContext } from '../context';
import { dealService } from '../../services/dealService';
import { MESSAGES, DEAL_RESPONSE_CB } from '../../config/constants';
import { backToMenuKeyboard } from '../keyboards/inline';

export async function handleDealAccept(ctx: BotContext): Promise<void> {
  const userId = ctx.from?.id;
  const callbackData = ctx.callbackQuery?.data;

  if (!userId || !callbackData) {
    await ctx.answerCallbackQuery({ text: 'Error occurred' });
    return;
  }

  const dealId = callbackData.replace(DEAL_RESPONSE_CB.ACCEPT, '');

  const result = await dealService.acceptDeal(dealId, userId);

  if (!result.success) {
    let errorMessage = 'Failed to accept deal';
    
    if (result.error === 'deal_not_found') {
      errorMessage = 'Deal not found';
    } else if (result.error === 'not_authorized') {
      errorMessage = 'You are not authorized to accept this deal';
    } else if (result.error === 'invalid_status') {
      errorMessage = 'This deal cannot be accepted';
    }

    await ctx.answerCallbackQuery({ text: errorMessage });
    return;
  }

  const deal = result.deal!;

  await ctx.answerCallbackQuery({ text: 'Deal accepted!' });

  // Обновляем сообщение для контрагента
  await ctx.editMessageText(
    MESSAGES.DEAL_ACCEPTED_COUNTERPARTY(deal.dealId),
    { reply_markup: backToMenuKeyboard }
  );

  // Уведомляем инициатора
  try {
    await ctx.api.sendMessage(
      deal.initiatorId,
      MESSAGES.DEAL_ACCEPTED_INITIATOR(deal.dealId, deal.counterpartyUsername),
      { reply_markup: backToMenuKeyboard }
    );
    console.log(`📤 Accept notification sent to initiator ${deal.initiatorId}`);
  } catch (error) {
    console.error(`Failed to notify initiator ${deal.initiatorId}:`, error);
  }
}

export async function handleDealDecline(ctx: BotContext): Promise<void> {
  const userId = ctx.from?.id;
  const callbackData = ctx.callbackQuery?.data;

  if (!userId || !callbackData) {
    await ctx.answerCallbackQuery({ text: 'Error occurred' });
    return;
  }

  const dealId = callbackData.replace(DEAL_RESPONSE_CB.DECLINE, '');

  const result = await dealService.declineDeal(dealId, userId);

  if (!result.success) {
    let errorMessage = 'Failed to decline deal';
    
    if (result.error === 'deal_not_found') {
      errorMessage = 'Deal not found';
    } else if (result.error === 'not_authorized') {
      errorMessage = 'You are not authorized to decline this deal';
    } else if (result.error === 'invalid_status') {
      errorMessage = 'This deal cannot be declined';
    }

    await ctx.answerCallbackQuery({ text: errorMessage });
    return;
  }

  const deal = result.deal!;

  await ctx.answerCallbackQuery({ text: 'Deal declined' });

  // Обновляем сообщение для контрагента
  await ctx.editMessageText(
    MESSAGES.DEAL_DECLINED_COUNTERPARTY(deal.dealId),
    { reply_markup: backToMenuKeyboard }
  );

  // Уведомляем инициатора
  try {
    await ctx.api.sendMessage(
      deal.initiatorId,
      MESSAGES.DEAL_DECLINED_INITIATOR(deal.dealId, deal.counterpartyUsername),
      { reply_markup: backToMenuKeyboard }
    );
    console.log(`📤 Decline notification sent to initiator ${deal.initiatorId}`);
  } catch (error) {
    console.error(`Failed to notify initiator ${deal.initiatorId}:`, error);
  }
}