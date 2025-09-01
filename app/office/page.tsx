'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id, Doc } from '@/convex/_generated/dataModel';
import { Plus, Package, Calendar } from 'lucide-react';

// Import components
import Login from './components/Login';
import DashboardHeader from './components/DashboardHeader';
import ProductList from './components/ProductList';
import UpcomingProductsList from './components/UpcomingProductsList';
import Modal from './components/Modal';
import ProductForm from './components/ProductForm';
import UpcomingProductForm from './components/UpcomingProductForm';

export default function OfficePage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Modal states
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddUpcoming, setShowAddUpcoming] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Doc<"products"> | null>(null);
  const [editingUpcoming, setEditingUpcoming] = useState<Doc<"upcomingProducts"> | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('office_logged_in') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  // Queries
  const products = useQuery(api.inventory.listProducts) || [];
  const upcomingProducts = useQuery(api.inventory.listUpcomingProducts) || [];

  // Mutations
  const addProduct = useMutation(api.inventory.addProduct);
  const editProduct = useMutation(api.inventory.editProduct);
  const removeProduct = useMutation(api.inventory.removeProduct);
  const addUpcomingProduct = useMutation(api.inventory.addUpcomingProduct);
  const editUpcomingProduct = useMutation(api.inventory.editUpcomingProduct);
  const removeUpcomingProduct = useMutation(api.inventory.removeUpcomingProduct);

  // Auth handlers
  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem('office_logged_in', 'true');
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('office_logged_in');
    setIsAuthenticated(false);
  };

  // Product handlers
  const handleAddProduct = async (name: string) => {
    try {
      await addProduct({ name });
      setShowAddProduct(false);
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
  };

  const handleEditProduct = async (name: string) => {
    if (!editingProduct) return;
    
    try {
      await editProduct({ id: editingProduct._id, name });
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to edit product:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (id: Id<"products">) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await removeProduct({ id });
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  // Upcoming product handlers
  const handleAddUpcoming = async (name: string, date: string) => {
    try {
      await addUpcomingProduct({ 
        name, 
        expectedDate: new Date(date).getTime() 
      });
      setShowAddUpcoming(false);
    } catch (error) {
      console.error('Failed to add upcoming product:', error);
      throw error;
    }
  };

  const handleEditUpcoming = async (name: string, date: string) => {
    if (!editingUpcoming) return;
    
    try {
      await editUpcomingProduct({ 
        id: editingUpcoming._id, 
        name, 
        expectedDate: new Date(date).getTime() 
      });
      setEditingUpcoming(null);
    } catch (error) {
      console.error('Failed to edit upcoming product:', error);
      throw error;
    }
  };

  const handleDeleteUpcoming = async (id: Id<"upcomingProducts">) => {
    if (window.confirm('Are you sure you want to delete this upcoming product?')) {
      try {
        await removeUpcomingProduct({ id });
      } catch (error) {
        console.error('Failed to delete upcoming product:', error);
      }
    }
  };

  // Edit handlers
  const startEditingProduct = (product: Doc<"products">) => {
    setEditingProduct(product);
  };

  const startEditingUpcoming = (product: Doc<"upcomingProducts">) => {
    setEditingUpcoming(product);
  };

  // Modal close handlers
  const closeAllModals = () => {
    setShowAddProduct(false);
    setShowAddUpcoming(false);
    setEditingProduct(null);
    setEditingUpcoming(null);
  };

  // Helper functions
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginAction={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onLogoutAction={handleLogout} />
      
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Products Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Current Products</h2>
                  <p className="text-sm text-gray-500">{products.length} products available</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddProduct(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <ProductList
              products={products}
              onEditAction={startEditingProduct}
              onDeleteAction={handleDeleteProduct}
              formatDateAction={formatDate}
            />
          </div>

          {/* Upcoming Products Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Products</h2>
                  <p className="text-sm text-gray-500">{upcomingProducts.length} products scheduled</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddUpcoming(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Upcoming</span>
              </button>
            </div>

            <UpcomingProductsList
              products={upcomingProducts}
              onEditAction={startEditingUpcoming}
              onDeleteAction={handleDeleteUpcoming}
              formatDateAction={formatDate}
            />
          </div>
        </div>

        {/* Add Product Modal */}
        <Modal
          isOpen={showAddProduct}
          onCloseAction={() => setShowAddProduct(false)}
          title="Add New Product"
        >
          <ProductForm
            onSubmitAction={handleAddProduct}
            onCancelAction={() => setShowAddProduct(false)}
            submitLabel="Add Product"
            submitColor="blue"
          />
        </Modal>

        {/* Add Upcoming Product Modal */}
        <Modal
          isOpen={showAddUpcoming}
          onCloseAction={() => setShowAddUpcoming(false)}
          title="Add Upcoming Product"
        >
          <UpcomingProductForm
            onSubmitAction={handleAddUpcoming}
            onCancelAction={() => setShowAddUpcoming(false)}
            submitLabel="Add Product"
          />
        </Modal>

        {/* Edit Product Modal */}
        <Modal
          isOpen={!!editingProduct}
          onCloseAction={closeAllModals}
          title="Edit Product"
        >
          {editingProduct && (
            <ProductForm
              initialName={editingProduct.name}
              onSubmitAction={handleEditProduct}
              onCancelAction={closeAllModals}
              submitLabel="Update Product"
              submitColor="blue"
            />
          )}
        </Modal>

        {/* Edit Upcoming Product Modal */}
        <Modal
          isOpen={!!editingUpcoming}
          onCloseAction={closeAllModals}
          title="Edit Upcoming Product"
        >
          {editingUpcoming && (
            <UpcomingProductForm
              initialName={editingUpcoming.name}
              initialDate={new Date(editingUpcoming.expectedDate).toISOString().split('T')[0]}
              onSubmitAction={handleEditUpcoming}
              onCancelAction={closeAllModals}
              submitLabel="Update Product"
            />
          )}
        </Modal>
      </div>
    </div>
  );
}