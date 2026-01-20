export const MESSAGES = {
  // ... существующие сообщения ...

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

  ALREADY_REGISTERED: `👋 Welcome back!

You're already registered. Redirecting to main menu...`,

  UNKNOWN_COMMAND: `❓ Unknown command.

Use the menu buttons or send /menu to see available options.`,

  ERROR_OCCURRED: `⚠️ An error occurred. Please try again later.`,

  // Сообщения для создания сделки
  CREATE_DEAL_START: `👤 Enter counterparty

Please enter the @username of the person you want to make a deal with.

Example: @john_doe`,

  CREATE_DEAL_SELECT_ROLE: (username: string) => `🎭 Select your role

You are creating a deal with @${username}.

What is your role in this deal?`,

  CREATE_DEAL_ENTER_AMOUNT: `💰 Enter deal amount

Please enter the deal amount in USDT.

Minimum: 1 USDT
Maximum: 5,000 USDT`,

  CREATE_DEAL_ENTER_DESCRIPTION: `📝 Deal description

Please describe the deal (services to be provided).

Maximum 500 characters.`,

  CREATE_DEAL_SUMMARY: (data: {
    counterparty: string;
    role: string;
    amount: number;
    description: string;
  }) => `📋 Deal Summary

Please review the deal details:

👤 Counterparty: @${data.counterparty}
🎭 Your role: ${data.role}
💰 Amount: ${data.amount.toFixed(2)} USDT
📝 Description:
${data.description}

─────────────────
⚠️ After confirmation, the deal will be sent to @${data.counterparty} for approval.`,

  CREATE_DEAL_CANCELLED: `❌ Deal creation cancelled.

Returning to main menu.`,

  CREATE_DEAL_SUCCESS: (dealId: string, counterparty: string) => 
    `✅ Deal Created!

Your deal has been sent to @${counterparty} for approval.

📋 Deal ID: ${dealId}
Status: ⏳ Waiting for acceptance

You will be notified when @${counterparty} responds.`,

  // Ошибки валидации
  ERROR_INVALID_USERNAME: `❌ Invalid username format.

Please enter a valid @username (e.g., @john_doe)`,

  ERROR_SELF_DEAL: `❌ You cannot create a deal with yourself.

Please enter a different @username.`,

  ERROR_USER_NOT_FOUND: (username: string) => 
    `❌ User @${username} is not registered in DEN Bot.

Please enter a different @username or ask them to register first.`,

  ERROR_INVALID_AMOUNT: `❌ Please enter a valid number.

Example: 100 or 99.99`,

  ERROR_AMOUNT_TOO_LOW: (min: number) => 
    `❌ Minimum amount is ${min} USDT.`,

  ERROR_AMOUNT_TOO_HIGH: (max: number) => 
    `❌ Maximum amount is ${max.toLocaleString()} USDT.`,

  ERROR_DESCRIPTION_TOO_SHORT: (min: number) => 
    `❌ Description is too short (minimum ${min} characters).`,

  ERROR_DESCRIPTION_TOO_LONG: (max: number) => 
    `❌ Description is too long (maximum ${max} characters).`,

  // Уведомления для контрагента
  DEAL_REQUEST_RECEIVED: (data: {
    dealId: string;
    initiator: string;
    role: string;
    amount: number;
    description: string;
  }) => `🔔 New Deal Request

@${data.initiator} wants to make a deal with you.

📋 Deal ID: ${data.dealId}

👤 Initiator: @${data.initiator}
🎭 Your role: ${data.role}
💰 Amount: ${data.amount.toFixed(2)} USDT
📝 Description:
${data.description}

─────────────────
Do you accept this deal?`,

  // Ответы на сделку
  DEAL_ACCEPTED_COUNTERPARTY: (dealId: string) => 
    `✅ Deal Accepted

You have accepted the deal ${dealId}.

Status: 📝 Terms Editing
Next step: Define deal terms (coming soon)`,

  DEAL_ACCEPTED_INITIATOR: (dealId: string, counterparty: string) => 
    `🎉 Deal Accepted!

@${counterparty} has accepted your deal.

📋 Deal ID: ${dealId}
Status: 📝 Terms Editing

Next step: Define deal terms (coming soon)`,

  DEAL_DECLINED_COUNTERPARTY: (dealId: string) => 
    `❌ Deal Declined

You have declined the deal ${dealId}.`,

  DEAL_DECLINED_INITIATOR: (dealId: string, counterparty: string) => 
    `❌ Deal Declined

@${counterparty} has declined your deal.

📋 Deal ID: ${dealId}

You can create a new deal from the main menu.`,

  // Active Deals
  ACTIVE_DEALS_EMPTY: `📂 Active Deals

You have no active deals.

Create a new deal from the main menu.`,

  ACTIVE_DEALS_LIST: (count: number) => 
    `📂 Active Deals

You have ${count} active deal${count > 1 ? 's' : ''}:`,

  DEAL_LIST_ITEM: (data: {
    index: number;
    dealId: string;
    role: string;
    counterparty: string;
    amount: number;
    status: string;
  }) => `
${data.index}️⃣ ${data.dealId}
   Role: ${data.role}
   With: @${data.counterparty}
   Amount: ${data.amount.toFixed(2)} USDT
   Status: ${data.status}`,

  // Заглушки
  DEAL_HISTORY_STUB: `📜 Deal History

Your completed and cancelled deals will appear here.

No deal history yet.`,

  CANCEL_DEAL_STUB: `❌ Cancel Deal

This feature is under development.

Soon you'll be able to cancel deals that are in progress.`,

} as const;

export const CALLBACK_DATA = {
  // Существующие
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

// Новые константы для сделок
export const DEAL_STATUS = {
  WAITING_ACCEPT: 'waiting_accept',
  TERMS_EDIT: 'terms_edit',
  DECLINED: 'declined',
  CANCELLED: 'cancelled',
} as const;

export type DealStatus = typeof DEAL_STATUS[keyof typeof DEAL_STATUS];

export const DEAL_STATUS_LABELS: Record<DealStatus, string> = {
  [DEAL_STATUS.WAITING_ACCEPT]: '⏳ Waiting Accept',
  [DEAL_STATUS.TERMS_EDIT]: '📝 Terms Editing',
  [DEAL_STATUS.DECLINED]: '❌ Declined',
  [DEAL_STATUS.CANCELLED]: '🚫 Cancelled',
};

export const DEAL_LIMITS = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 5000,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
} as const;

export const CREATE_DEAL_CB = {
  SELECT_ROLE_BUYER: 'cd_role_buyer',
  SELECT_ROLE_SELLER: 'cd_role_seller',
  CONFIRM: 'cd_confirm',
  CANCEL: 'cd_cancel',
  BACK: 'cd_back',
  EDIT: 'cd_edit',
  EDIT_COUNTERPARTY: 'cd_edit_cp',
  EDIT_ROLE: 'cd_edit_role',
  EDIT_AMOUNT: 'cd_edit_amt',
  EDIT_DESCRIPTION: 'cd_edit_desc',
  BACK_TO_SUMMARY: 'cd_back_sum',
} as const;

export const DEAL_RESPONSE_CB = {
  ACCEPT: 'deal_accept_',    // + dealId
  DECLINE: 'deal_decline_',  // + dealId
} as const;

export const ACTIVE_DEALS_CB = {
  VIEW_DEAL: 'view_deal_',   // + dealId
} as const;