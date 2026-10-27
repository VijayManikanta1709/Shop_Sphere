import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username.trim() === 'admin' && password === 'admin@123') {
        sessionStorage.setItem('isAdminAuth', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid username or password. Please try again.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
        {/* Header / Logo */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Admin Portal</h2>
          <p className="text-xs text-gray-500 mt-1">Please sign in to manage products and store settings</p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
            <i className="bi bi-exclamation-octagon-fill text-red-500 text-sm"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm">
                <i className="bi bi-key-fill"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition duration-200 flex justify-center items-center gap-2 shadow-md hover:shadow-lg text-sm"
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                Verifying...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right text-base"></i>
                Sign In as Admin
              </>
            )}
          </button>
        </form>

        {/* Back to store link */}
        <div className="text-center pt-2 border-t border-gray-100">
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-orange-600 transition flex items-center justify-center gap-1.5 font-medium"
            style={{ textDecoration: 'none' }}
          >
            <i className="bi bi-arrow-left"></i>
            Return to Store Front
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

