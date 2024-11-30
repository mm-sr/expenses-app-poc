'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Percent, PiggyBank, Wallet } from 'lucide-react';
import { QuickStats } from '@/lib/types';

interface QuickStatsProps {
  stats: QuickStats;
}

export function QuickStatsCards({ stats }: QuickStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalSpending.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Budget</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.availableBudget.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Remaining this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.savingsRate}%</div>
          <p className="text-xs text-muted-foreground">Of monthly income</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Month over Month</CardTitle>
          {stats.monthOverMonth > 0 ? (
            <ArrowUpIcon className="h-4 w-4 text-destructive" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-primary" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.monthOverMonth > 0 ? '+' : ''}{stats.monthOverMonth}%
          </div>
          <p className="text-xs text-muted-foreground">Compared to last month</p>
        </CardContent>
      </Card>
    </div>
  );
}