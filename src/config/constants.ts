export const MESSAGES = {
    WELCOME: `🤝 Welcome to DEN Bot!
  
  DEN is a safe deal platform for services. We help buyers and sellers complete transactions securely.
  
  🔒 How it works:
  • Create a deal with clear terms
  • Funds are held securely until completion
  • Fair dispute resolution if needed
  
  Please read and accept our User Agreement to continue.`,
  
    USER_AGREEMENT: `📜 User Agreement
  
  By using DEN Bot, you agree to:
  • Provide accurate information
  • Act in good faith during deals
  • Follow dispute resolution procedures
  • Not use the service for illegal activities
  
  Do you accept these terms?`,
  
    AGREEMENT_DECLINED: `❌ You have declined the User Agreement.
  
  You cannot use DEN Bot without accepting the terms.
  
  Send /start to try again.`,
  
    SELECT_ROLE: `👤 Please select your role:
  
  🛒 **Buyer** — You want to purchase services
  🛠 **Seller** — You want to offer services
  
  You can change your role later in settings.`,
  
    REGISTRATION_COMPLETE: `✅ Registration complete!
  
  Welcome to DEN Bot. You're all set to start using the platform.`,
  
    MAIN_MENU: `📋 Main Menu
  
  What would you like to do?`,
  
    CREATE_DEAL_STUB: `🚧 Create Deal
  
  This feature is under development.
  
  Soon you'll be able to:
  • Specify counterparty @username
  • Set deal amount (USDT)
  • Define deal terms`,
  
    ACTIVE_DEALS_STUB: `📂 Active Deals
  
  Your active deals will be displayed here.
  
  Currently, you have no active deals.`,
  
    DEAL_HISTORY_STUB: `📜 Deal History
  
  Your completed and cancelled deals will appear here.
  
  No deal history yet.`,
  
    CANCEL_DEAL_STUB: `❌ Cancel Deal
  
  This feature is under development.
  
  Soon you'll be able to cancel deals that are in progress.`,
  
    ALREADY_REGISTERED: `👋 Welcome back!
  
  You're already registered. Redirecting to main menu...`,
  
    UNKNOWN_COMMAND: `❓ Unknown command.
  
  Use the menu buttons or send /menu to see available options.`,
  
    ERROR_OCCURRED: `⚠️ An error occurred. Please try again later.`,
  } as const;
  
  export const CALLBACK_DATA = {
    ACCEPT_AGREEMENT: 'accept_agreement',
    DECLINE_AGREEMENT: 'decline_agreement',
    SELECT_ROLE_BUYER: 'select_role_buyer',
    SELECT_ROLE_SELLER: 'select_role_seller',
    CREATE_DEAL: 'create_deal',
    ACTIVE_DEALS: 'active_deals',
    DEAL_HISTORY: 'deal_history',
    CANCEL_DEAL: 'cancel_deal',
    BACK_TO_MENU: 'back_to_menu',
  } as const;
  
  export const USER_ROLES = {
    BUYER: 'buyer',
    SELLER: 'seller',
  } as const;
  
  export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];