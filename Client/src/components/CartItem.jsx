import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=...'; }}
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
        {item.customText && (
          <p className="text-xs text-gray-500 mt-1">✏️ "{item.customText}"</p>
        )}
        <p className="text-sm font-bold text-gray-500 mt-1">₹{item.price} each</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
        >–</button>
        <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
        >+</button>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
        <button
          onClick={() => removeFromCart(item.productId)}
          className="text-xs text-red-400 hover:text-red-600 transition"
        >Remove</button>
      </div>
    </div>
  );
}
