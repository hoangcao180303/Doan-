import React from 'react';
import { Button } from "@/components/ui/button"; // Đảm bảo đường dẫn đúng
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageSelect = (page) => {
    onPageChange(page);
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Luôn hiển thị tất cả số trang
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((page) => (
      <Button
        key={page}
        onClick={() => handlePageSelect(page)}
        className={`mx-1 ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}
      >
        {page}
      </Button>
    ));
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <Button 
        disabled={currentPage === 1} 
        onClick={() => {
          onPageChange(currentPage - 1);
          window.scrollTo(0, 0); // Cuộn lên đầu trang
        }}
      >
        <CircleArrowLeft color="#ffffff" />
      </Button>
      {renderPageNumbers()}
      <Button 
        disabled={currentPage === totalPages} 
        onClick={() => {
          onPageChange(currentPage + 1);
          window.scrollTo(0, 0); // Cuộn lên đầu trang
        }}
      >
        <CircleArrowRight color="#ffffff" />
      </Button>
    </div>
  );
}

export default Pagination;