import { UserRole } from '../../config/constants';

export interface User {
  userId: number;
  username: string | null;
  role: UserRole | null;
  agreementAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  userId: number;
  username: string | null;
}

export interface UpdateUserDto {
  role?: UserRole;
  agreementAccepted?: boolean;
  username?: string | null;
}