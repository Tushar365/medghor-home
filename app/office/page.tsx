'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id, Doc } from '@/convex/_generated/dataModel';
import { Plus, Package, Calendar, Shield } from 'lucide-react';

// Import existing components
import Login from './components/Login';
import DashboardHeader from './components/DashboardHeader';
import ProductList from './components/ProductList';
import UpcomingProductsList from './components/UpcomingProductsList';
import Modal from './components/Modal';
import ProductForm from './components/ProductForm';
import UpcomingProductForm from './components/UpcomingProductForm';

// New Generic Product Components
import GenericProductList from './components/GenericProductList';
import UpcomingGenericProductsList from './components/UpcomingGenericProductsList';

type ProductTab = 'branded' | 'generic';
type AccentColor = 'blue' | 'green';

/* Tailwind-safe class maps (avoid dynamic template strings) */
const colorStyles: Record<
  AccentColor,
  {
    navActive: string;
    navInactive: string;
    navBorder: string;
    chipBg: string;
    chipText: string;
    btn: string;
    icon: string;
    headerBadge: string;
  }
> = {
  blue: {
    navActive: 'bg-blue-50 text-blue-700',
    navInactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
    navBorder: 'border border-blue-200',
    chipBg: 'bg-blue-100',
    chipText: 'text-blue-700',
    btn: 'bg-blue-600 hover:bg-blue-700',
    icon: 'text-blue-600',
    headerBadge: 'bg-blue-100',
  },
  green: {
    navActive: 'bg-green-50 text-green-700',
    navInactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
    navBorder: 'border border-green-200',
    chipBg: 'bg-green-100',
    chipText: 'text-green-700',
    btn: 'bg-green-600 hover:bg-green-700',
    icon: 'text-green-600',
    headerBadge: 'bg-green-100',
  },
};

/* Phone-safe date helpers (avoid ISO timezone shifts) */
const toInputDateLocal = (ts: number) => {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const parseDateInputLocal = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
};

export default function EnhancedOfficePage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<ProductTab>('branded');

  // Modal states for branded products
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddUpcoming, setShowAddUpcoming] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Doc<'products'> | null>(null);
  const [editingUpcoming, setEditingUpcoming] = useState<Doc<'upcomingProducts'> | null>(null);

  // Modal states for generic products
  const [showAddGenericProduct, setShowAddGenericProduct] = useState(false);
  const [showAddUpcomingGeneric, setShowAddUpcomingGeneric] = useState(false);
  const [editingGenericProduct, setEditingGenericProduct] = useState<Doc<'genericProducts'> | null>(null);
  const [editingUpcomingGeneric, setEditingUpcomingGeneric] = useState<Doc<'upcomingGenericProducts'> | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('office_logged_in') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);

  // Queries for branded products
  const products = useQuery(api.inventory.listProducts) || [];
  const upcomingProducts = useQuery(api.inventory.listUpcomingProducts) || [];

  // Queries for generic products
  const genericProducts = useQuery(api.inventory.listGenericProducts) || [];
  const upcomingGenericProducts = useQuery(api.inventory.listUpcomingGenericProducts) || [];

  // Mutations for branded products
  const addProduct = useMutation(api.inventory.addProduct);
  const editProduct = useMutation(api.inventory.editProduct);
  const removeProduct = useMutation(api.inventory.removeProduct);
  const addUpcomingProduct = useMutation(api.inventory.addUpcomingProduct);
  const editUpcomingProduct = useMutation(api.inventory.editUpcomingProduct);
  const removeUpcomingProduct = useMutation(api.inventory.removeUpcomingProduct);

  // Mutations for generic products
  const addGenericProduct = useMutation(api.inventory.addGenericProduct);
  const editGenericProduct = useMutation(api.inventory.editGenericProduct);
  const removeGenericProduct = useMutation(api.inventory.removeGenericProduct);
  const addUpcomingGenericProduct = useMutation(api.inventory.addUpcomingGenericProduct);
  const editUpcomingGenericProduct = useMutation(api.inventory.editUpcomingGenericProduct);
  const removeUpcomingGenericProduct = useMutation(api.inventory.removeUpcomingGenericProduct);

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

  // Branded Product handlers
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

  const handleDeleteProduct = async (id: Id<'products'>) => {
    if (window.confirm('Are you sure you want to delete this branded product?')) {
      try {
        await removeProduct({ id });
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleAddUpcoming = async (name: string, date: string) => {
    try {
      await addUpcomingProduct({
        name,
        expectedDate: parseDateInputLocal(date),
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
        expectedDate: parseDateInputLocal(date),
      });
      setEditingUpcoming(null);
    } catch (error) {
      console.error('Failed to edit upcoming product:', error);
      throw error;
    }
  };

  const handleDeleteUpcoming = async (id: Id<'upcomingProducts'>) => {
    if (window.confirm('Are you sure you want to delete this upcoming branded product?')) {
      try {
        await removeUpcomingProduct({ id });
      } catch (error) {
        console.error('Failed to delete upcoming product:', error);
      }
    }
  };

  // Generic Product handlers
  const handleAddGenericProduct = async (name: string) => {
    try {
      await addGenericProduct({ name });
      setShowAddGenericProduct(false);
    } catch (error) {
      console.error('Failed to add generic product:', error);
      throw error;
    }
  };

  const handleEditGenericProduct = async (name: string) => {
    if (!editingGenericProduct) return;
    try {
      await editGenericProduct({ id: editingGenericProduct._id, name });
      setEditingGenericProduct(null);
    } catch (error) {
      console.error('Failed to edit generic product:', error);
      throw error;
    }
  };

  const handleDeleteGenericProduct = async (id: Id<'genericProducts'>) => {
    if (window.confirm('Are you sure you want to delete this generic product?')) {
      try {
        await removeGenericProduct({ id });
      } catch (error) {
        console.error('Failed to delete generic product:', error);
      }
    }
  };

  const handleAddUpcomingGeneric = async (name: string, date: string) => {
    try {
      await addUpcomingGenericProduct({
        name,
        expectedDate: parseDateInputLocal(date),
      });
      setShowAddUpcomingGeneric(false);
    } catch (error) {
      console.error('Failed to add upcoming generic product:', error);
      throw error;
    }
  };

  const handleEditUpcomingGeneric = async (name: string, date: string) => {
    if (!editingUpcomingGeneric) return;
    try {
      await editUpcomingGenericProduct({
        id: editingUpcomingGeneric._id,
        name,
        expectedDate: parseDateInputLocal(date),
      });
      setEditingUpcomingGeneric(null);
    } catch (error) {
      console.error('Failed to edit upcoming generic product:', error);
      throw error;
    }
  };

  const handleDeleteUpcomingGeneric = async (id: Id<'upcomingGenericProducts'>) => {
    if (window.confirm('Are you sure you want to delete this upcoming generic product?')) {
      try {
        await removeUpcomingGenericProduct({ id });
      } catch (error) {
        console.error('Failed to delete upcoming generic product:', error);
      }
    }
  };

  // Edit handlers
  const startEditingProduct = (product: Doc<'products'>) => {
    setEditingProduct(product);
  };

  const startEditingUpcoming = (product: Doc<'upcomingProducts'>) => {
    setEditingUpcoming(product);
  };

  const startEditingGenericProduct = (product: Doc<'genericProducts'>) => {
    setEditingGenericProduct(product);
  };

  const startEditingUpcomingGeneric = (product: Doc<'upcomingGenericProducts'>) => {
    setEditingUpcomingGeneric(product);
  };

  // Modal close handlers
  const closeAllModals = () => {
    setShowAddProduct(false);
    setShowAddUpcoming(false);
    setEditingProduct(null);
    setEditingUpcoming(null);
    setShowAddGenericProduct(false);
    setShowAddUpcomingGeneric(false);
    setEditingGenericProduct(null);
    setEditingUpcomingGeneric(null);
  };

  // Helper functions
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get current data based on active tab
  const getCurrentProducts = () => {
    return activeTab === 'branded' ? products : genericProducts;
  };

  const getCurrentUpcomingProducts = () => {
    return activeTab === 'branded' ? upcomingProducts : upcomingGenericProducts;
  };

  // Tab configuration
  const tabs = [
    {
      id: 'branded' as ProductTab,
      label: 'Branded Products',
      icon: Package,
      color: 'blue' as AccentColor,
      count: products.length + upcomingProducts.length,
    },
    {
      id: 'generic' as ProductTab,
      label: 'Generic Products',
      icon: Shield,
      color: 'green' as AccentColor,
      count: genericProducts.length + upcomingGenericProducts.length,
    },
  ];

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLoginAction={handleLogin} />;
  }

  const activeAccent: AccentColor = activeTab === 'branded' ? 'blue' : 'green';
  const accent = colorStyles[activeAccent];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onLogoutAction={handleLogout} />

      <div className="max-w-6xl mx-auto px-6 pb-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <nav className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const styles = colorStyles[tab.color];
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`Switch to ${tab.label}`}
                    className={`flex items-center space-x-2 px-4 rounded-md text-sm font-medium transition-colors min-h-11 ${
                      isActive ? `${styles.navActive} ${styles.navBorder}` : styles.navInactive
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        isActive ? `${styles.chipBg} ${styles.chipText}` : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Products Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`${accent.headerBadge} p-2 rounded-lg`}>
                  {activeTab === 'branded' ? (
                    <Package className={`w-6 h-6 ${accent.icon}`} />
                  ) : (
                    <Shield className={`w-6 h-6 ${accent.icon}`} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Current {activeTab === 'branded' ? 'Branded' : 'Generic'} Products
                  </h2>
                  <p className="text-sm text-gray-500">{getCurrentProducts().length} products available</p>
                </div>
              </div>
              <button
                onClick={() =>
                  activeTab === 'branded' ? setShowAddProduct(true) : setShowAddGenericProduct(true)
                }
                aria-label="Add product"
                className={`flex items-center space-x-2 ${accent.btn} text-white px-4 h-11 rounded-lg transition-colors`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {activeTab === 'branded' ? (
              <ProductList
                products={products}
                onEditAction={startEditingProduct}
                onDeleteAction={handleDeleteProduct}
                formatDateAction={formatDate}
              />
            ) : (
              <GenericProductList
                products={genericProducts}
                onEditAction={startEditingGenericProduct}
                onDeleteAction={handleDeleteGenericProduct}
                formatDateAction={formatDate}
              />
            )}
          </div>

          {/* Upcoming Products Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`${accent.headerBadge} p-2 rounded-lg`}>
                  <Calendar className={`w-6 h-6 ${accent.icon}`} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Upcoming {activeTab === 'branded' ? 'Branded' : 'Generic'} Products
                  </h2>
                  <p className="text-sm text-gray-500">{getCurrentUpcomingProducts().length} products scheduled</p>
                </div>
              </div>
              <button
                onClick={() =>
                  activeTab === 'branded' ? setShowAddUpcoming(true) : setShowAddUpcomingGeneric(true)
                }
                aria-label="Add upcoming product"
                className={`flex items-center space-x-2 ${accent.btn} text-white px-4 h-11 rounded-lg transition-colors`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Upcoming</span>
              </button>
            </div>

            {activeTab === 'branded' ? (
              <UpcomingProductsList
                products={upcomingProducts}
                onEditAction={startEditingUpcoming}
                onDeleteAction={handleDeleteUpcoming}
                formatDateAction={formatDate}
              />
            ) : (
              <UpcomingGenericProductsList
                products={upcomingGenericProducts}
                onEditAction={startEditingUpcomingGeneric}
                onDeleteAction={handleDeleteUpcomingGeneric}
                formatDateAction={formatDate}
              />
            )}
          </div>
        </div>

        {/* Branded Product Modals */}
        <Modal
          isOpen={showAddProduct}
          onCloseAction={() => setShowAddProduct(false)}
          title="Add New Branded Product"
        >
          <ProductForm
            onSubmitAction={handleAddProduct}
            onCancelAction={() => setShowAddProduct(false)}
            submitLabel="Add Branded Product"
            submitColor="blue"
          />
        </Modal>

        <Modal
          isOpen={showAddUpcoming}
          onCloseAction={() => setShowAddUpcoming(false)}
          title="Add Upcoming Branded Product"
        >
          <UpcomingProductForm
            onSubmitAction={handleAddUpcoming}
            onCancelAction={() => setShowAddUpcoming(false)}
            submitLabel="Add Branded Product"
          />
        </Modal>

        <Modal isOpen={!!editingProduct} onCloseAction={closeAllModals} title="Edit Branded Product">
          {editingProduct && (
            <ProductForm
              initialName={editingProduct.name}
              onSubmitAction={handleEditProduct}
              onCancelAction={closeAllModals}
              submitLabel="Update Branded Product"
              submitColor="blue"
            />
          )}
        </Modal>

        <Modal
          isOpen={!!editingUpcoming}
          onCloseAction={closeAllModals}
          title="Edit Upcoming Branded Product"
        >
          {editingUpcoming && (
            <UpcomingProductForm
              initialName={editingUpcoming.name}
              initialDate={toInputDateLocal(editingUpcoming.expectedDate)}
              onSubmitAction={handleEditUpcoming}
              onCancelAction={closeAllModals}
              submitLabel="Update Branded Product"
            />
          )}
        </Modal>

        {/* Generic Product Modals */}
        <Modal
          isOpen={showAddGenericProduct}
          onCloseAction={() => setShowAddGenericProduct(false)}
          title="Add New Generic Product"
        >
          <ProductForm
            onSubmitAction={handleAddGenericProduct}
            onCancelAction={() => setShowAddGenericProduct(false)}
            submitLabel="Add Generic Product"
            submitColor="green"
          />
        </Modal>

        <Modal
          isOpen={showAddUpcomingGeneric}
          onCloseAction={() => setShowAddUpcomingGeneric(false)}
          title="Add Upcoming Generic Product"
        >
          <UpcomingProductForm
            onSubmitAction={handleAddUpcomingGeneric}
            onCancelAction={() => setShowAddUpcomingGeneric(false)}
            submitLabel="Add Generic Product"
          />
        </Modal>

        <Modal
          isOpen={!!editingGenericProduct}
          onCloseAction={closeAllModals}
          title="Edit Generic Product"
        >
          {editingGenericProduct && (
            <ProductForm
              initialName={editingGenericProduct.name}
              onSubmitAction={handleEditGenericProduct}
              onCancelAction={closeAllModals}
              submitLabel="Update Generic Product"
              submitColor="green"
            />
          )}
        </Modal>

        <Modal
          isOpen={!!editingUpcomingGeneric}
          onCloseAction={closeAllModals}
          title="Edit Upcoming Generic Product"
        >
          {editingUpcomingGeneric && (
            <UpcomingProductForm
              initialName={editingUpcomingGeneric.name}
              initialDate={toInputDateLocal(editingUpcomingGeneric.expectedDate)}
              onSubmitAction={handleEditUpcomingGeneric}
              onCancelAction={closeAllModals}
              submitLabel="Update Generic Product"
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
