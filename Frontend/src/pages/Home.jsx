import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Product from '../components/Product';
import { ProductContext } from '../context/ProductContext';

function Home() {
  const { products, loading, error, fetchProducts } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive unique categories dynamically from products
  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filter products by selected category
  const filteredProducts = products.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div>
      <Hero />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                <span>Explore Products</span>
                <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2.5 py-0.5 rounded-full">
                  {filteredProducts.length} items
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">Browse our anime merchandise collection</p>
            </div>

            {/* Category Filter Pills & Admin Shortcut */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}

              <Link
                to="/admin"
                className="ml-auto md:ml-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-900 text-white hover:bg-orange-600 transition flex items-center gap-1.5 shadow-sm"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-gear-fill"></i>
                Admin Panel
              </Link>
            </div>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="bi bi-exclamation-triangle-fill text-red-500 text-lg"></i>
                <span>{error}</span>
              </div>
              <button
                onClick={fetchProducts}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && products.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <div className="spinner-border text-orange-500 mb-3" role="status"></div>
              <p className="text-sm font-medium">Loading store products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty Store State */
            <div className="py-20 text-center text-gray-500 max-w-md mx-auto">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                <i className="bi bi-box-seam"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">No products available</h3>
              <p className="text-xs text-gray-400 mb-6">
                {selectedCategory !== 'All'
                  ? `No items found in "${selectedCategory}". Select another category or add new items in the admin panel.`
                  : 'Your database is currently empty. Use the Admin Panel to add anime merchandise or seed sample products!'}
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow transition"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-plus-circle"></i>
                Open Admin Panel
              </Link>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {filteredProducts.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;