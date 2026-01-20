import { MongoClient, Db } from 'mongodb';
import config from '../config';
import { UserRepository } from './repositories/userRepository';
import { InMemoryUserRepository } from './repositories/inMemoryUserRepository';

// Общий интерфейс для обоих репозиториев
export interface IUserRepository {
  init(): Promise<void>;
  findByUserId(userId: number): Promise<any>;
  create(dto: any): Promise<any>;
  update(userId: number, dto: any): Promise<any>;
  exists(userId: number): Promise<boolean>;
  isFullyRegistered(userId: number): Promise<boolean>;
}

class Database {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  
  public userRepository: IUserRepository | null = null;

  async connect(): Promise<void> {
    if (config.useInMemoryDb) {
      console.log('⚠️  MongoDB URI not provided');
      console.log('📦 Using in-memory storage (data will be lost on restart)');
      
      this.userRepository = new InMemoryUserRepository();
      await this.userRepository.init();
      
      console.log('✅ In-memory database ready');
      return;
    }

    try {
      this.client = new MongoClient(config.mongodbUri!);
      await this.client.connect();
      
      this.db = this.client.db();
      
      this.userRepository = new UserRepository(this.db);
      await this.userRepository.init();
      
      console.log('✅ Connected to MongoDB');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('📴 Disconnected from MongoDB');
    } else {
      console.log('📴 In-memory storage cleared');
    }
  }

  getDb(): Db | null {
    return this.db;
  }

  isInMemoryMode(): boolean {
    return config.useInMemoryDb;
  }
}

export const database = new Database();
export default database;