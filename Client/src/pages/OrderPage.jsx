import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function OrderPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: { pathname: '/order' } } });
    }
    if (user?.name) {
      setForm(prev => ({ ...prev, name: user.name }));
    }
  }, [user, authLoading, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit phone number';
    if (!form.address.trim()) errs.address = 'Address is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (cart.length === 0) { setApiError('Your cart is empty.'); return; }

    setSubmitting(true);
    setApiError('');

    const orderPayload = {
      products: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        customText: item.customText || '',
        customImage: item.customImage || '',
      })),
      userDetails: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      },
      totalPrice,
    };

    try {
      const res = await createOrder(orderPayload);
      setOrderId(res.data.data._id);
      clearCart();
      setSuccess(true);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (cart.length === 0 && !success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link to="/" className="btn-primary inline-block">Go to Shop</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-8">Thank you, <strong>{form.name || 'there'}</strong>! Your order has been received and is being processed.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={`/invoice/${orderId}`} className="btn-primary flex items-center gap-2">
            📄 View Invoice
          </Link>
          <Link to="/" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Order</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-gray-800">Delivery Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength={10}
              className={`input-field ${errors.phone ? 'border-red-400 focus:ring-red-300' : ''}`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House No., Street, City, State, PIN"
              rows={4}
              className={`input-field resize-none ${errors.address ? 'border-red-400 focus:ring-red-300' : ''}`}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Placing Order...' : '✅ Place Order'}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3 mb-4">
            {cart.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=...'; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-2xl font-extrabold text-gray-500">₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
