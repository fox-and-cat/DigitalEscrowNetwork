import { Context } from 'grammy';
import { database } from '../../db';
import { MESSAGES, CALLBACK_DATA, USER_ROLES } from '../../config/constants';
import { 
  agreementKeyboard, 
  roleSelectionKeyboard, 
  mainMenuKeyboard 
} from '../keyboards/inline';

export async function handleStart(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;
  const username = ctx.from?.username || null;

  if (!userId) {
    await ctx.reply(MESSAGES.ERROR_OCCURRED);
    return;
  }

  const userRepo = database.userRepository!;
  
  // Check if user is already fully registered
  const existingUser = await userRepo.findByUserId(userId);
  
  if (existingUser && existingUser.agreementAccepted && existingUser.role) {
    console.log(`👤 Existing user returned: ${userId}/@${username}`);
    await ctx.reply(MESSAGES.ALREADY_REGISTERED);
    await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
    return;
  }

  // Create new user or continue registration
  if (!existingUser) {
    await userRepo.create({ userId, username });
    console.log(`🆕 New user registered: ${userId}/@${username}`);
  }

  // Send welcome message
  await ctx.reply(MESSAGES.WELCOME);
  
  // Send agreement request
  await ctx.reply(MESSAGES.USER_AGREEMENT, { 
    reply_markup: agreementKeyboard,
    parse_mode: 'Markdown'
  });
}

export async function handleAgreementAccept(ctx: Context): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    await ctx.answerCallbackQuery({ text: MESSAGES.ERROR_OCCURRED });
    return;
  }

  const userRepo = database.userRepository!;
  await userRepo.update(userId, { agreementAccepted: true });
  
  console.log(`✅ Agreement accepted: ${userId}`);

  await ctx.answerCallbackQuery({ text: 'Agreement accepted!' });
  await ctx.editMessageText(MESSAGES.SELECT_ROLE, {
    reply_markup: roleSelectionKeyboard,
    parse_mode: 'Markdown'
  });
}

export async function handleAgreementDecline(ctx: Context): Promise<void> {
  console.log(`❌ Agreement declined: ${ctx.from?.id}`);
  
  await ctx.answerCallbackQuery({ text: 'Agreement declined' });
  await ctx.editMessageText(MESSAGES.AGREEMENT_DECLINED);
}

export async function handleRoleSelection(ctx: Context, role: 'buyer' | 'seller'): Promise<void> {
  const userId = ctx.from?.id;

  if (!userId) {
    await ctx.answerCallbackQuery({ text: MESSAGES.ERROR_OCCURRED });
    return;
  }

  const userRepo = database.userRepository!;
  const selectedRole = role === 'buyer' ? USER_ROLES.BUYER : USER_ROLES.SELLER;
  
  await userRepo.update(userId, { role: selectedRole });
  
  console.log(`👤 Role selected: ${userId} -> ${selectedRole}`);

  await ctx.answerCallbackQuery({ text: `Role set to ${selectedRole}!` });
  await ctx.editMessageText(MESSAGES.REGISTRATION_COMPLETE);
  
  // Show main menu
  await ctx.reply(MESSAGES.MAIN_MENU, { reply_markup: mainMenuKeyboard });
}