import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type DateRange } from 'react-day-picker';
interface DatePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function DatePickerWithRange({ className, date, setDate }: DatePickerProps) {
  const datePastInvalid = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const dateFutureValid = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            fromDate={datePastInvalid}
            toDate={dateFutureValid}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
