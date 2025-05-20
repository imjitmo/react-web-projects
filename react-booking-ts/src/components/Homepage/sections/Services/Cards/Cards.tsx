import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaCheck, FaClock, FaCreditCard } from 'react-icons/fa';
const Cards = () => {
  return (
    <div className="flex flex-row flex-wrap gap-2 justify-center items-center cursor-default">
      <Card className="w-[300px] md:w-[400px] h-auto text-slate-50 bg-slate-900/60 border-slate-900/70 hover:bg-slate-800/60 hover:border-slate-800/70">
        <CardHeader>
          <CardTitle className="flex content-center-safe items-center justify-center">
            <FaCreditCard className="size-12 text-yellow-400" />
          </CardTitle>
          <CardTitle className="flex content-center-safe items-center justify-center">
            <h2 className="text-xl font-medium">Stay First, Pay After!</h2>
          </CardTitle>
          <CardDescription className="text-slate-400">Enjoy your stay and pay after</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col content-center-safe self-center flex-wrap gap-1  justify-evenly">
            <li className="text-left flex flex-row gap-2 items-center">
              <FaCheck className="text-yellow-400" /> Decorated room, proper air conditioned
            </li>
            <li className="text-left flex flex-row gap-2 items-center">
              <FaCheck className="text-yellow-400" /> Private balcony
            </li>
            <li className="text-left flex flex-row gap-2 items-center">
              <FaCheck className="text-yellow-400" /> Amazing ammenities
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="w-[300px] md:w-[400px] h-auto text-slate-50 bg-slate-900/60 border-slate-900/70 hover:bg-slate-800/60 hover:border-slate-800/70">
        <CardHeader>
          <CardTitle className="flex content-center-safe items-center justify-center">
            <FaClock className="size-12 text-yellow-400" />
          </CardTitle>
          <CardTitle className="flex content-center-safe items-center justify-center">
            <h2 className="text-xl font-medium">24-hour Services</h2>
          </CardTitle>
          <CardDescription className="text-slate-400">Enjoy our 24-hour non-stop services</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col content-center-safe self-center flex-wrap gap-1  justify-evenly">
            <li className="text-left flex flex-row gap-2 items-center">
              <FaCheck className="text-yellow-400" /> 24-hour room service
            </li>
            <li className="text-left flex flex-row gap-2 items-center">
              <FaCheck className="text-yellow-400" /> 24-hour concierge service
            </li>
            <li className="text-left flex flex-row gap-2 items-center">
              <FaCheck className="text-yellow-400" /> 24-hour food delivery
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
export default Cards;
