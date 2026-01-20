import { User, CreateUserDto, UpdateUserDto } from '../models/user';

export class InMemoryUserRepository {
  private users: Map<number, User> = new Map();

  async init(): Promise<void> {
    console.log('📦 In-memory user repository initialized');
  }

  async findByUserId(userId: number): Promise<User | null> {
    return this.users.get(userId) || null;
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

    this.users.set(dto.userId, user);
    return user;
  }

  async update(userId: number, dto: UpdateUserDto): Promise<User | null> {
    const user = this.users.get(userId);
    
    if (!user) {
      return null;
    }

    const updatedUser: User = {
      ...user,
      ...dto,
      updatedAt: new Date(),
    };

    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async exists(userId: number): Promise<boolean> {
    return this.users.has(userId);
  }

  async isFullyRegistered(userId: number): Promise<boolean> {
    const user = this.users.get(userId);
    return user !== null && user !== undefined && user.agreementAccepted && user.role !== null;
  }

  // Дополнительные методы для отладки
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  clear(): void {
    this.users.clear();
  }

  getCount(): number {
    return this.users.size;
  }
}