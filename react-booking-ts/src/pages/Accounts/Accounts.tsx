import Add from '@/components/Admin/Accounts/Add';
import Loading from '@/components/Spinner/Loading';
import { Button } from '@/components/ui/button';
import PaginationButtons from '@/components/UiHooks/PaginationButtons';
import SearchTerm from '@/components/UiHooks/Search';
import Tiptools from '@/components/UiHooks/Tooltip';
import { useGetAllUsers } from '@/hooks/use/useUsers';
import Pagination from '@/hooks/utils/Pagination';
import { useStore } from '@/store/store';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import AccountCards from './Cards/AccountCards';
import Logs from '../../components/Admin/Accounts/Logs';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { userData, isPending } = useGetAllUsers();
  const [onPageType, setOnPageType] = useState<string>('users');
  const { userType } = useStore(
    useShallow((state) => ({
      userType: state.userType,
    }))
  );

  //room list
  const userList = searchTerm
    ? userData?.filter((user) => user.firstName.toLowerCase().includes(searchTerm))
    : userData;

  //pagination
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = userList?.slice(firstIndex, lastIndex);
  const totalPages = userData ? userData.length : 0;
  const numPage = Math.ceil(totalPages / recordsPerPage);

  return (
    <div className="flex flex-col py-8 px-4 content-center-safe gap-4">
      <div className="flex flex-row flex-wrap gap-2 items-center border-b-4 pb-4">
        <div className="grow">
          <div className="flex flex-col gap-4">
            {userType === 'admin' && (
              <Tiptools title="Add a User" titleClassName="text-sm text-blue-950 dark:text-slate-50">
                <Add />
              </Tiptools>
            )}
            <div className="flex flex-row gap-2">
              <Tiptools title="User List" titleClassName="text-sm text-blue-950 dark:text-slate-50">
                <Button
                  className={`bg-yellow-400 text-blue-900 hover:bg-blue-900 hover:text-slate-50 rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
                  onClick={() => setOnPageType('users')}
                  disabled={onPageType === 'users'}
                >
                  <span>List</span>
                </Button>
              </Tiptools>
              <Tiptools title="User Logs" titleClassName="text-sm text-blue-950 dark:text-slate-50">
                <Button
                  className={`bg-yellow-400 text-blue-900 hover:bg-blue-900 hover:text-slate-50 rounded-lg flex flex-row gap-2 items-center justify-center w-[200px]`}
                  onClick={() => setOnPageType('logs')}
                  disabled={onPageType === 'logs'}
                >
                  <span>Logs</span>
                </Button>
              </Tiptools>
            </div>
          </div>
        </div>

        <SearchTerm setSearchTerm={setSearchTerm} placeholder={'Search user name...'} />
      </div>
      {onPageType === 'users' && (
        <>
          <div className="flex flex-wrap flex-row gap-4">
            {isPending && (
              <div className="w-full h-full flex text-center justify-center">
                <p>
                  <Loading size={30} /> Loading Rooms...
                </p>
              </div>
            )}
            {userList?.length === 0 && !isPending && (
              <div className="w-full h-full flex text-center justify-center">
                <p>No rooms found.</p>
              </div>
            )}
            {userList &&
              userList?.length > 0 &&
              !isPending &&
              records?.map((user, i) => <AccountCards {...user} key={i} />)}
          </div>
          <div className="flex flex-wrap flex-row gap-4">
            {records?.length === 0 && !isPending && (
              <div className="w-full h-full flex text-center justify-center">
                <p>No users found.</p>
              </div>
            )}
          </div>
          <div className="flex flex-row flex-wrap justify-center items-center content-center-safe">
            <div className="w-auto">
              {numPage ? (
                <PaginationButtons
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  npage={numPage}
                />
              ) : null}
            </div>
          </div>
        </>
      )}
      <>{onPageType === 'logs' && <Logs searchTerm={searchTerm} />}</>
    </div>
  );
};
export default Accounts;
