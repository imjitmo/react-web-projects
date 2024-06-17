import _ from 'lodash';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  npage: number;
  setCurrentPage: (id: number) => void;
}

const PaginationButtons = ({ setCurrentPage, currentPage, npage }: PaginationProps) => {
  const showNextButton = currentPage !== npage;
  const showPrevButton = currentPage !== 1;
  // const showFirstButton = currentPage !== 1;
  // const showLastButton = currentPage !== npage;

  // page breaks
  const returnPageBreaks = (npage: number, currentPage: number, siblings: number) => {
    const totalPageInArray = 7 + siblings;
    if (totalPageInArray >= npage) return _.range(1, npage + 1);

    const leftSiblingsIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingsIndex = Math.min(currentPage + siblings, npage);

    const showLeftDots = leftSiblingsIndex > 2;
    const showRightDots = rightSiblingsIndex < npage - 2;

    if (!showLeftDots && showRightDots) {
      const leftItemsCount = 3 + 2 * siblings;
      const leftRange = _.range(1, leftItemsCount + 1);
      return [...leftRange, ' ...', npage];
    } else if (showLeftDots && !showRightDots) {
      const rightItemsCount = 3 + 2 * siblings;
      const rightRange = _.range(npage - rightItemsCount + 1, npage + 1);
      return [1, '... ', ...rightRange];
    } else {
      const middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
      return [1, '... ', ...middleRange, ' ...', npage];
    }
  };

  const prePage = () => {
    showPrevButton ? setCurrentPage(currentPage - 1) : null;
  };

  const changeCPage = (id: string | number) => {
    typeof id === 'number'
      ? setCurrentPage(id)
      : id === '... '
      ? setCurrentPage(1)
      : id === ' ...'
      ? setCurrentPage(npage)
      : null;
  };

  const nextPage = () => {
    showNextButton ? setCurrentPage(currentPage + 1) : null;
  };
  const pageArray = returnPageBreaks(npage, currentPage, 1);

  return (
    <Pagination className="cursor-pointer my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => prePage()} />
        </PaginationItem>

        <PaginationItem className="hidden md:block">
          {pageArray.map((page) => (
            <PaginationLink key={page} onClick={() => changeCPage(page)} isActive={page === currentPage}>
              <span className={`${page === currentPage ? 'text-slate-950' : ''}`}>{page}</span>
            </PaginationLink>
          ))}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={() => nextPage()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationButtons;
