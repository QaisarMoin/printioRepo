import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleProceed = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      navigate('/order');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Browse our products and add something to get started.</p>
        <Link to="/" className="btn-primary inline-block">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-600 transition"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {cart.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
          <span className="font-bold text-gray-800">₹{totalPrice}</span>
        </div>
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <span className="text-gray-600">Delivery</span>
          <span className="text-green-600 font-medium text-sm">Calculated at checkout</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-extrabold text-gray-500">₹{totalPrice}</span>
        </div>
        <button
          onClick={handleProceed}
          className="btn-primary w-full text-center text-base"
        >
          Proceed to Order →
        </button>
        <Link to="/" className="block mt-3 text-center text-sm text-gray-400 hover:text-gray-500 transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
