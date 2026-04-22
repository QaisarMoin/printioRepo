import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, getCategories } from '../api';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const brands = ['Camlin', 'Casio', 'Classmate', 'Jovi', 'Khyati', 'Faber Castell'];
  const priceRanges = [
    { label: '₹0 to ₹99', min: 0, max: 99 },
    { label: '₹99 to ₹299', min: 99, max: 299 },
    { label: '₹299 to ₹699', min: 299, max: 699 },
    { label: '₹699 to ₹999', min: 699, max: 999 },
  ];

  useEffect(() => {
    setLoading(true);
    setError('');
    
    Promise.all([
      getProducts(decodeURIComponent(name)),
      getCategories()
    ]).then(([prodRes, catRes]) => {
      setProducts(prodRes.data?.data || prodRes.data || []);
      setCategories(catRes.data || []);
    }).catch(() => setError('Failed to load products. Is the backend running?'))
    .finally(() => setLoading(false));
  }, [name]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand || 'Generic'));
    }

    if (selectedPriceRanges.length > 0) {
      result = result.filter(p => {
        return selectedPriceRanges.some(range => {
          const { min, max } = priceRanges.find(r => r.label === range);
          return p.price >= min && p.price <= max;
        });
      });
    }

    return result;
  }, [products, selectedBrands, selectedPriceRanges]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const togglePriceRange = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
          <div>
            <h2 className="text-xl font-black text-gray-900 border-b-2 border-gray-900 pb-2 mb-8">Filters</h2>
            
            {/* Shop By Brand */}
            <div className="space-y-6">
              <div className="flex items-center justify-between group cursor-pointer">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-skyblue-primary">Shop By Brand</h3>
                <svg className="w-4 h-4 text-skyblue-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="space-y-3 pl-1">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="peer h-5 w-5 border-2 border-gray-200 rounded-md checked:bg-skyblue-primary checked:border-skyblue-primary transition-all appearance-none cursor-pointer" 
                      />
                      <svg className="absolute w-3.5 h-3.5 text-white left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{brand}</span>
                    <span className="ml-auto text-[10px] font-black text-gray-300">({Math.floor(Math.random() * 10) + 1})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100 my-10" />

            {/* Shop By Price */}
            <div className="space-y-6">
              <div className="flex items-center justify-between group cursor-pointer">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-skyblue-primary">Shop By Price</h3>
                <svg className="w-4 h-4 text-skyblue-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="space-y-3 pl-1">
                {priceRanges.map(range => (
                  <label key={range.label} className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedPriceRanges.includes(range.label)}
                        onChange={() => togglePriceRange(range.label)}
                        className="peer h-5 w-5 border-2 border-gray-200 rounded-md checked:bg-skyblue-primary checked:border-skyblue-primary transition-all appearance-none cursor-pointer" 
                      />
                      <svg className="absolute w-3.5 h-3.5 text-white left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">{range.label}</span>
                    <span className="ml-auto text-[10px] font-black text-gray-300">({Math.floor(Math.random() * 20) + 1})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100 my-10" />

            {/* Shop By Category */}
            <div className="space-y-6">
              <div className="flex items-center justify-between group cursor-pointer">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-skyblue-primary">Shop By Category</h3>
                <svg className="w-4 h-4 text-skyblue-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="space-y-3 pl-1">
                {categories.map(cat => (
                  <Link key={cat._id} to={`/category/${cat.name}`} className="flex items-center gap-3 group cursor-pointer">
                    <div className="h-5 w-5 border-2 border-gray-200 rounded-md group-hover:border-skyblue-primary transition-all" />
                    <span className={`text-sm font-semibold transition-colors ${decodeURIComponent(name) === cat.name ? 'text-skyblue-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          {/* Breadcrumbs & Title */}
          <div className="mb-10">
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
              <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <span>›</span>
              <span className="text-gray-900">{decodeURIComponent(name)}</span>
            </nav>
            <div className="flex items-baseline gap-4">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">{decodeURIComponent(name)}</h1>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">({filteredProducts.length} Premium items)</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-gray-50 rounded-lg p-4 space-y-4">
                  <div className="aspect-[4/5] bg-gray-50 rounded" />
                  <div className="h-4 bg-gray-50 rounded w-3/4" />
                  <div className="h-10 bg-gray-50 rounded w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-20 text-center bg-red-50 rounded-2xl border border-red-100">
              <p className="text-red-500 font-bold">{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-32 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No products match your criteria</p>
              <button 
                onClick={() => { setSelectedBrands([]); setSelectedPriceRanges([]); }}
                className="mt-4 text-skyblue-primary font-bold text-sm underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
