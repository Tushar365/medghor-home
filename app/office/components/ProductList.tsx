'use client';

import React from 'react';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Edit2, Trash2, Package } from 'lucide-react';

interface ProductListProps {
  products: Doc<"products">[];
  onEditAction: (product: Doc<"products">) => void;
  onDeleteAction: (id: Id<"products">) => void;
  formatDateAction: (timestamp: number) => string;
}

export default function ProductList({ products, onEditAction, onDeleteAction, formatDateAction }: ProductListProps) {
  return (
    <div className="space-y-3">
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No products found</p>
          <p className="text-sm text-gray-400 mt-2">Add your first product to get started</p>
        </div>
      ) : (
        products.map((product) => (
          <div key={product._id} className="group flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Added: {formatDateAction(product._creationTime)}
              </p>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditAction(product)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit product"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteAction(product._id as Id<"products">)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete product"
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