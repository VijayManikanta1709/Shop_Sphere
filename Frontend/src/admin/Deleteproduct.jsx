import { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';

const Deleteproduct = ({ product, onClose, onDeleted }) => {
  const { deleteProduct } = useContext(ProductContext);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setError('');
    setDeleting(true);
    const result = await deleteProduct(product.id);
    setDeleting(false);

    if (result.success) {
      if (onDeleted) {
        onDeleted(product.id);
      }
    } else {
      setError(result.error || 'Failed to delete product from server.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
          <i className="bi bi-x-lg text-lg"></i>
        </button>

        <div className="text-center pt-2">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
            <i className="bi bi-trash3-fill"></i>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Product</h3>
          <p className="text-sm text-gray-500 mb-4">
            Are you sure you want to permanently delete this product?
          </p>

          {error && (
            <div className="alert alert-danger py-2 px-3 text-xs mb-3" role="alert">
              {error}
            </div>
          )}

          {/* Product Preview Card */}
          <div className="bg-gray-50 rounded-xl p-3 mb-5 border flex items-center gap-3 text-left">
            <img
              src={product.image}
              alt={product.title}
              className="w-14 h-14 object-contain rounded bg-white border p-1"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/60?text=No+Img';
              }}
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-orange-600 font-semibold uppercase">{product.category}</span>
              <h4 className="text-sm font-semibold text-gray-800 truncate">{product.title}</h4>
              <p className="text-xs text-gray-500">₹{Math.round(product.price * 10)} (ID: #{product.id})</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow"
            >
              {deleting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="bi bi-trash3"></i>
                  Yes, Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deleteproduct;

