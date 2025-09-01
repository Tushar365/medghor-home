'use client';

import React from 'react';
import { LogOut, User } from 'lucide-react';

interface DashboardHeaderProps {
  onLogoutAction: () => void;
}

export default function DashboardHeader({ onLogoutAction }: DashboardHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your current and upcoming products</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Admin User</span>
            </div>
            <button
              onClick={onLogoutAction}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}