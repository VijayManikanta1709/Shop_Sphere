import { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';

const Updateproduct = ({ product, onClose, onUpdated }) => {
  const { updateProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || '',
    description: product?.description || '',
    category: product?.category || 'Clothing',
    image: product?.image || '',
    rate: product?.rating?.rate || '4.5',
    count: product?.rating?.count || '10',
  });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const categories = ['Clothing', 'Figures', 'Cosplay', 'Accessories', 'Manga', 'Collectibles'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!formData.title.trim() || !formData.price || !formData.description.trim() || !formData.image.trim()) {
      setFeedback({ type: 'danger', message: 'Please fill in all required fields.' });
      return;
    }

    const payload = {
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      description: formData.description.trim(),
      category: formData.category.trim(),
      image: formData.image.trim(),
      rating: {
        rate: parseFloat(formData.rate) || 4.5,
        count: parseInt(formData.count, 10) || 10,
      },
    };

    setSubmitting(true);
    const result = await updateProduct(product.id, payload);
    setSubmitting(false);

    if (result.success) {
      setFeedback({ type: 'success', message: 'Product updated successfully!' });
      if (onUpdated) {
        setTimeout(() => onUpdated(result.data), 1000);
      }
    } else {
      setFeedback({ type: 'danger', message: 'Failed to update product: ' + (result.error || 'Server error') });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 relative border border-gray-100 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
          <i className="bi bi-x-lg text-lg"></i>
        </button>

        <div className="flex items-center gap-2 mb-4 pb-3 border-b">
          <i className="bi bi-pencil-square text-2xl text-blue-600"></i>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Update Product #{product?.id}</h2>
            <p className="text-xs text-gray-500">Edit details and save changes</p>
          </div>
        </div>

        {feedback.message && (
          <div className={`alert alert-${feedback.type} py-2 px-4 mb-4 text-sm`} role="alert">
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price (USD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
              {formData.price && (
                <span className="text-xs text-gray-500 mt-1 block">
                  Displays as ₹{Math.round(parseFloat(formData.price) * 10)}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                {!categories.includes(formData.category) && (
                  <option value={formData.category}>{formData.category}</option>
                )}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
            {formData.image && (
              <div className="mt-2 p-2 bg-gray-50 border rounded-lg flex items-center gap-3">
                <span className="text-xs text-gray-500">Preview:</span>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-14 w-14 object-contain rounded border bg-white"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>

          {/* Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Rating Rate</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Review Count</label>
              <input
                type="number"
                min="0"
                name="count"
                value={formData.count}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow"
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check2-circle"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateproduct;

