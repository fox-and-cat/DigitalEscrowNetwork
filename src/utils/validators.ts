import { DEAL_LIMITS } from '../config/constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateUsername(username: string): ValidationResult {
  // Убираем @ если есть
  const cleaned = username.startsWith('@') ? username.slice(1) : username;
  
  // Telegram username: 5-32 символа, a-z, 0-9, _
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/;
  
  if (!usernameRegex.test(cleaned)) {
    return {
      isValid: false,
      error: 'Invalid username format',
    };
  }

  return { isValid: true };
}

export function normalizeUsername(username: string): string {
  return username.toLowerCase().replace('@', '');
}

export function validateAmount(input: string): ValidationResult {
  const amount = parseFloat(input.replace(',', '.'));

  if (isNaN(amount)) {
    return {
      isValid: false,
      error: 'invalid_number',
    };
  }

  if (amount < DEAL_LIMITS.MIN_AMOUNT) {
    return {
      isValid: false,
      error: 'too_low',
    };
  }

  if (amount > DEAL_LIMITS.MAX_AMOUNT) {
    return {
      isValid: false,
      error: 'too_high',
    };
  }

  return { isValid: true };
}

export function parseAmount(input: string): number {
  return Math.round(parseFloat(input.replace(',', '.')) * 100) / 100;
}

export function validateDescription(description: string): ValidationResult {
  const length = description.trim().length;

  if (length < DEAL_LIMITS.MIN_DESCRIPTION_LENGTH) {
    return {
      isValid: false,
      error: 'too_short',
    };
  }

  if (length > DEAL_LIMITS.MAX_DESCRIPTION_LENGTH) {
    return {
      isValid: false,
      error: 'too_long',
    };
  }

  return { isValid: true };
}