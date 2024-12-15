import { useState, useMemo } from "react";

const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [items.length, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    paginate,
  };
};

export default usePagination;
