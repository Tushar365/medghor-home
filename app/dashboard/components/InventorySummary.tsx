// app/dashboard/components/InventorySummary.tsx
import React from 'react';
import { Package, Calendar, Clipboard, Pill, ArrowDown } from 'lucide-react';

interface InventorySummaryProps {
  currentStock: number;
  incomingItems: number;
  genericItems: number;
  incomingGenericItems: number;
}

const InventorySummary: React.FC<InventorySummaryProps> = ({
  currentStock,
  incomingItems,
  genericItems,
  incomingGenericItems
}) => {
  return (
    <div className="bg-white border-2 sm:border-4 border-amber-700 rounded-lg shadow-lg mb-4 sm:mb-8 p-3 sm:p-6 relative">
      <div className="absolute -top-2 sm:-top-3 left-3 sm:left-6 bg-amber-700 text-white px-2 sm:px-4 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold">
        MEDGHOR DISTRIBUTION PRODUCT SUMMARY
      </div>
      <div className="pt-3 sm:pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-center mb-4">
          <div className="border-2 border-dashed border-amber-300 p-3 sm:p-4 rounded">
            <Package className="h-6 sm:h-8 w-6 sm:w-8 text-amber-700 mx-auto mb-1 sm:mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">
              {currentStock}
            </div>
            <div className="text-amber-700 font-serif text-sm sm:text-lg">Current Stock</div>
          </div>
          <div className="border-2 border-dashed border-amber-300 p-3 sm:p-4 rounded">
            <Calendar className="h-6 sm:h-8 w-6 sm:w-8 text-amber-700 mx-auto mb-1 sm:mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">
              {incomingItems}
            </div>
            <div className="text-amber-700 font-serif text-sm sm:text-lg">Incoming Items</div>
          </div>
          <div className="border-2 border-dashed border-amber-300 p-3 sm:p-4 rounded">
            <Clipboard className="h-6 sm:h-8 w-6 sm:w-8 text-amber-700 mx-auto mb-1 sm:mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">
              {currentStock + incomingItems}
            </div>
            <div className="text-amber-700 font-serif text-sm sm:text-lg">Total Items</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-center">
          <div className="border-2 border-dashed border-amber-300 p-3 sm:p-4 rounded">
            <Pill className="h-6 sm:h-8 w-6 sm:w-8 text-amber-700 mx-auto mb-1 sm:mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">
              {genericItems}
            </div>
            <div className="text-amber-700 font-serif text-sm sm:text-lg">Generic Items</div>
          </div>
          <div className="border-2 border-dashed border-amber-300 p-3 sm:p-4 rounded">
            <ArrowDown className="h-6 sm:h-8 w-6 sm:w-8 text-amber-700 mx-auto mb-1 sm:mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">
              {incomingGenericItems}
            </div>
            <div className="text-amber-700 font-serif text-sm sm:text-lg">Incoming Generic</div>
          </div>
          <div className="border-2 border-dashed border-amber-300 p-3 sm:p-4 rounded">
            <Clipboard className="h-6 sm:h-8 w-6 sm:w-8 text-amber-700 mx-auto mb-1 sm:mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-serif">
              {genericItems + incomingGenericItems}
            </div>
            <div className="text-amber-700 font-serif text-sm sm:text-lg">Total Generic</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySummary;