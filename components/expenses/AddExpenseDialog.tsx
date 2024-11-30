'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Category, Expense } from '@/lib/types';
import { useState } from 'react';
import { generateExpenseId } from '@/lib/utils/expenses';
import { CalendarDatePicker } from '@/components/ui/calendar-date-picker';

interface AddExpenseDialogProps {
  categories: Category[];
  onSave: (expense: Expense) => void;
  expense?: Expense;
}

export function AddExpenseDialog({ categories, onSave, expense }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(expense?.amount.toString() || '');
  const [description, setDescription] = useState(expense?.description || '');
  const [categoryId, setCategoryId] = useState(expense?.categoryId || categories[0]?.id);
  const [date, setDate] = useState<Date>(expense ? new Date(expense.date) : new Date());
  const [notes, setNotes] = useState(expense?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExpense: Expense = {
      id: expense?.id || generateExpenseId(),
      amount: parseFloat(amount),
      description,
      categoryId,
      date: date.toISOString(),
      notes,
      createdAt: expense?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newExpense);
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    if (!expense) {
      setAmount('');
      setDescription('');
      setCategoryId(categories[0]?.id);
      setDate(new Date());
      setNotes('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={expense ? 'ghost' : 'default'}>
          {expense ? 'Edit' : 'Add Expense'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{expense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
            <DialogDescription>
              {expense ? 'Update the expense details below.' : 'Enter the expense details below.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Date</Label>
              <div className="col-span-3">
                <CalendarDatePicker date={date} onSelect={setDate} />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{expense ? 'Update' : 'Add'} Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}