import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import AddProduct from './AddProduct';
import AdminLogin from './AdminLogin';
import Deleteproduct from './Deleteproduct';
import GetAllProducts from './GetAllProducts';
import Updateproduct from './Updateproduct';

const sampleAnimeProducts = [
  {
    title: 'Naruto Uzumaki Sage Mode Master Stars Piece',
    price: 49.99,
    description: 'High-detail 24cm PVC figure of Naruto Uzumaki displaying Sage Mode orange pigment and iconic scroll.',
    category: 'Figures',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500',
    rating: { rate: 4.9, count: 180 },
  },
  {
    title: 'Attack on Titan Survey Corps Wings of Freedom Hoodie',
    price: 39.99,
    description: 'Premium heavyweight cotton hoodie in military green featuring the embroidered Scout Regiment emblem.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    rating: { rate: 4.7, count: 125 },
  },
  {
    title: 'Demon Slayer Tanjiro Kamado Nichirin Katana Replica',
    price: 79.99,
    description: 'Carbon steel cosplay replica of Tanjiro Kamado black blade with tsuba wheel hilt and wooden scabbard.',
    category: 'Cosplay',
    image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500',
    rating: { rate: 4.8, count: 95 },
  },
  {
    title: 'One Piece Straw Hat Pirates Embroidered Crewneck',
    price: 34.99,
    description: 'Cozy fleece sweatshirt with minimalist Jolly Roger chest patch and Japanese kanji down the sleeve.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500',
    rating: { rate: 4.6, count: 88 },
  },
  {
    title: 'Jujutsu Kaisen Satoru Gojo Domain Expansion Figurine',
    price: 54.99,
    description: 'Dynamic collectible statue featuring Gojo unmasking his Six Eyes with transparent Infinite Void effects.',
    category: 'Figures',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500',
    rating: { rate: 5.0, count: 210 },
  },
];

const AdminHome = () => {
  const { products, addProduct, fetchProducts } = useContext(ProductContext);

  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('isAdminAuth') === 'true');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'add'
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSeedProducts = async () => {
    setSeeding(true);
    let addedCount = 0;
    for (const sample of sampleAnimeProducts) {
      const res = await addProduct(sample);
      if (res.success) addedCount++;
    }
    setSeeding(false);
    fetchProducts();
    showToast(`Added ${addedCount} sample anime products to the store!`);
  };

  const categoriesCount = new Set(products.map((p) => p.category).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center text-white text-2xl shadow-md">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Manage products, pricing, categories, and inventory</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {products.length === 0 && (
              <button
                onClick={handleSeedProducts}
                disabled={seeding}
                className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm"
              >
                {seeding ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    Seeding...
                  </>
                ) : (
                  <>
                    <i className="bi bi-magic"></i>
                    Seed Sample Anime Products
                  </>
                )}
              </button>
            )}

            <Link
              to="/"
              className="bg-gray-800 hover:bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-sm ml-auto md:ml-0"
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-shop"></i>
              Back to Store
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 border border-red-200"
              title="Logout from Admin Panel"
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl">
              <i className="bi bi-box-seam"></i>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
              <i className="bi bi-tags"></i>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</p>
              <h3 className="text-2xl font-bold text-gray-900">{categoriesCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
              <i className="bi bi-hdd-network"></i>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Backend API</p>
              <h3 className="text-sm font-semibold text-green-700 truncate">localhost:1206</h3>
            </div>
          </div>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm shadow-md flex items-center justify-between">
            <span className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill"></i>
              {toastMessage}
            </span>
            <button onClick={() => setToastMessage('')} className="text-white hover:text-green-200">
              <i className="bi bi-x-lg text-xs"></i>
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition ${
              activeTab === 'all'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="bi bi-grid-fill"></i>
            All Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 px-4 font-semibold text-sm flex items-center gap-2 border-b-2 transition ${
              activeTab === 'add'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="bi bi-plus-circle-fill"></i>
            Add New Product
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'all' && (
            <GetAllProducts
              onEditProduct={(p) => setEditingProduct(p)}
              onDeleteProduct={(p) => setDeletingProduct(p)}
              onAddNew={() => setActiveTab('add')}
            />
          )}

          {activeTab === 'add' && (
            <AddProduct
              onProductAdded={() => {
                showToast('Product added successfully!');
                setActiveTab('all');
              }}
            />
          )}
        </div>

        {/* Update Product Modal */}
        {editingProduct && (
          <Updateproduct
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onUpdated={() => {
              setEditingProduct(null);
              showToast('Product updated successfully!');
            }}
          />
        )}

        {/* Delete Product Modal */}
        {deletingProduct && (
          <Deleteproduct
            product={deletingProduct}
            onClose={() => setDeletingProduct(null)}
            onDeleted={() => {
              setDeletingProduct(null);
              showToast('Product deleted successfully!');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminHome;