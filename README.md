# Digital Escrow Network - DEN Bot

Telegram bot для безопасного заключения сделок с использованием системы цифрового escrow.

## Возможности

- 🤖 Telegram Bot Interface
- 💬 Multi-step conversations
- 📋 Управление сделками
- 👥 Управление пользователями
- 🗄️ In-memory и MongoDB хранилище
- ✅ Валидация данных
- 📝 Логирование операций

## Установка

```bash
git clone https://github.com/fox-and-cat/DigitalEscrowNetwork.git
cd DigitalEscrowNetwork
npm install
cp .env.example .env
```

Отредактируйте `.env`:
```
BOT_TOKEN=your_token_here
NODE_ENV=development
```

## Использование

```bash
npm run dev      # Режим разработки
npm run build    # Собрать
npm start        # Production
npm run lint     # Проверка кода
```

## Команды

- `/start` - Начало
- `/menu` - Меню
- `/createdeal` - Создать сделку
- `/help` - Справка

## Требования

- Node.js 18+
- npm или yarn
- Telegram Bot Token

## Архитектура

```
src/
├── bot/          # Telegram bot логика
├── db/           # Database модели
├── config/       # Конфигурация
├── services/     # Бизнес-логика
└── utils/        # Утилиты
```

## Лицензия

MIT
