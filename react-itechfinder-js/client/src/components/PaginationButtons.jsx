import _ from 'lodash';

const PaginationButtons = ({ setCurrentPage, currentPage, npage, recordsPerPage }) => {
  const showNextButton = currentPage !== npage;
  const showPrevButton = currentPage !== 1;
  const showFirstButton = currentPage !== 1;
  const showLastButton = currentPage !== npage;

  // page breaks
  const returnPageBreaks = (npage, currentPage, siblings) => {
    let totalPageInArray = 7 + siblings;
    if (totalPageInArray >= npage) return _.range(1, npage + 1);

    let leftSiblingsIndex = Math.max(currentPage - siblings, 1);
    let rightSiblingsIndex = Math.min(currentPage + siblings, npage);

    let showLeftDots = leftSiblingsIndex > 2;
    let showRightDots = rightSiblingsIndex < npage - 2;

    if (!showLeftDots && showRightDots) {
      let leftItemsCount = 3 + 2 * siblings;
      let leftRange = _.range(1, leftItemsCount + 1);
      return [...leftRange, ' ...', npage];
    } else if (showLeftDots && !showRightDots) {
      let rightItemsCount = 3 + 2 * siblings;
      let rightRange = _.range(npage - rightItemsCount + 1, npage + 1);
      return [1, '... ', ...rightRange];
    } else {
      let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
      return [1, '... ', ...middleRange, ' ...', npage];
    }
  };

  const prePage = () => {
    showPrevButton ? setCurrentPage(currentPage - 1) : null;
  };

  const changeCPage = (id) => {
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
  let pageArray = returnPageBreaks(npage, currentPage, 1);
  return (
    <section id="pagination" className="w-full mx-auto text-center my-4">
      <div className="join text-xs rounded-lg">
        <ul className="flex flex-wrap gap-1 w-full mx-auto">
          {/* {showPrevButton ? ( */}
          <li className="join-item btn" onClick={prePage}>
            <span className="font-semibold">&lsaquo;</span>
          </li>
          {/* ) : null} */}
          {/* {showFirstButton ? ( */}
          <li className="join-item btn" onClick={showFirstButton ? () => changeCPage(1) : null}>
            &laquo;
          </li>
          {/* ) : null} */}
          {/* {numbers.map((n, i) => (
            <li
              key={i}
              className={`join-item btn ${currentPage === n ? 'bg-blue-600' : ''}`}
              onClick={() => changeCPage(n)}
            >
              <span className={`${currentPage === n ? ' text-white' : ''} font-semibold`}>{n}</span>
            </li>
          ))} */}

          {pageArray.map((value) => (
            <li
              key={value}
              className={`join-item btn ${currentPage === value && 'bg-blue-600'}`}
              onClick={() => changeCPage(value)}
            >
              <span className={`${currentPage === value ? 'text-white' : ''} font-semibold`}>{value}</span>
            </li>
          ))}
          {/* {showLastButton ? ( */}
          <li className="join-item btn" onClick={showLastButton ? () => changeCPage(npage) : null}>
            &raquo;
          </li>
          {/* ) : null} */}
          {/* {showNextButton ? ( */}
          <li className="join-item btn" onClick={() => nextPage()}>
            <span className="font-semibold">&rsaquo;</span>
          </li>
          {/* ) : null} */}
        </ul>
      </div>
    </section>
  );
};

export default PaginationButtons;
