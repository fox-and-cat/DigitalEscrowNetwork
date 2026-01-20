import { Context, NextFunction } from 'grammy';

export async function loggerMiddleware(ctx: Context, next: NextFunction): Promise<void> {
  const start = Date.now();
  const userId = ctx.from?.id;
  const username = ctx.from?.username;
  
  // Log incoming update
  if (ctx.message?.text) {
    console.log(`📩 [${userId}/@${username}] Message: ${ctx.message.text}`);
  } else if (ctx.callbackQuery?.data) {
    console.log(`🔘 [${userId}/@${username}] Callback: ${ctx.callbackQuery.data}`);
  }

  await next();

  const duration = Date.now() - start;
  console.log(`⏱ Processing time: ${duration}ms`);
}