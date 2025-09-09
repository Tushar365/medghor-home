// app/dashboard/page.tsx
'use client';
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import DashboardHeader from './components/DashboardHeader';
import InventorySummary from './components/InventorySummary';
import ProductsGrid from './components/ProductsGrid';
import ContactFooter from './components/ContactFooter';

const MedghorAnnounceBoard = () => {
  const products = useQuery(api.inventory.listProducts);
  const upcomingProducts = useQuery(api.inventory.listUpcomingProducts);
  const genericProducts = useQuery(api.inventory.listGenericProducts);
  const upcomingGenericProducts = useQuery(api.inventory.listUpcomingGenericProducts);

  const isLoading = products === undefined || upcomingProducts === undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-pulse text-4xl sm:text-6xl mb-4">📋</div>
          <p className="text-amber-800 text-lg sm:text-xl font-serif">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-4 sm:py-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        <DashboardHeader />
        <InventorySummary 
          currentStock={products?.length || 0}
          incomingItems={upcomingProducts?.length || 0}
          genericItems={genericProducts?.length || 0}
          incomingGenericItems={upcomingGenericProducts?.length || 0}
        />
        <ProductsGrid 
          products={products}
          upcomingProducts={upcomingProducts}
          genericProducts={genericProducts || []}
          upcomingGenericProducts={upcomingGenericProducts || []}
        />
        <ContactFooter />
      </div>
    </div>
  );
};

export default MedghorAnnounceBoard;