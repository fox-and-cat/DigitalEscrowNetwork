import { MongoClient, Db } from 'mongodb';
import config from '../config';
import { UserRepository } from './repositories/userRepository';
import { InMemoryUserRepository } from './repositories/inMemoryUserRepository';
import { InMemoryDealRepository } from './repositories/inMemoryDealRepository';

export interface IUserRepository {
  init(): Promise<void>;
  findByUserId(userId: number): Promise<any>;
  findByUsername(username: string): Promise<any>;
  create(dto: any): Promise<any>;
  update(userId: number, dto: any): Promise<any>;
  exists(userId: number): Promise<boolean>;
  isFullyRegistered(userId: number): Promise<boolean>;
}

export interface IDealRepository {
  init(): Promise<void>;
  generateDealId(): string;
  create(dto: any): Promise<any>;
  findByDealId(dealId: string): Promise<any>;
  findByUserId(userId: number): Promise<any[]>;
  findActiveByUserId(userId: number): Promise<any[]>;
  update(dealId: string, dto: any): Promise<any>;
  updateStatus(dealId: string, status: any): Promise<any>;
}

class Database {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  
  public userRepository: IUserRepository | null = null;
  public dealRepository: IDealRepository | null = null;

  async connect(): Promise<void> {
    if (config.useInMemoryDb) {
      console.log('⚠️  MongoDB URI not provided');
      console.log('📦 Using in-memory storage (data will be lost on restart)');
      
      this.userRepository = new InMemoryUserRepository();
      this.dealRepository = new InMemoryDealRepository();
      
      await this.userRepository.init();
      await this.dealRepository.init();
      
      console.log('✅ In-memory database ready');
      return;
    }

    try {
      this.client = new MongoClient(config.mongodbUri!);
      await this.client.connect();
      
      this.db = this.client.db();
      
      this.userRepository = new UserRepository(this.db);
      await this.userRepository.init();
      
      // TODO: Add MongoDB DealRepository when needed
      this.dealRepository = new InMemoryDealRepository();
      await this.dealRepository.init();
      
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