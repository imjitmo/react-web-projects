/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyFormatter } from '@/components/UiHooks/Formatter';
import { LucideToilet } from 'lucide-react';
import { IoBedOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
const Cards = (props: any) => {
  return (
    <div>
      <Card className="min-w-[260px] max-w-[260px] h-auto hover:scale-110 cursor-default">
        <CardHeader className="text-left">
          <CardTitle>{props.roomName}</CardTitle>
          <CardDescription className="capitalize">{props.roomType}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center justify-center content-center-safe">
          <div className="w-full">
            <img
              className="object-cover rounded cursor-pointer h-32 w-64"
              src={props.roomImg}
              alt={`${props.roomImg.substring(0, 4)} - img`}
            />
          </div>
          <p className="line-clamp-6 text-justify">{props.roomDesc}</p>
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <span className="flex flex-row gap-1">
                {props.roomBed}
                <IoBedOutline className="size-6" />
              </span>
              <span className="flex flex-row gap-1">
                {props.roomTb}
                <LucideToilet className="size-6" />
              </span>
            </div>
            <h2 className="text-xl font-bold text-right">{CurrencyFormatter(props.roomPrice)}</h2>
          </div>
        </CardContent>
        <CardFooter>
          <NavLink to="/auth">
            <Button className="bg-yellow-400 text-slate-950 hover:bg-blue-900 hover:text-slate-50">
              Check
            </Button>
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Cards;
