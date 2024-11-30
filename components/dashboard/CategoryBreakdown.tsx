'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category, Expense } from '@/lib/types';
import { getCategoryTotals } from '@/lib/utils/expenses';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryBreakdownProps {
  expenses: Expense[];
  categories: Category[];
}

export function CategoryBreakdown({ expenses, categories }: CategoryBreakdownProps) {
  const data = getCategoryTotals(expenses, categories);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-medium">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value}`, 'Total']}
                labelStyle={{ color: 'black' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ${category.value.toLocaleString()} ({Math.round((category.value / total) * 100)}%)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}