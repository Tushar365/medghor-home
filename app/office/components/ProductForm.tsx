'use client';

import React, { useState } from 'react';

interface ProductFormProps {
  initialName?: string;
  onSubmitAction: (name: string) => Promise<void>;
  onCancelAction: () => void;
  submitLabel: string;
  submitColor: 'blue' | 'green';
}

export default function ProductForm({ 
  initialName = '', 
  onSubmitAction, 
  onCancelAction, 
  submitLabel, 
  submitColor 
}: ProductFormProps) {
  const [name, setName] = useState(initialName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmitAction(name.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonColorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${submitColor}-500 focus:border-transparent`}
          placeholder="Enter product name"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting || !name.trim()}
          className={`flex-1 ${buttonColorClasses[submitColor]} text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            submitLabel
          )}
        </button>
        <button
          type="button"
          onClick={onCancelAction}
          disabled={isSubmitting}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}