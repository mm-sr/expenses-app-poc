'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Period } from '@/lib/types';
import { getPeriodStart, getDailyExpenses } from '@/lib/utils/date';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface SpendingChartProps {
  expenses: Array<{
    date: string;
    amount: number;
  }>;
}

const CustomXAxis = ({ fontSize = 12, tickLine = false, ...props }) => (
  <XAxis fontSize={fontSize} tickLine={tickLine} {...props} />
);

const CustomYAxis = ({ fontSize = 12, tickLine = false, ...props }) => (
  <YAxis fontSize={fontSize} tickLine={tickLine} {...props} />
);

export function SpendingChart({ expenses }: SpendingChartProps) {
  const [period, setPeriod] = useState<Period>('month');
  const startDate = getPeriodStart(period);
  const data = getDailyExpenses(expenses, startDate, new Date());

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Spending Overview</CardTitle>
        <div className="space-x-2">
          <Button
            variant={period === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('week')}
          >
            Week
          </Button>
          <Button
            variant={period === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('month')}
          >
            Month
          </Button>
          <Button
            variant={period === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('year')}
          >
            Year
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <CustomXAxis dataKey="date" />
              <CustomYAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value: number) => [`$${value}`, 'Spending']}
                labelStyle={{ color: 'black' }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}