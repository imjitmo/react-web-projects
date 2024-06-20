import { useState } from 'react';

export default function Pagination() {
  const recordsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  return { recordsPerPage, currentPage, setCurrentPage, lastIndex, firstIndex };
}
