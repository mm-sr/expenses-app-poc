'use client';

import { QuickStatsCards } from '@/components/dashboard/QuickStats';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { AddExpenseDialog } from '@/components/expenses/AddExpenseDialog';
import { useEffect, useState } from 'react';
import { QuickStats, Expense, Category } from '@/lib/types';
import { getStoredExpenses, getStoredCategories, storeExpenses } from '@/lib/store';
import { validateExpense } from '@/lib/utils/expenses';

export default function Dashboard() {
  const [stats, setStats] = useState<QuickStats>({
    totalSpending: 0,
    availableBudget: 2000,
    savingsRate: 0,
    monthOverMonth: 0,
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadedExpenses = getStoredExpenses();
    const loadedCategories = getStoredCategories();
    setExpenses(loadedExpenses);
    setCategories(loadedCategories);

    const totalSpending = loadedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setStats({
      ...stats,
      totalSpending,
      savingsRate: Math.round(((stats.availableBudget - totalSpending) / stats.availableBudget) * 100),
    });
  }, []);

  const handleSaveExpense = (expense: Expense) => {
    if (!validateExpense(expense)) {
      return;
    }

    const isEdit = expenses.some(e => e.id === expense.id);
    const updatedExpenses = isEdit
      ? expenses.map(e => (e.id === expense.id ? expense : e))
      : [...expenses, expense];

    setExpenses(updatedExpenses);
    storeExpenses(updatedExpenses);

    const totalSpending = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    setStats({
      ...stats,
      totalSpending,
      savingsRate: Math.round(((stats.availableBudget - totalSpending) / stats.availableBudget) * 100),
    });
  };

  const handleDeleteExpense = (expense: Expense) => {
    const updatedExpenses = expenses.filter(e => e.id !== expense.id);
    setExpenses(updatedExpenses);
    storeExpenses(updatedExpenses);
  };

  return (
    <main className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <AddExpenseDialog categories={categories} onSave={handleSaveExpense} />
      </div>
      
      <QuickStatsCards stats={stats} />
      
      <div className="grid gap-4 md:grid-cols-4">
        <SpendingChart expenses={expenses} />
        <CategoryBreakdown expenses={expenses} categories={categories} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <RecentTransactions
          expenses={expenses}
          categories={categories}
          onEdit={(expense) => <AddExpenseDialog
            categories={categories}
            onSave={handleSaveExpense}
            expense={expense}
          />}
          onDelete={handleDeleteExpense}
        />
      </div>
    </main>
  );
}