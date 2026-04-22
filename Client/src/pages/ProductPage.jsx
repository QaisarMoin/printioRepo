import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../api';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square bg-gray-200 rounded-2xl" />
          <div className="space-y-4 pt-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-1/4 mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stitch-neutral/30 mb-8">
        <Link to="/" className="hover:text-stitch-primary transition-colors">Home</Link>
        <span>›</span>
        <Link to={`/category/${encodeURIComponent(product.category)}`} className="hover:text-stitch-primary transition-colors">{product.category}</Link>
        <span>›</span>
        <span className="text-stitch-neutral line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-stitch aspect-square flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Available'; }}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6 py-2">
        
          <h1 className="text-4xl font-black text-stitch-neutral tracking-tight leading-none">{product.name}</h1>
          <p className="text-sm font-bold text-stitch-neutral/40 uppercase tracking-widest">{product.category}</p>
          <p className="text-stitch-neutral/60 text-base leading-relaxed max-w-md">{product.description}</p>
          
          <div className="flex flex-col bg-white p-8 rounded-2xl border border-gray-100 shadow-stitch mt-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black text-stitch-neutral">₹{product.price}</span>
              <span className="text-sm font-bold text-stitch-neutral/30 uppercase tracking-widest">per unit</span>
            </div>
            <p className="text-xs font-bold text-stitch-neutral/40 uppercase tracking-widest">Minimum order: <strong className="text-stitch-neutral">{product.minQuantity}</strong> units</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-5 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-[0.98] ${added ? 'bg-emerald-500 text-white' : 'bg-stitch-primary text-white hover:bg-[#0035bd] shadow-stitch-primary/20'}`}
            >
              {added ? '✓ Added to Cart' : '+ Add to Cart'}
            </button>
            <button className="flex-1 py-5 px-8 bg-stitch-bg text-stitch-neutral rounded-2xl font-black text-lg hover:bg-stitch-neutral hover:text-white transition-all border border-gray-100">
              Bulk Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
