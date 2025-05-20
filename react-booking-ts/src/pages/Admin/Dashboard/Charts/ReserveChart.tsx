/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function ReserveChart(props: any) {
  const reserveChartData = [
    {
      object: 'pending',
      reservations: props.reserveData.filter((item: any) => item.bookStatus === 'pending').length,
      fill: '#4CAF50',
    },
    {
      object: 'approved',
      reservations: props.reserveData.filter((item: any) => item.bookStatus === 'approved').length,
      fill: '#2196F3',
    },
    {
      object: 'cancelled',
      reservations: props.reserveData.filter((item: any) => item.bookStatus === 'cancelled').length,
      fill: '#FF5733',
    },
    {
      object: 'in',
      reservations: props.reserveData.filter((item: any) => item.bookStatus === 'checked in').length,
      fill: '#E91E63',
    },
    {
      object: 'out',
      rooreservations: props.reserveData.filter((item: any) => item.bookStatus === 'checked out').length,
      fill: '#E91',
    },
  ];

  const reserveChartConfig = {
    reservations: {
      label: 'Reservations',
    },
    pending: {
      label: 'Available',
    },
    approved: {
      label: 'Approved',
    },
    cancelled: {
      label: 'Cancelled',
    },
    in: {
      label: 'Checked In',
    },
    out: {
      label: 'Checked Out',
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col min-w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Reservation Chart</CardTitle>
        <CardDescription>Reservation Density</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={reserveChartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={reserveChartData} dataKey="reservations" nameKey="object" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Reservation Density Chart.
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total Reservation Movement</div>
      </CardFooter>
    </Card>
  );
}
