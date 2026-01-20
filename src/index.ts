import { createBot } from './bot';
import { database } from './db';
import config from './config';

async function main(): Promise<void> {
  console.log('🚀 Starting DEN Bot...');
  console.log(`📍 Environment: ${config.nodeEnv}`);

  try {
    // Connect to database
    await database.connect();

    // Create and start bot
    const bot = createBot();
    
    // Set bot commands for menu
    await bot.api.setMyCommands([
      { command: 'start', description: 'Start the bot / Registration' },
      { command: 'menu', description: 'Open main menu' },
      { command: 'create_deal', description: 'Create a new deal' },
      { command: 'active_deals', description: 'View active deals' },
      { command: 'deal_history', description: 'View deal history' },
      { command: 'cancel_deal', description: 'Cancel a deal' },
    ]);

    // Start bot
    console.log('🤖 Bot is starting...');
    await bot.start({
      onStart: (botInfo) => {
        console.log(`✅ Bot @${botInfo.username} is running!`);
      },
    });
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    await database.disconnect();
    process.exit(1);
  }
}

// Graceful shutdown
process.once('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down...');
  await database.disconnect();
  process.exit(0);
});

process.once('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  await database.disconnect();
  process.exit(0);
});

main();