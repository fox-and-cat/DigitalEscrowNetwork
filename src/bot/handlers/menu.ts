import { Context } from 'grammy';
import { database } from '../../db';
import { MESSAGES } from '../../config/constants';
import { mainMenuKeyboard } from '../keyboards/inline';

export async function handleMenu(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    await ctx.reply(MESSAGES.ERROR_OCCURRED);
    return;
  }

  const userRepo = database.userRepository!;
  const isRegistered = await userRepo.isFullyRegistered(userId);

  if (!isRegistered) {
    await ctx.reply('Please complete registration first. Send /start');
    return;
  }

  await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
}

export async function handleBackToMenu(ctx: Context): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(MESSAGES.MAIN_MENU, { 
    reply_markup: mainMenuKeyboard 
  });
}