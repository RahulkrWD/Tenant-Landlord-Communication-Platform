import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const items = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // First page
  if (startPage > 1) {
    items.push(
      <BootstrapPagination.First key="first" onClick={() => onPageChange(1)} />
    );
    items.push(
      <BootstrapPagination.Prev
        key="prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />
    );
    if (startPage > 2) {
      items.push(<BootstrapPagination.Ellipsis key="start-ellipsis" />);
    }
  }

  // Page numbers
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <BootstrapPagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  // Last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push(<BootstrapPagination.Ellipsis key="end-ellipsis" />);
    }
    items.push(
      <BootstrapPagination.Next
        key="next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      />
    );
    items.push(
      <BootstrapPagination.Last
        key="last"
        onClick={() => onPageChange(totalPages)}
      />
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>{items}</BootstrapPagination>
    </div>
  );
}

export default Pagination;
