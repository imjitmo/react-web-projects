import Add from '@/components/Admin/Modules/Add';
import Loading from '@/components/Spinner/Loading';
import PaginationButtons from '@/components/UiHooks/PaginationButtons';
import SearchTerm from '@/components/UiHooks/Search';
import { useViewModules } from '@/hooks/use/useModules';
import Pagination from '@/hooks/utils/Pagination';
import { useState } from 'react';
import ModuleCards from './Cards/ModuleCards';

const Modules = () => {
  const { moduleData, isPending } = useViewModules();
  const [searchTerm, setSearchTerm] = useState('');

  //module list
  const moduleList = searchTerm
    ? moduleData?.filter((room) => room.moduleName.toLowerCase().includes(searchTerm))
    : moduleData;

  //pagination
  const { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex } = Pagination();
  const records = moduleList?.slice(firstIndex, lastIndex);
  const totalPages = moduleData ? moduleData.length : 0;
  const numPage = Math.ceil(totalPages / recordsPerPage);

  return (
    <div className="flex flex-col py-8 px-4 content-center-safe gap-4">
      <div className="flex flex-row flex-wrap gap-2 items-center border-b-4 pb-4">
        <div className="grow">
          <Add />
        </div>
        <SearchTerm setSearchTerm={setSearchTerm} placeholder={'Search module name...'} />
      </div>
      <div className="flex flex-wrap flex-row gap-4">
        {isPending && (
          <div className="w-full h-full flex text-center justify-center">
            <p>
              <Loading size={30} />
            </p>
          </div>
        )}
        {moduleList?.length === 0 && !isPending && (
          <div className="w-full h-full flex text-center justify-center">
            <p>No modules found.</p>
          </div>
        )}
        {moduleList &&
          moduleList?.length > 0 &&
          !isPending &&
          records?.map((module, i) => <ModuleCards key={i} {...module} />)}
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center content-center-safe">
        <div className="w-auto">
          {numPage ? (
            <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} npage={numPage} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Modules;
