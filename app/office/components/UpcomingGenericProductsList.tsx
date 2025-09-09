'use client';

import React from 'react';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Edit2, Trash2, Calendar, Shield } from 'lucide-react';

interface UpcomingGenericProductsListProps {
  products: Doc<"upcomingGenericProducts">[];
  onEditAction: (product: Doc<"upcomingGenericProducts">) => void;
  onDeleteAction: (id: Id<"upcomingGenericProducts">) => void;
  formatDateAction: (timestamp: number) => string;
}

export default function UpcomingGenericProductsList({ products, onEditAction, onDeleteAction, formatDateAction }: UpcomingGenericProductsListProps) {
  const isOverdue = (expectedDate: number) => {
    return new Date(expectedDate) < new Date();
  };

  const isDueSoon = (expectedDate: number) => {
    const today = new Date();
    const expected = new Date(expectedDate);
    const diffTime = expected.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="space-y-3">
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No upcoming generic products found</p>
          <p className="text-sm text-gray-400 mt-2">Schedule your next generic product launch</p>
        </div>
      ) : (
        products.map((product) => (
          <div key={product._id} className="group flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Generic
                </span>
                {isOverdue(product.expectedDate) && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    Overdue
                  </span>
                )}
                {isDueSoon(product.expectedDate) && !isOverdue(product.expectedDate) && (
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Due Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Expected: {formatDateAction(product.expectedDate)}
              </p>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditAction(product)}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Edit upcoming generic product"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteAction(product._id as Id<"upcomingGenericProducts">)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete upcoming generic product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}