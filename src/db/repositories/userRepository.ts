import { Collection, Db } from 'mongodb';
import { User, CreateUserDto, UpdateUserDto } from '../models/user';
import { IUserRepository } from '../index';



export class UserRepository implements IUserRepository {
  private collection: Collection<User>;

  async findByUsername(username: string): Promise<any> {
    return this.collection.findOne({ username });
  }

  constructor(db: Db) {
    this.collection = db.collection<User>('users');
  }

  async init(): Promise<void> {
    await this.collection.createIndex({ userId: 1 }, { unique: true });
    console.log('📦 MongoDB user repository initialized');
  }

  async findByUserId(userId: number): Promise<User | null> {
    return this.collection.findOne({ userId });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const now = new Date();
    
    const user: User = {
      userId: dto.userId,
      username: dto.username,
      role: null,
      agreementAccepted: false,
      createdAt: now,
      updatedAt: now,
    };

    await this.collection.insertOne(user);
    return user;
  }

  async update(userId: number, dto: UpdateUserDto): Promise<User | null> {
    const result = await this.collection.findOneAndUpdate(
      { userId },
      { 
        $set: { 
          ...dto, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    );

    return result;
  }

  async exists(userId: number): Promise<boolean> {
    const count = await this.collection.countDocuments({ userId }, { limit: 1 });
    return count > 0;
  }

  async isFullyRegistered(userId: number): Promise<boolean> {
    const user = await this.findByUserId(userId);
    return user !== null && user.agreementAccepted && user.role !== null;
  }
}