import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { Context } from 'grammy';
import { BotContext } from '../context';
import { database } from '../../db';
import { dealService } from '../../services/dealService';
import { 
  MESSAGES, 
  DEAL_LIMITS, 
  CREATE_DEAL_CB,
  USER_ROLES
} from '../../config/constants';
import {
  cancelOnlyKeyboard,
  backCancelKeyboard,
  roleSelectionKeyboard,
  confirmationKeyboard,
  editKeyboard,
  dealResponseKeyboard,
} from '../keyboards/deal';
import { mainMenuKeyboard } from '../keyboards/inline';
import {
  validateUsername,
  validateAmount,
  validateDescription,
  normalizeUsername,
  parseAmount,
} from '../../utils/validators';

type CreateDealConversation = Conversation<BotContext>;

interface DealData {
  counterpartyUsername: string;
  role: 'buyer' | 'seller';
  amount: number;
  description: string;
}

export async function createDealConversation(
  conversation: CreateDealConversation,
  ctx: BotContext
): Promise<void> {
  const userId = ctx.from?.id;
  const username = ctx.from?.username || null;

  if (!userId) {
    await ctx.reply(MESSAGES.ERROR_OCCURRED);
    return;
  }

  const dealData: Partial<DealData> = {};
  let currentStep: 'counterparty' | 'role' | 'amount' | 'description' | 'confirmation' | 'edit' = 'counterparty';

  // Функция для получения сообщения пользователя или callback
  async function waitForInput(): Promise<{ text?: string; callback?: string }> {
    const response = await conversation.wait();
    
    if (response.callbackQuery?.data) {
      await response.answerCallbackQuery();
      return { callback: response.callbackQuery.data };
    }
    
    if (response.message?.text) {
      return { text: response.message.text };
    }
    
    return {};
  }

  // Шаг 1: Ввод контрагента
  async function stepCounterparty(): Promise<boolean> {
    await ctx.reply(MESSAGES.CREATE_DEAL_START, {
      reply_markup: cancelOnlyKeyboard,
    });

    while (true) {
      const input = await waitForInput();

      if (input.callback === CREATE_DEAL_CB.CANCEL) {
        await ctx.reply(MESSAGES.CREATE_DEAL_CANCELLED);
        await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
        return false;
      }

      if (!input.text) continue;

      const text = input.text.trim();

      // Валидация формата
      const validation = validateUsername(text);
      if (!validation.isValid) {
        await ctx.reply(MESSAGES.ERROR_INVALID_USERNAME);
        continue;
      }

      const normalizedUsername = normalizeUsername(text);

      // Проверка на самого себя
      if (username && normalizedUsername === username.toLowerCase()) {
        await ctx.reply(MESSAGES.ERROR_SELF_DEAL);
        continue;
      }

      // Проверка существования пользователя
      const counterparty = await conversation.external(() => 
        database.userRepository!.findByUsername(normalizedUsername)
      );

      if (!counterparty) {
        await ctx.reply(MESSAGES.ERROR_USER_NOT_FOUND(normalizedUsername));
        continue;
      }

      // Дополнительная проверка на самого себя по ID
      if (counterparty.userId === userId) {
        await ctx.reply(MESSAGES.ERROR_SELF_DEAL);
        continue;
      }

      dealData.counterpartyUsername = normalizedUsername;
      console.log(`📝 [CreateDeal] User ${userId}: counterparty set to @${normalizedUsername}`);
      return true;
    }
  }

  // Шаг 2: Выбор роли
  async function stepRole(): Promise<'next' | 'back' | 'cancel'> {
    await ctx.reply(
      MESSAGES.CREATE_DEAL_SELECT_ROLE(dealData.counterpartyUsername!),
      { reply_markup: roleSelectionKeyboard }
    );

    while (true) {
      const input = await waitForInput();

      if (input.callback === CREATE_DEAL_CB.CANCEL) {
        await ctx.reply(MESSAGES.CREATE_DEAL_CANCELLED);
        await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
        return 'cancel';
      }

      if (input.callback === CREATE_DEAL_CB.BACK) {
        return 'back';
      }

      if (input.callback === CREATE_DEAL_CB.SELECT_ROLE_BUYER) {
        dealData.role = 'buyer';
        console.log(`📝 [CreateDeal] User ${userId}: role set to buyer`);
        return 'next';
      }

      if (input.callback === CREATE_DEAL_CB.SELECT_ROLE_SELLER) {
        dealData.role = 'seller';
        console.log(`📝 [CreateDeal] User ${userId}: role set to seller`);
        return 'next';
      }
    }
  }

  // Шаг 3: Ввод суммы
  async function stepAmount(): Promise<'next' | 'back' | 'cancel'> {
    await ctx.reply(MESSAGES.CREATE_DEAL_ENTER_AMOUNT, {
      reply_markup: backCancelKeyboard,
    });

    while (true) {
      const input = await waitForInput();

      if (input.callback === CREATE_DEAL_CB.CANCEL) {
        await ctx.reply(MESSAGES.CREATE_DEAL_CANCELLED);
        await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
        return 'cancel';
      }

      if (input.callback === CREATE_DEAL_CB.BACK) {
        return 'back';
      }

      if (!input.text) continue;

      const validation = validateAmount(input.text);

      if (!validation.isValid) {
        if (validation.error === 'too_low') {
          await ctx.reply(MESSAGES.ERROR_AMOUNT_TOO_LOW(DEAL_LIMITS.MIN_AMOUNT));
        } else if (validation.error === 'too_high') {
          await ctx.reply(MESSAGES.ERROR_AMOUNT_TOO_HIGH(DEAL_LIMITS.MAX_AMOUNT));
        } else {
          await ctx.reply(MESSAGES.ERROR_INVALID_AMOUNT);
        }
        continue;
      }

      dealData.amount = parseAmount(input.text);
      console.log(`📝 [CreateDeal] User ${userId}: amount set to ${dealData.amount}`);
      return 'next';
    }
  }

  // Шаг 4: Ввод описания
  async function stepDescription(): Promise<'next' | 'back' | 'cancel'> {
    await ctx.reply(MESSAGES.CREATE_DEAL_ENTER_DESCRIPTION, {
      reply_markup: backCancelKeyboard,
    });

    while (true) {
      const input = await waitForInput();

      if (input.callback === CREATE_DEAL_CB.CANCEL) {
        await ctx.reply(MESSAGES.CREATE_DEAL_CANCELLED);
        await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
        return 'cancel';
      }

      if (input.callback === CREATE_DEAL_CB.BACK) {
        return 'back';
      }

      if (!input.text) continue;

      const validation = validateDescription(input.text);

      if (!validation.isValid) {
        if (validation.error === 'too_short') {
          await ctx.reply(MESSAGES.ERROR_DESCRIPTION_TOO_SHORT(DEAL_LIMITS.MIN_DESCRIPTION_LENGTH));
        } else {
          await ctx.reply(MESSAGES.ERROR_DESCRIPTION_TOO_LONG(DEAL_LIMITS.MAX_DESCRIPTION_LENGTH));
        }
        continue;
      }

      dealData.description = input.text.trim();
      console.log(`📝 [CreateDeal] User ${userId}: description set`);
      return 'next';
    }
  }

  // Шаг 5: Подтверждение
  async function stepConfirmation(): Promise<'confirm' | 'edit' | 'cancel'> {
    const roleLabel = dealData.role === 'buyer' ? 'Buyer' : 'Seller';
    
    await ctx.reply(
      MESSAGES.CREATE_DEAL_SUMMARY({
        counterparty: dealData.counterpartyUsername!,
        role: roleLabel,
        amount: dealData.amount!,
        description: dealData.description!,
      }),
      { reply_markup: confirmationKeyboard }
    );

    while (true) {
      const input = await waitForInput();

      if (input.callback === CREATE_DEAL_CB.CANCEL) {
        await ctx.reply(MESSAGES.CREATE_DEAL_CANCELLED);
        await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
        return 'cancel';
      }

      if (input.callback === CREATE_DEAL_CB.CONFIRM) {
        return 'confirm';
      }

      if (input.callback === CREATE_DEAL_CB.EDIT) {
        return 'edit';
      }
    }
  }

  // Шаг редактирования
  async function stepEdit(): Promise<'counterparty' | 'role' | 'amount' | 'description' | 'cancel'> {
    await ctx.reply('What would you like to edit?', {
      reply_markup: editKeyboard,
    });

    while (true) {
      const input = await waitForInput();

      if (input.callback === CREATE_DEAL_CB.CANCEL) {
        await ctx.reply(MESSAGES.CREATE_DEAL_CANCELLED);
        await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
        return 'cancel';
      }

      if (input.callback === CREATE_DEAL_CB.BACK_TO_SUMMARY) {
        return 'description'; // Вернёмся к confirmation через description
      }

      if (input.callback === CREATE_DEAL_CB.EDIT_COUNTERPARTY) {
        return 'counterparty';
      }

      if (input.callback === CREATE_DEAL_CB.EDIT_ROLE) {
        return 'role';
      }

      if (input.callback === CREATE_DEAL_CB.EDIT_AMOUNT) {
        return 'amount';
      }

      if (input.callback === CREATE_DEAL_CB.EDIT_DESCRIPTION) {
        return 'description';
      }
    }
  }

  // Основной цикл FSM
  while (true) {
    switch (currentStep) {
      case 'counterparty': {
        const result = await stepCounterparty();
        if (!result) return;
        currentStep = 'role';
        break;
      }

      case 'role': {
        const result = await stepRole();
        if (result === 'cancel') return;
        if (result === 'back') {
          currentStep = 'counterparty';
        } else {
          currentStep = 'amount';
        }
        break;
      }

      case 'amount': {
        const result = await stepAmount();
        if (result === 'cancel') return;
        if (result === 'back') {
          currentStep = 'role';
        } else {
          currentStep = 'description';
        }
        break;
      }

      case 'description': {
        const result = await stepDescription();
        if (result === 'cancel') return;
        if (result === 'back') {
          currentStep = 'amount';
        } else {
          currentStep = 'confirmation';
        }
        break;
      }

      case 'confirmation': {
        const result = await stepConfirmation();
        if (result === 'cancel') return;
        if (result === 'edit') {
          currentStep = 'edit';
        } else {
          // Создаём сделку
          const createResult = await conversation.external(() =>
            dealService.createDeal({
              initiatorId: userId,
              initiatorUsername: username,
              counterpartyUsername: dealData.counterpartyUsername!,
              initiatorRole: dealData.role!,
              amount: dealData.amount!,
              description: dealData.description!,
            })
          );

          if (!createResult.success) {
            await ctx.reply(MESSAGES.ERROR_OCCURRED);
            await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
            return;
          }

          const deal = createResult.deal!;

          // Уведомляем инициатора
          await ctx.reply(MESSAGES.CREATE_DEAL_SUCCESS(deal.dealId, deal.counterpartyUsername));
          await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });

          // Уведомляем контрагента
          const counterpartyRole = deal.buyerId === createResult.counterpartyId ? 'Buyer' : 'Seller';
          
          try {
            await ctx.api.sendMessage(
              createResult.counterpartyId!,
              MESSAGES.DEAL_REQUEST_RECEIVED({
                dealId: deal.dealId,
                initiator: username || 'Unknown',
                role: counterpartyRole,
                amount: deal.amount,
                description: deal.description,
              }),
              { reply_markup: dealResponseKeyboard(deal.dealId) }
            );
            console.log(`📤 Deal notification sent to user ${createResult.counterpartyId}`);
          } catch (error) {
            console.error(`Failed to notify counterparty ${createResult.counterpartyId}:`, error);
          }

          return;
        }
        break;
      }

      case 'edit': {
        const result = await stepEdit();
        if (result === 'cancel') return;
        currentStep = result === 'description' ? 'confirmation' : result;
        break;
      }
    }
  }
}