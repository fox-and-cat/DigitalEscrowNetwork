import dotenv from 'dotenv';

dotenv.config();

interface Config {
  botToken: string;
  mongodbUri: string | null;
  nodeEnv: string;
  useInMemoryDb: boolean;
}

function getEnvVariable(key: string, required: boolean = true): string {
  const value = process.env[key];
  
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value || '';
}

export const config: Config = {
  botToken: getEnvVariable('BOT_TOKEN'),
  mongodbUri: process.env.MONGODB_URI || null,
  nodeEnv: getEnvVariable('NODE_ENV', false) || 'development',
  useInMemoryDb: !process.env.MONGODB_URI,
};

export default config;