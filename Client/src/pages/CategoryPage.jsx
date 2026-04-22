import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getProducts(decodeURIComponent(name))
      .then((res) => setProducts(res.data.data || res.data || []))
      .catch(() => setError('Failed to load products. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-900">{decodeURIComponent(name)}</span>
          </nav>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{decodeURIComponent(name)}</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{products.length} Premium Products</p>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse border-none shadow-none bg-white">
              <div className="aspect-[4/3] bg-stitch-bg rounded-2xl" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-stitch-bg rounded w-3/4" />
                <div className="h-3 bg-stitch-bg rounded w-1/2" />
                <div className="h-10 bg-stitch-bg rounded-xl w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-sm text-red-400 mt-1">Make sure the backend server is running on port 5000.</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-32 bg-white rounded-2xl shadow-stitch border border-gray-100">
          <div className="w-20 h-20 bg-stitch-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-stitch-neutral/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12h-8m0 0V4m0 8l-8 8" /></svg>
          </div>
          <p className="text-stitch-neutral font-black text-2xl tracking-tight mb-2">No products found</p>
          <p className="text-stitch-neutral/40 font-black uppercase tracking-widest text-[10px]">Check back later for {decodeURIComponent(name)} updates</p>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
