import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FaBed, FaWifi } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa6';
import { IoFitness } from 'react-icons/io5';
import { RxDividerHorizontal } from 'react-icons/rx';

const Perks = () => {
  return (
    <section
      id="perks"
      className="min-h-screen text-slate-50 h-auto flex flex-col gap-4 content-center-safe items-center justify-center text-center dark:bg-slate-950 dark:text-slate-50 overscroll-contain overflow-y-auto py-10 md:py-0 flex-wrap"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 41, 59 , 0.8), rgba(2,6,23, 0.9)), url('https://mxpqoufbrlvnquooiege.supabase.co/storage/v1/object/public/team/DELUXE_BED.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <h3 className="text-3xl">Experience a good stay, enjoy fantastic offers</h3>
      <h4 className="text-xl uppercase text-yellow-400">Find our friendly welcoming reception</h4>
      <div className="flex flex-row flex-wrap items-center justify-center">
        <div className="group">
          <Card className="min-w-[250px] max-w-[280px] h-auto bg-slate-50/70 dark:text-slate-950 rounded-none border-none group-hover:bg-blue-950">
            <CardHeader></CardHeader>
            <CardContent className="flex flex-col content-center justify-center text-center items-center">
              <FaBed className="group-hover:text-yellow-400 text-blue-950 size-30 group-hover:size-24" />
              <p className="group-hover:text-slate-50 hidden group-hover:block">MASTER BEDROOMS</p>
              <RxDividerHorizontal size={120} className="text-yellow-400 group-hover:text-slate-50" />
              <p className="text-blue-950 group-hover:text-slate-50 block group-hover:hidden">
                MASTER BEDROOMS
              </p>
              <p className="text-yellow-400 hidden group-hover:block">SOFTNET HOTEL</p>
            </CardContent>
          </Card>
        </div>
        <div className="group">
          <Card className="min-w-[250px] max-w-[280px] h-auto bg-slate-50/70 dark:text-slate-950 rounded-none border-none group-hover:bg-blue-950">
            <CardHeader></CardHeader>
            <CardContent className="flex flex-col content-center justify-center text-center items-center">
              <FaBuilding className="group-hover:text-yellow-400 text-blue-950 size-30 group-hover:size-24" />
              <p className="group-hover:text-slate-50 hidden group-hover:block">SEA VIEW BALCONY</p>
              <RxDividerHorizontal size={120} className="text-yellow-400 group-hover:text-slate-50" />
              <p className="text-blue-950 group-hover:text-slate-50 block group-hover:hidden">
                SEA VIEW BALCONY
              </p>
              <p className="text-yellow-400 hidden group-hover:block">SOFTNET HOTEL</p>
            </CardContent>
          </Card>
        </div>
        <div className="group">
          <Card className="min-w-[250px] max-w-[280px] h-auto bg-slate-50/70 dark:text-slate-950 rounded-none border-none group-hover:bg-blue-950">
            <CardHeader></CardHeader>
            <CardContent className="flex flex-col content-center justify-center text-center items-center">
              <IoFitness className="group-hover:text-yellow-400 text-blue-950 size-30 group-hover:size-24" />
              <p className="group-hover:text-slate-50 hidden group-hover:block">FITNESS CENTER</p>
              <RxDividerHorizontal size={120} className="text-yellow-400 group-hover:text-slate-50" />
              <p className="text-blue-950 group-hover:text-slate-50 block group-hover:hidden">
                FITNESS CENTER
              </p>
              <p className="text-yellow-400 hidden group-hover:block">SOFTNET HOTEL</p>
            </CardContent>
          </Card>
        </div>

        <div className="group">
          <Card className="min-w-[250px] max-w-[280px] h-auto bg-slate-50/70 dark:text-slate-950 rounded-none border-none group-hover:bg-blue-950">
            <CardHeader></CardHeader>
            <CardContent className="flex flex-col content-center justify-center text-center items-center">
              <FaWifi className="group-hover:text-yellow-400 text-blue-950 size-30 group-hover:size-24" />
              <p className="group-hover:text-slate-50 hidden group-hover:block">WIFI COVERAGE</p>
              <RxDividerHorizontal size={120} className="text-yellow-400 group-hover:text-slate-50" />
              <p className="text-blue-950 group-hover:text-slate-50 block group-hover:hidden">
                WIFI COVERAGE
              </p>
              <p className="text-yellow-400 hidden group-hover:block">SOFTNET HOTEL</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default Perks;
