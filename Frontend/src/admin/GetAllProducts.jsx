import { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';

const GetAllProducts = ({ onEditProduct, onDeleteProduct, onAddNew }) => {
  const { products, loading, error, fetchProducts } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Filter products by search and category
  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.id).includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <i className="bi bi-box-seam-fill text-orange-500"></i>
            Product Inventory
            <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full ml-2">
              {products.length} items
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Manage, update, and remove store items</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            title="Refresh product list"
            className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg border border-gray-200 transition text-sm flex items-center gap-1"
          >
            <i className={`bi bi-arrow-clockwise ${loading ? 'animate-spin' : ''}`}></i>
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={onAddNew}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow"
          >
            <i className="bi bi-plus-lg"></i>
            Add New Product
          </button>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <i className="bi bi-search absolute left-3 top-2.5 text-gray-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search by title, ID, keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-sm px-3 py-1.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm border-b border-red-100 flex items-center gap-2">
          <i className="bi bi-exclamation-triangle-fill text-red-500"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Table / List */}
      {loading && products.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <div className="spinner-border text-orange-500 mb-3" role="status"></div>
          <p className="text-sm">Loading products from backend...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <i className="bi bi-inbox text-4xl text-gray-300 mb-2 block"></i>
          <p className="text-base font-semibold text-gray-700">No products found</p>
          <p className="text-xs text-gray-400 mt-1">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try changing your search or filter'
              : 'Add your first anime product using the button above!'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b">
              <tr>
                <th className="py-3 px-4 w-12">ID</th>
                <th className="py-3 px-4 w-20">Image</th>
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition">
                  {/* ID */}
                  <td className="py-3 px-4 font-mono text-xs text-gray-400">#{product.id}</td>

                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-14 h-14 bg-white rounded-lg border p-1 flex items-center justify-center overflow-hidden shadow-xs">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/60?text=No+Img';
                        }}
                      />
                    </div>
                  </td>

                  {/* Title & Description preview */}
                  <td className="py-3 px-4 max-w-xs">
                    <h4 className="font-semibold text-gray-900 truncate" title={product.title}>
                      {product.title}
                    </h4>
                    <p className="text-xs text-gray-400 truncate mt-0.5" title={product.description}>
                      {product.description}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="bg-orange-50 text-orange-700 text-xs px-2.5 py-1 rounded-full font-medium border border-orange-200">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900 flex items-center gap-0.5">
                      <i className="bi bi-currency-rupee"></i>
                      {Math.round(product.price * 10)}
                    </div>
                    <span className="text-xs text-gray-400">${product.price}</span>
                  </td>

                  {/* Rating */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                      <i className="bi bi-star-fill text-amber-400 text-xs"></i>
                      <span>{product.rating?.rate || '4.5'}</span>
                      <span className="text-gray-400 text-[11px]">({product.rating?.count || 0})</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEditProduct(product)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition"
                        title="Edit product"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition"
                        title="Delete product"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllProducts;

