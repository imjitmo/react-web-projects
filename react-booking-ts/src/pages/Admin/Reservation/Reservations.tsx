import List from '@/components/Admin/Reservations/List';
import { Button } from '@/components/ui/button';
import SearchTerm from '@/components/UiHooks/Search';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useState } from 'react';

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex flex-col py-8 px-4 content-center-safe gap-4">
      <div className="flex flex-row flex-wrap gap-2 items-center border-b-4 pb-4">
        <div className="flex flex-row gap-2 items-center grow flex-wrap">
          <Tiptools title="Active Reservations" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Button className="bg-yellow-400 text-blue-950 dark:bg-blue-950 hover:dark:bg-blue-800 hover:text-slate-50 dark:text-slate-50 rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]">
              <span>Recent</span>
            </Button>
          </Tiptools>
          <Tiptools title="Past Reservations" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Button className="bg-yellow-400 text-blue-950 dark:bg-blue-950 hover:dark:bg-blue-800 hover:text-slate-50 dark:text-slate-50 rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]">
              <span>Past</span>
            </Button>
          </Tiptools>
          <Tiptools title="Cancelled Reservations" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Button className="bg-yellow-400 text-blue-950 dark:bg-blue-950 hover:dark:bg-blue-800 hover:text-slate-50 dark:text-slate-50 rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]">
              <span>Cancelled</span>
            </Button>
          </Tiptools>
        </div>
        <SearchTerm setSearchTerm={setSearchTerm} placeholder={'Search room name...'} />
      </div>
      <List />
    </div>
  );
};
export default Reservations;
