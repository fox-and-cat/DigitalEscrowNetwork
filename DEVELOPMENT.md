# Development Setup

## Prerequisites

- **Git** - Version control
- **Node.js** - Version 18 or higher (20 recommended)
- **npm** - Node Package Manager (included with Node.js)
- **VSCode** - Recommended IDE (optional but recommended)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/fox-and-cat/DigitalEscrowNetwork.git
cd DigitalEscrowNetwork
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your values:
- `BOT_TOKEN` - Your Telegram bot token (get from [@BotFather](https://t.me/botfather))
- `MONGODB_URI` - (Optional) MongoDB connection string
- `NODE_ENV` - Set to `development` for local development

### 4. VSCode Extensions (Recommended)

Install these extensions for better development experience:

- **TypeScript Vue Plugin (Volar)** - TypeScript support
- **ESLint** - Code quality linting
- **Prettier** - Code formatting
- **Thunder Client** or **REST Client** - For API testing
- **Git Graph** - Git visualization

### 5. EditorConfig Setup

Make sure your editor respects `.editorconfig` settings. Most modern editors support it natively.

## Development Workflow

### Running in Development Mode

```bash
npm run dev
```

This starts the bot with hot-reload enabled. Changes to files will automatically restart the bot.

### Building the Project

```bash
npm run build
```

Generates TypeScript types and compiles to `dist/` directory.

### Linting

Check code quality:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint -- --fix
```

### Running Tests

```bash
npm test
```

## Code Style

### Naming Conventions

- **Variables & Functions**: `camelCase`
  ```typescript
  const userCount = 0;
  function getUserById(id: string) {}
  ```

- **Classes & Types**: `PascalCase`
  ```typescript
  class UserRepository {}
  interface IUserModel {}
  type UserStatus = 'active' | 'inactive';
  ```

- **Constants**: `UPPER_SNAKE_CASE`
  ```typescript
  const MAX_RETRY_COUNT = 3;
  const API_TIMEOUT_MS = 5000;
  ```

### File Organization

1. **Imports** - External dependencies first, then local imports
   ```typescript
   import { Bot } from 'grammy';
   import type { Context } from './types';
   import { logger } from './utils';
   ```

2. **Type Definitions** - Interfaces and types
   ```typescript
   interface UserData {
     id: string;
     name: string;
   }
   ```

3. **Constants** - Application constants
   ```typescript
   const DEFAULT_TIMEOUT = 5000;
   ```

4. **Implementation** - Main code
   ```typescript
   export function myFunction() {}
   ```

### TypeScript Best Practices

- Always use explicit types
- Avoid `any` type
- Use strict mode (`"strict": true`)
- Add return type annotations to functions
- Use `readonly` for immutable data

```typescript
// Good ✓
function processUser(user: User): void {
  const userName: string = user.name;
}

// Avoid ✗
function processUser(user: any) {
  const userName = user.name;
}
```

## Git Workflow

### Branch Naming

- **Feature**: `feature/add-feature-name`
- **Bug Fix**: `fix/fix-description`
- **Hotfix**: `hotfix/urgent-fix`
- **Refactor**: `refactor/refactor-description`
- **Documentation**: `docs/doc-description`

### Commit Messages

Follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples**:
```
feat(bot): add conversation support for deal creation

- Implement multi-step dialog
- Add validation
- Add confirmation keyboard

Closes #42
```

```
fix(utils): handle null values in validator

Previously crashed on null input. Now properly validates.

Closes #15
```

### Pushing Changes

1. Update your branch:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Push your branch:
   ```bash
   git push origin feature/your-feature
   ```

3. Create Pull Request on GitHub

## Testing

### Manual Testing

1. Start the bot in development mode:
   ```bash
   npm run dev
   ```

2. Open Telegram and interact with the bot:
   - Use `/start` to initialize
   - Test different commands and flows
   - Check console for logs

### Debugging

#### VSCode Debugger

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "DEN Bot Debug",
      "program": "${workspaceFolder}/src/index.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

Then press F5 to start debugging.

#### Console Logging

```typescript
console.log('Debug info:', variable);
console.error('Error:', error);
console.info('Info message');
console.warn('Warning');
```

## Common Issues

### Bot doesn't respond
- Check if BOT_TOKEN is correct in `.env`
- Make sure you have internet connection
- Check the console for errors

### Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript compilation errors
```bash
npm run build
```

Check the error messages and fix accordingly.

### Port already in use
If testing with a server (future feature):
```bash
lsof -i :3000
kill -9 <PID>
```

## Performance Tips

1. **Use proper TypeScript typing** - Helps catch errors early
2. **Avoid unnecessary re-renders** - Structure component state properly
3. **Use logging wisely** - Don't log sensitive information
4. **Database queries** - Use indexes for frequently queried fields
5. **Memory management** - Clean up listeners and subscriptions

## Useful Links

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Grammy Framework](https://grammy.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## Getting Help

- Open an [Issue](https://github.com/fox-and-cat/DigitalEscrowNetwork/issues)
- Check [Discussions](https://github.com/fox-and-cat/DigitalEscrowNetwork/discussions)
- Read [CONTRIBUTING.md](CONTRIBUTING.md)

Happy coding! 🚀
