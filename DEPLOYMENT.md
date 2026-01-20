# Deployment Guide

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Telegram Bot Token
- (Optional) MongoDB instance for data persistence

## Local Deployment

### 1. Clone the repository
```bash
git clone https://github.com/fox-and-cat/DigitalEscrowNetwork.git
cd DigitalEscrowNetwork
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
cp .env.example .env
```

### 4. Configure environment variables
Edit `.env` with your values:
```dotenv
BOT_TOKEN=your_bot_token_here
MONGODB_URI=mongodb://localhost:27017/den_bot
NODE_ENV=production
```

### 5. Build the project
```bash
npm run build
```

### 6. Start the bot
```bash
npm start
```

## Docker Deployment

### Build Docker image
```bash
docker build -t den-bot:latest .
```

### Run container
```bash
docker run -d \
  --name den-bot \
  -e BOT_TOKEN=your_token_here \
  -e MONGODB_URI=mongodb://mongo:27017/den_bot \
  -e NODE_ENV=production \
  den-bot:latest
```

### Docker Compose deployment
```bash
docker-compose up -d
```

## VPS/Cloud Deployment

### Example: Heroku (deprecated but process is similar for other platforms)

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set BOT_TOKEN=your_token_here
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set NODE_ENV=production
   ```
5. Deploy: `git push heroku main`

### Example: AWS EC2

1. Launch an EC2 instance (Ubuntu 20.04)
2. SSH into the instance
3. Install Node.js:
   ```bash
   curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Clone and setup:
   ```bash
   git clone https://github.com/fox-and-cat/DigitalEscrowNetwork.git
   cd DigitalEscrowNetwork
   npm install
   ```
5. Configure PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name den-bot
   pm2 startup
   pm2 save
   ```

### Example: DigitalOcean App Platform

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set run command: `npm start`
4. Add environment variables in App Spec
5. Deploy

## Monitoring

### Using PM2
```bash
pm2 monit              # Monitor process
pm2 logs den-bot      # View logs
pm2 restart den-bot   # Restart bot
```

### Using Docker
```bash
docker logs -f den-bot              # View logs
docker restart den-bot              # Restart container
docker stats den-bot                # View resource usage
```

## Backup & Restore

### MongoDB backup
```bash
mongodump --uri="mongodb://localhost:27017/den_bot" --out=./backup
```

### MongoDB restore
```bash
mongorestore --uri="mongodb://localhost:27017/den_bot" ./backup/den_bot
```

## Troubleshooting

### Bot not responding
1. Check if bot token is correct
2. Check internet connection
3. View logs: `npm start` or `docker logs`

### Database connection issues
1. Verify MongoDB is running
2. Check connection string in .env
3. Verify network access permissions

### High memory usage
1. Check for memory leaks in logs
2. Restart the bot
3. Monitor with PM2: `pm2 monit`

## Production Checklist

- [ ] Environment variables are set correctly
- [ ] Node.js is updated to latest LTS version
- [ ] Application is built with `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Process manager (PM2) is configured
- [ ] Monitoring is enabled
- [ ] Backups are scheduled
- [ ] Error tracking is enabled (if applicable)
- [ ] Security updates are applied
- [ ] .env file is not committed to version control
