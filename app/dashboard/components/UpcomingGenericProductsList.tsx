// app/dashboard/components/UpcomingProductsList.tsx
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface UpcomingGenericProducts {
  _id: string;
  name: string;
  expectedDate: number;
}

interface UpcomingGenericProductsListProps {
  upcomingGenericProducts: UpcomingGenericProducts[]; 
}

const ITEMS_PER_PAGE = 5;

const UpcomingGenericProductsList: React.FC<UpcomingGenericProductsListProps> = ({ upcomingGenericProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sort products by expected date
  const sortedProducts = [...upcomingGenericProducts].sort((a, b) => a.expectedDate - b.expectedDate);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGenericProducts = sortedProducts.slice(startIndex, endIndex);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-orange-50 border-2 sm:border-4 border-orange-700 rounded-lg shadow-lg relative">
      <div className="absolute -top-2 sm:-top-3 left-3 sm:left-6 bg-orange-700 text-white px-2 sm:px-4 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold">
        ★ UPCOMMING GENERIC PRODUCTS ★
      </div>
      <div className="p-3 sm:p-6 pt-4 sm:pt-8">
        <div className="text-center mb-4 sm:mb-6">
          <Calendar className="h-8 sm:h-12 w-8 sm:w-12 text-orange-700 mx-auto mb-1 sm:mb-2" />
          <h3 className="text-lg sm:text-2xl font-bold text-orange-800 font-serif">EXPECTED ARRIVALS</h3>
          <div className="w-12 sm:w-16 h-0.5 bg-orange-700 mx-auto mt-1 sm:mt-2"></div>
          {sortedProducts.length > 0 && (
            <p className="text-orange-700 text-xs sm:text-sm font-serif mt-2">
              Showing {startIndex + 1} - {Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} medicines
            </p>
          )}
        </div>
        
        {sortedProducts && sortedProducts.length > 0 ? (
          <>
            <div className="space-y-2 sm:space-y-3 mb-4">
              {currentGenericProducts.map((product, index) => (
                <div key={product._id} className="bg-white border-2 border-orange-200 rounded p-3 sm:p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex-1">
                      <div className="font-bold text-orange-900 text-sm sm:text-lg font-serif break-words">
                        {startIndex + index + 1}. {product.name.toUpperCase()}
                      </div>
                      <div className="text-orange-700 text-xs sm:text-sm font-serif">
                        Expected: {formatDate(product.expectedDate)}
                      </div>
                    </div>
                    <div className="bg-orange-100 border border-orange-300 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                      <span className="text-orange-800 font-bold text-xs sm:text-sm">PENDING</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-orange-200">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-serif transition-colors ${
                    currentPage === 1
                      ? 'text-orange-400 cursor-not-allowed'
                      : 'text-orange-700 hover:bg-orange-100 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                
                <div className="text-orange-700 font-serif text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-serif transition-colors ${
                    currentPage === totalPages
                      ? 'text-orange-400 cursor-not-allowed'
                      : 'text-orange-700 hover:bg-orange-100 cursor-pointer'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6 sm:py-8 border-2 border-dashed border-orange-300 rounded bg-white">
            <Calendar className="h-12 sm:h-16 w-12 sm:w-16 text-orange-400 mx-auto mb-2 sm:mb-3" />
            <h4 className="text-lg sm:text-xl font-bold text-orange-800 font-serif mb-1 sm:mb-2">NO SCHEDULED ARRIVALS</h4>
            <p className="text-orange-600 font-serif text-sm sm:text-base">
              Future shipments will be announced here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpcomingGenericProductsList;