/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/UiHooks/DateRangePicker';
import { useGetReservationReports, useGetUserLogsReports } from '@/hooks/use/useReports';
import { zodResolver } from '@hookform/resolvers/zod';
import exportFromJSON from 'export-from-json';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const getReportSchema = z.object({
  reportType: z.string().min(1),
});

const initialValues = {
  reportType: '',
};

const Reports = () => {
  const form = useForm<z.infer<typeof getReportSchema>>({
    resolver: zodResolver(getReportSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });
  const [date, setDate] = useState<DateRange | undefined>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { isReservationReports, isPending: isConverting } = useGetReservationReports();
  const { isUseLogsReports, isPending: isGenerating } = useGetUserLogsReports();

  useEffect(() => {
    if (date?.from) setStartDate(date.from);
    if (date?.to) setEndDate(date.to);
  }, [date]);
  const handleSubmit = async (values: any) => {
    const todayDate = new Date();
    const fileName =
      values.reportType === 'reservation'
        ? 'res_report_' + todayDate.toLocaleDateString().split('/').join('_')
        : 'log_report' + todayDate.toLocaleDateString().split('/').join('_');
    const tableHeaderReservation = [
      'ID',
      'userId',
      'roomId',
      'userName',
      'checkIn',
      'checkOut',
      'bookTracking',
      'bookStatus',
      'amenities',
      'extras',
      'paymentType',
      'created_at',
    ];
    const tableHeaderUserLogs = ['id', 'userId', 'userEmail', 'userName', 'userType', 'action', 'created_at'];
    const exportType = exportFromJSON.types.csv;
    if (values?.reportType === 'reservation') {
      isReservationReports(
        { startDate: startDate, endDate: endDate },
        {
          onSuccess: (data) => {
            exportFromJSON({ data, fileName, fields: tableHeaderReservation, exportType });
          },
        }
      );
    } else {
      isUseLogsReports(
        { startDate: startDate, endDate: endDate },
        {
          onSuccess: (data) => {
            exportFromJSON({ data, fileName, fields: tableHeaderUserLogs, exportType });
          },
        }
      );
    }
  };
  return (
    <div className="flex justify-center  h-full w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2 flex-wrap justify-center"
        >
          <h1 className="text-2xl font-bold text-center mb-4">Generate a Report</h1>
          <FormField
            control={form.control}
            name="reportType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Report Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} name={field.name} onValueChange={field.onChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a Report Type" onBlur={field.onBlur} ref={field.ref} />
                      </SelectTrigger>
                      <SelectContent className="text-blue-950 dark:bg-slate-950 dark:text-slate-50">
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem
                            className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                            value="reservation"
                          >
                            Reservation
                          </SelectItem>
                          <SelectItem
                            className="hover:bg-blue-950 hover:text-slate-50 dark:hover:bg-slate-50 dark:hover:text-blue-950"
                            value="userlogs"
                          >
                            User Logs
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium pb-1">Date Range</label>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button className="h-full w-full" disabled={isConverting || isGenerating}>
              {isConverting || isGenerating ? <Loading size={20} /> : 'Generate'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default Reports;
