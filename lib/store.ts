import { Category, Expense, UserPreferences } from './types';

const STORAGE_KEYS = {
  EXPENSES: 'expenses',
  CATEGORIES: 'categories',
  PREFERENCES: 'preferences',
} as const;

export const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', color: 'hsl(var(--chart-1))' },
  { id: '2', name: 'Transportation', color: 'hsl(var(--chart-2))' },
  { id: '3', name: 'Shopping', color: 'hsl(var(--chart-3))' },
  { id: '4', name: 'Bills & Utilities', color: 'hsl(var(--chart-4))' },
  { id: '5', name: 'Entertainment', color: 'hsl(var(--chart-5))' },
];

export const defaultPreferences: UserPreferences = {
  currency: 'USD',
  dateFormat: 'MM/dd/yyyy',
  numberFormat: 'en-US',
  theme: 'system',
};

export function getStoredExpenses(): Expense[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  return stored ? JSON.parse(stored) : [];
}

export function getStoredCategories(): Category[] {
  if (typeof window === 'undefined') return defaultCategories;
  const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return stored ? JSON.parse(stored) : defaultCategories;
}

export function getStoredPreferences(): UserPreferences {
  if (typeof window === 'undefined') return defaultPreferences;
  const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return stored ? JSON.parse(stored) : defaultPreferences;
}

export function storeExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
}

export function storeCategories(categories: Category[]): void {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

export function storePreferences(preferences: UserPreferences): void {
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
}