import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 relative">
      {/* Wishlist Button */}
      <button 
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 transition-colors"
      >
        <svg 
          className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link to={`/product/${product._id}`} className="block aspect-[4/5] overflow-hidden bg-white p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x500?text=Printing+Product';
          }}
        />
      </Link>

      <div className="p-4 pt-0 flex flex-col flex-1">
        <Link 
          to={`/product/${product._id}`} 
          className="text-[13px] font-semibold text-gray-800 hover:text-skyblue-primary mb-1 line-clamp-2 leading-tight"
        >
          {product.name}
        </Link>
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-auto">{product.category}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900">Rs.{product.price.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-sm"
            title="Add to Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
