export type Category = {
  id: string;
  name: string;
  color: string;
  budget?: number;
  icon?: string;
  archived?: boolean;
};

export type Expense = {
  id: string;
  amount: number;
  categoryId: string;
  date: string;
  description: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserPreferences = {
  currency: string;
  dateFormat: string;
  numberFormat: string;
  theme: 'light' | 'dark' | 'system';
};

export type Period = 'week' | 'month' | 'year';

export type QuickStats = {
  totalSpending: number;
  availableBudget: number;
  savingsRate: number;
  monthOverMonth: number;
};