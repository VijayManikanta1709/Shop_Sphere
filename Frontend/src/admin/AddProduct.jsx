import { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';

const AddProduct = ({ onProductAdded }) => {
  const { addProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'Clothing',
    image: '',
    rate: '4.5',
    count: '10',
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
    const result = await addProduct(payload);
    setSubmitting(false);

    if (result.success) {
      setFeedback({ type: 'success', message: 'Product added successfully!' });
      setFormData({
        title: '',
        price: '',
        description: '',
        category: 'Clothing',
        image: '',
        rate: '4.5',
        count: '10',
      });
      if (onProductAdded) {
        setTimeout(() => onProductAdded(result.data), 1200);
      }
    } else {
      setFeedback({ type: 'danger', message: 'Failed to add product: ' + (result.error || 'Server error') });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b">
        <i className="bi bi-plus-circle-fill text-2xl text-orange-500"></i>
        <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
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
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Naruto Uzumaki Sage Mode Figure"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            required
          />
        </div>

        {/* Price and Category */}
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
                placeholder="49.99"
                className="w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                required
              />
            </div>
            {formData.price && (
              <span className="text-xs text-gray-500 mt-1 block">
                Displays as ₹{Math.round(parseFloat(formData.price) * 10)} in store
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="Other">Other (Custom)</option>
              </select>
            </div>
            {formData.category === 'Other' && (
              <input
                type="text"
                placeholder="Enter custom category"
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full mt-2 px-3 py-2 border rounded-lg text-sm"
                required
              />
            )}
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
            placeholder="https://images.unsplash.com/photo-... or image link"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            required
          />
          {formData.image && (
            <div className="mt-2 p-2 bg-gray-50 border rounded-lg flex items-center gap-3">
              <span className="text-xs text-gray-500">Preview:</span>
              <img
                src={formData.image}
                alt="Preview"
                className="h-16 w-16 object-contain rounded border bg-white"
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
            placeholder="Detailed description of the anime product..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            required
          />
        </div>

        {/* Ratings: Rate & Count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Rating Rate (0 - 5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 flex justify-center items-center gap-2 shadow"
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                Adding Product...
              </>
            ) : (
              <>
                <i className="bi bi-cloud-arrow-up-fill"></i>
                Add Product to Store
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

