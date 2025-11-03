'use client';

import React from 'react';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Edit2, Trash2, Package } from 'lucide-react';

interface ProductListProps {
  products: Doc<'products'>[];
  onEditAction: (product: Doc<'products'>) => void | Promise<void>;
  onDeleteAction: (id: Id<'products'>) => void | Promise<void>;
  formatDateAction: (timestamp: number) => string;
}

export default function ProductList({
  products,
  onEditAction,
  onDeleteAction,
  formatDateAction,
}: ProductListProps) {
  return (
    <div className="space-y-3">
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No products found</p>
          <p className="text-sm text-gray-400 mt-2">
            Add your first product to get started
          </p>
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Added: {formatDateAction(product._creationTime)}
              </p>
            </div>

            {/* Always-visible actions (no hover) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Edit product"
                title="Edit product"
                className="inline-flex items-center gap-2 px-3 h-11 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  void onEditAction(product);
                }}
              >
                <Edit2 className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only sm:inline">Edit</span>
              </button>

              <button
                type="button"
                aria-label="Delete product"
                title="Delete product"
                className="inline-flex items-center gap-2 px-3 h-11 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  void onDeleteAction(product._id as Id<'products'>);
                }}
              >
                <Trash2 className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only sm:inline">Delete</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
