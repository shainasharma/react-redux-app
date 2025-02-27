import React from "react";

interface Props {
  onPageChange: (size: number) => void;
}

const Pagination: React.FC<Props> = ({ onPageChange }) => {
  return (
    <select onChange={(e) => onPageChange(Number(e.target.value))}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>
  );
};

export default Pagination;
