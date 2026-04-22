import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="card group flex flex-col transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden aspect-[4/3] bg-stitch-bg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
            }}
          />
          {product.customizable && (
            <span className="absolute top-3 right-3 bg-stitch-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-stitch-primary/20">
              Customizable
            </span>
          )}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1 gap-2">
        <Link to={`/product/${product._id}`} className="font-bold text-stitch-neutral hover:text-stitch-primary transition-colors line-clamp-2 leading-tight">
          {product.name}
        </Link>
        <p className="text-[10px] text-stitch-neutral/40 font-black uppercase tracking-widest">{product.category}</p>
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-stitch-neutral/30 uppercase tracking-tighter">Starting at</span>
            <span className="text-xl font-black text-stitch-neutral leading-none">₹{product.price}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddToCart} className="p-2.5 bg-stitch-bg text-stitch-neutral rounded-xl hover:bg-stitch-primary hover:text-white transition-all border border-gray-100" title="Add to Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.2 5M9 21h6M9 21a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
            <Link to={`/product/${product._id}`} className="px-5 py-2.5 bg-stitch-neutral text-white rounded-xl text-xs font-black hover:bg-stitch-primary transition-all shadow-lg shadow-stitch-neutral/10">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
