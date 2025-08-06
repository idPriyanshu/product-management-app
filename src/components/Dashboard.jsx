import { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import Alert from './Alert';
import ConfirmationModal from './ConfirmationModal';

const Dashboard = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, productId: null, productName: '' });

  // Generate a unique ID for new products
  const generateId = () => {
    return 'prod_' + Math.random().toString(36).substr(2, 9);
  };

  // Load products from localStorage on component mount
  useEffect(() => {
    // Initialize with expanded sample data (temporarily forcing refresh)
    const initialProducts = [
      { id: 'prod_1', name: 'Laptop', price: 999.99, category: 'Electronics', stock: 15, inStock: true, description: 'High-performance laptop for work and gaming' },
      { id: 'prod_2', name: 'T-Shirt', price: 24.99, category: 'Apparel', stock: 50, inStock: true, description: 'Comfortable cotton t-shirt' },
      { id: 'prod_3', name: 'Organic Apples', price: 4.99, category: 'Grocery', stock: 0, inStock: false, description: 'Fresh organic apples from local farms' },
      { id: 'prod_4', name: 'Wireless Headphones', price: 149.99, category: 'Electronics', stock: 25, inStock: true, description: 'Noise-cancelling wireless headphones with premium sound quality' },
      { id: 'prod_5', name: 'Denim Jeans', price: 79.99, category: 'Apparel', stock: 30, inStock: true, description: 'Classic blue denim jeans with comfortable fit' },
      { id: 'prod_6', name: 'Organic Bananas', price: 2.99, category: 'Grocery', stock: 100, inStock: true, description: 'Fresh organic bananas, perfect for smoothies' },
      { id: 'prod_7', name: 'Smartphone', price: 699.99, category: 'Electronics', stock: 8, inStock: true, description: 'Latest smartphone with advanced camera and fast processor' },
      { id: 'prod_8', name: 'Running Shoes', price: 129.99, category: 'Apparel', stock: 0, inStock: false, description: 'Lightweight running shoes for maximum comfort' },
      { id: 'prod_9', name: 'Whole Grain Bread', price: 3.49, category: 'Grocery', stock: 45, inStock: true, description: 'Freshly baked whole grain bread with seeds' },
      { id: 'prod_10', name: 'Tablet', price: 399.99, category: 'Electronics', stock: 12, inStock: true, description: '10-inch tablet perfect for work and entertainment' }
    ];
    
    // Check if we should load from localStorage or use fresh sample data
    const savedProducts = localStorage.getItem('products');
    const savedProductsData = savedProducts ? JSON.parse(savedProducts) : [];
    
    // Use saved data if it has more than 3 products (indicating user has added products)
    // Otherwise, use the new expanded sample data
    if (savedProductsData.length > 3 && savedProductsData.some(p => p.id > 3)) {
      setProducts(savedProductsData);
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: generateId()
    };
    setProducts([...products, newProduct]);
    setShowForm(false);
    setAlert({
      show: true,
      type: 'success',
      message: 'Product added successfully!'
    });
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setShowForm(false);
  };

  const deleteProduct = (id) => {
    const product = products.find(p => p.id === id);
    setConfirmModal({
      show: true,
      productId: id,
      productName: product ? product.name : 'Unknown Product'
    });
  };

  const confirmDelete = () => {
    if (confirmModal.productId) {
      setProducts(products.filter(p => p.id !== confirmModal.productId));
      setAlert({
        show: true,
        type: 'success',
        message: `Product "${confirmModal.productName}" has been deleted successfully.`
      });
      // Auto-hide alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
    }
    setConfirmModal({ show: false, productId: null, productName: '' });
  };

  const cancelDelete = () => {
    setConfirmModal({ show: false, productId: null, productName: '' });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                  <p className="text-gray-600">Manage your product inventory</p>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 cursor-pointer"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Action Bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
                  </div>
                  <p className="text-gray-600">Total products: <span className="font-semibold text-gray-900">{products.length}</span></p>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Product
                </button>
              </div>
            </div>
          </div>

          {/* Product Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-lg mx-auto my-8 shadow-xl">
                <ProductForm
                  product={editingProduct}
                  onSubmit={editingProduct ? updateProduct : addProduct}
                  onCancel={handleCancelForm}
                />
              </div>
            </div>
          )}

          {/* Product Table */}
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={deleteProduct}
          />

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={confirmModal.show}
            title="Delete Product"
            message={`Are you sure you want to delete "${confirmModal.productName}"? This action cannot be undone.`}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            confirmText="Delete"
            cancelText="Cancel"
            type="danger"
          />

          {/* Alert */}
          {alert.show && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert({ show: false, type: '', message: '' })}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
