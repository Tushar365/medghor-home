'use client';

import React, { useState } from 'react';

interface UpcomingProductFormProps {
  initialName?: string;
  initialDate?: string;
  onSubmitAction: (name: string, date: string) => Promise<void>;
  onCancelAction: () => void;
  submitLabel: string;
}

export default function UpcomingProductForm({ 
  initialName = '', 
  initialDate = '', 
  onSubmitAction, 
  onCancelAction, 
  submitLabel 
}: UpcomingProductFormProps) {
  const [name, setName] = useState(initialName);
  const [date, setDate] = useState(initialDate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) return;
    
    setIsSubmitting(true);
    try {
      await onSubmitAction(name.trim(), date);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter product name"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !date}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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