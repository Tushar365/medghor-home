'use client';

import React from 'react';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Edit2, Trash2, Shield } from 'lucide-react';

interface GenericProductListProps {
  products: Doc<"genericProducts">[];
  onEditAction: (product: Doc<"genericProducts">) => void;
  onDeleteAction: (id: Id<"genericProducts">) => void;
  formatDateAction: (timestamp: number) => string;
}

export default function GenericProductList({ products, onEditAction, onDeleteAction, formatDateAction }: GenericProductListProps) {
  return (
    <div className="space-y-3">
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No generic products found</p>
          <p className="text-sm text-gray-400 mt-2">Add your first generic product to get started</p>
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
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Added: {formatDateAction(product._creationTime)}
              </p>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditAction(product)}
                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Edit generic product"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteAction(product._id as Id<"genericProducts">)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete generic product"
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