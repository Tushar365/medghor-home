// app/dashboard/components/CurrentGenericProductsList.tsx
import React, { useState } from 'react';
import { Package, ChevronLeft, ChevronRight } from 'lucide-react';

interface genericProducts {
  _id: string;
  name: string;
  _creationTime: number;
}

interface CurrentGenericProductsListProps {
  genericproducts: genericProducts[];
}

const ITEMS_PER_PAGE = 5;

const CurrentGenericProductsList: React.FC<CurrentGenericProductsListProps> = ({ genericproducts }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(genericproducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const genericProducts = genericproducts.slice(startIndex, endIndex);

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
    <div className="bg-green-50 border-2 sm:border-4 border-green-700 rounded-lg shadow-lg relative">
      <div className="absolute -top-2 sm:-top-3 left-3 sm:left-6 bg-green-700 text-white px-2 sm:px-4 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold">
        ★ AVAILABLE GENERIC PRODUCTS ★
      </div>
      <div className="p-3 sm:p-6 pt-4 sm:pt-8">
        <div className="text-center mb-4 sm:mb-6">
          <Package className="h-8 sm:h-12 w-8 sm:w-12 text-green-700 mx-auto mb-1 sm:mb-2" />
          <h3 className="text-lg sm:text-2xl font-bold text-green-800 font-serif">CURRENT INVENTORY</h3>
          <div className="w-12 sm:w-16 h-0.5 bg-green-700 mx-auto mt-1 sm:mt-2"></div>
          {genericproducts.length > 0 && (
            <p className="text-green-700 text-xs sm:text-sm font-serif mt-2">
              Showing {startIndex + 1} - {Math.min(endIndex, genericproducts.length)} of {genericproducts.length} medicines
            </p>
          )}
        </div>
        
        {genericproducts && genericproducts.length > 0 ? (
          <>
            <div className="space-y-2 sm:space-y-3 mb-4">
              {genericProducts.map((genericproduct, index) => (
                <div key={genericproduct._id} className="bg-white border-2 border-green-200 rounded p-3 sm:p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex-1">
                      <div className="font-bold text-green-900 text-sm sm:text-lg font-serif break-words">
                        {startIndex + index + 1}. {genericproduct.name.toUpperCase()}
                      </div>
                      <div className="text-green-700 text-xs sm:text-sm font-serif">
                        Stocked: {formatDate(genericproduct._creationTime)}
                      </div>
                    </div>
                    <div className="bg-green-100 border border-green-300 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                      <span className="text-green-800 font-bold text-xs sm:text-sm">IN STOCK</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-green-200">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-serif transition-colors ${
                    currentPage === 1
                      ? 'text-green-400 cursor-not-allowed'
                      : 'text-green-700 hover:bg-green-100 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                
                <div className="text-green-700 font-serif text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-serif transition-colors ${
                    currentPage === totalPages
                      ? 'text-green-400 cursor-not-allowed'
                      : 'text-green-700 hover:bg-green-100 cursor-pointer'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6 sm:py-8 border-2 border-dashed border-green-300 rounded bg-white">
            <Package className="h-12 sm:h-16 w-12 sm:w-16 text-green-400 mx-auto mb-2 sm:mb-3" />
            <h4 className="text-lg sm:text-xl font-bold text-green-800 font-serif mb-1 sm:mb-2">NO CURRENT STOCK</h4>
            <p className="text-green-600 font-serif text-sm sm:text-base">
              New arrivals will be posted here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentGenericProductsList;