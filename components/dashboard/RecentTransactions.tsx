'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Category, Expense } from '@/lib/types';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecentTransactionsProps {
  expenses: Expense[];
  categories: Category[];
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export function RecentTransactions({ 
  expenses, 
  categories, 
  onEdit, 
  onDelete 
}: RecentTransactionsProps) {
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 10);

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {sortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between space-x-4 rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {expense.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getCategoryName(expense.categoryId)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm font-medium">
                    ${expense.amount.toLocaleString()}
                  </p>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(expense)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(expense)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}