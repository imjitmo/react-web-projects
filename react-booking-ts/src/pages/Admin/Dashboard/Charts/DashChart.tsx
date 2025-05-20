/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function DashChart(props: any) {
  const chartData = [
    {
      object: 'available',
      rooms: props.roomData.filter((room: any) => room.roomStatus === 'available').length,
      fill: '#4CAF50',
    },
    {
      object: 'reserved',
      rooms: props?.roomData.filter((room: any) => room.roomStatus === 'reserved').length,
      fill: '#2196F3',
    },
    {
      object: 'preparing',
      rooms: props.roomData.filter((room: any) => room.roomStatus === 'preparing').length,
      fill: '#FF5733',
    },
    {
      object: 'unavailable',
      rooms: props.roomData.filter((room: any) => room.roomStatus === 'unavailable').length,
      fill: '#E91E63',
    },
  ];

  const chartConfig = {
    rooms: {
      label: 'Rooms',
    },
    available: {
      label: 'Available',
    },
    reserved: {
      label: 'Reserved',
    },
    preparing: {
      label: 'Preparing',
    },
    unavailable: {
      label: 'Unavailable',
    },
  } satisfies ChartConfig;
  return (
    <Card className="flex flex-col min-w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Room Chart</CardTitle>
        <CardDescription>Room Availability</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="rooms" nameKey="object" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Availability Trend Chart.
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total room availabilities</div>
      </CardFooter>
    </Card>
  );
}
