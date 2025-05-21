import List from '@/components/Admin/Reservations/List';
import { Button } from '@/components/ui/button';
import SearchTerm from '@/components/UiHooks/Search';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useState } from 'react';

const Reservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [onStatus, setOnStatus] = useState('active');
  return (
    <div className="flex flex-col py-8 px-4 content-center-safe gap-4">
      <div className="flex flex-row flex-wrap gap-2 items-center border-b-4 pb-4">
        <div className="flex flex-row gap-2 items-center grow flex-wrap">
          <Tiptools title="Active Reservations" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Button
              className={`${
                onStatus === 'active'
                  ? 'bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-blue-950 '
                  : 'bg-yellow-400 text-blue-950 hover:bg-blue-950 hover:text-slate-50'
              }   rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
              onClick={() => setOnStatus('active')}
              disabled={onStatus === 'active'}
            >
              <span>Recent</span>
            </Button>
          </Tiptools>
          <Tiptools title="Pending Reservations" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Button
              className={`${
                onStatus === 'pending'
                  ? 'bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-blue-950 '
                  : 'bg-yellow-400 text-blue-950 hover:bg-blue-950 hover:text-slate-50'
              }   rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
              onClick={() => setOnStatus('pending')}
              disabled={onStatus === 'pending'}
            >
              <span>Pending</span>
            </Button>
          </Tiptools>
          <Tiptools title="Past Reservations" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Button
              className={`${
                onStatus === 'past'
                  ? 'bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-blue-950 '
                  : 'bg-yellow-400 text-blue-950 hover:bg-blue-950 hover:text-slate-50'
              }   rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
              onClick={() => setOnStatus('past')}
              disabled={onStatus === 'past'}
            >
              <span>Completed</span>
            </Button>
          </Tiptools>
          <Tiptools title="Cancelled Reservations" titleClassName="text-sm text-blue-950 dark:text-slate-50">
            <Button
              className={`${
                onStatus === 'cancelled'
                  ? 'bg-blue-950 hover:bg-yellow-400 text-slate-50 hover:text-blue-950 '
                  : 'bg-yellow-400 text-blue-950 hover:bg-blue-950 hover:text-slate-50'
              }   rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
              onClick={() => setOnStatus('cancelled')}
              disabled={onStatus === 'cancelled'}
            >
              <span>Cancelled</span>
            </Button>
          </Tiptools>
        </div>
        <SearchTerm setSearchTerm={setSearchTerm} placeholder={'Search Guest Name...'} />
      </div>
      <List searchTerm={searchTerm} status={onStatus} />
    </div>
  );
};
export default Reservations;
