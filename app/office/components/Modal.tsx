'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onCloseAction, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onCloseAction}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}