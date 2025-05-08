import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FaBed, FaWifi } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa6';
import { IoFitness } from 'react-icons/io5';
import { RxDividerHorizontal } from 'react-icons/rx';

const Perks = () => {
  return (
    <section
      id="perks"
      className="bg-slate-50 relative h-screen overflow-hidden flex flex-col content-center justify-center items-center gap-8 p-8"
    >
      <h3 className="text-3xl">Experience a good stay, enjoy fantastic offers</h3>
      <h4 className="text-xl uppercase text-blue-900">Find our friendly welcoming reception</h4>
      <div className="flex flex-row p-8 gap-2">
        <Card className="w-96 h-auto hover:invert">
          <CardHeader></CardHeader>
          <CardContent className="flex flex-col content-center justify-center text-center items-center">
            <FaBed size={120} />
            <RxDividerHorizontal size={120} />
            <p>MASTER BEDROOMS</p>
          </CardContent>
        </Card>

        <Card className="w-96 h-auto hover:invert">
          <CardHeader></CardHeader>
          <CardContent className="flex flex-col content-center justify-center text-center items-center">
            <FaBuilding size={120} />
            <RxDividerHorizontal size={120} />
            <p>SEA VIEW BALCONY</p>
          </CardContent>
        </Card>

        <Card className="w-96 h-auto hover:invert">
          <CardHeader></CardHeader>
          <CardContent className="flex flex-col content-center justify-center text-center items-center">
            <IoFitness size={120} />
            <RxDividerHorizontal size={120} />
            <p>FITNESS CENTER</p>
          </CardContent>
        </Card>

        <Card className="w-96 h-auto hover:invert">
          <CardHeader></CardHeader>
          <CardContent className="flex flex-col content-center justify-center text-center items-center">
            <FaWifi size={120} />
            <RxDividerHorizontal size={120} />
            <p>WIFI COVERAGE</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default Perks;
