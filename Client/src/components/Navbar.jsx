import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { getCategories, searchAll } from '../api';
import { useAuth } from '../context/AuthContext';

const MEGA_MENU_DATA = {
  "Business Cards": {
    "sections": [
      { "title": "Premium Cards", "items": ["Matte Finish", "Glossy Finish", "Spot UV", "Velvet Touch"] },
      { "title": "Specialty", "items": ["Metallic Cards", "Transparent", "Square Cards", "Rounded Corners"] }
    ]
  },
  "Brochures": {
    "sections": [
      { "title": "Folds", "items": ["Bi-Fold", "Tri-Fold", "Z-Fold", "Gate Fold"] },
      { "title": "Sizes", "items": ["A4 Size", "A5 Size", "DL Size", "Custom"] }
    ]
  },
  "Banners": {
    "sections": [
      { "title": "Type", "items": ["Vinyl Banners", "Standees", "Roller Banners", "Mesh Banners"] },
      { "title": "Events", "items": ["Exhibitions", "Outdoor Promo", "Birthday Banners"] }
    ]
  },
  "Flyers": {
    "sections": [
      { "title": "Marketing", "items": ["Product Flyers", "Event Flyers", "Church Flyers", "Real Estate"] }
    ]
  },
  "Posters": {
    "sections": [
      { "title": "Wall Art", "items": ["Framed Posters", "Canvas Posters", "Architectural", "Glow-in-dark"] }
    ]
  },
  "Stickers": {
    "sections": [
      { "title": "Labels", "items": ["Product Labels", "Mailing Labels", "Bottle Labels", "Jar Labels"] }
    ]
  },
  "Notebooks": {
    "sections": [
      { "title": "Office", "items": ["Spiral Bound", "Hardbound", "Softcover", "Custom Diaries"] }
    ]
  },
  "T-Shirts": {
    "sections": [
      { "title": "Apparel", "items": ["Round Neck", "Polo Shirts", "Hoodies", "Cotton T-shirts"] }
    ]
  }
};

export default function Navbar() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ categories: [], products: [] });
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        try {
          const res = await searchAll(searchTerm);
          setSearchResults(res.data);
          setShowResults(true);
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults({ categories: [], products: [] });
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleResultClick = (type, item) => {
    setSearchTerm('');
    setShowResults(false);
    if (type === 'category') {
      navigate(`/category/${encodeURIComponent(item.name)}`);
    } else {
      navigate(`/product/${item._id}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.data.length > 0) {
          setCategories(res.data);
        } else {
          setCategories(Object.keys(MEGA_MENU_DATA).map(name => ({ name })));
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories(Object.keys(MEGA_MENU_DATA).map(name => ({ name })));
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white text-[10px] py-1.5 px-4 text-center font-bold tracking-widest uppercase">
        4 Hrs Express Delivery now in selected cities! Use code: PRINT4
      </div>

      {/* Main Nav */}
      <div className="border-b border-gray-100 shadow-sm relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">
              Print<span className="text-gray-400">Hub</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block group relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for Business Cards, Mugs, T-shirts..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.trim() && setShowResults(true)}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-gray-200 focus:bg-white rounded-2xl py-3 pl-12 pr-4 outline-none transition-all font-medium text-sm placeholder-gray-400 group-hover:bg-gray-100/50"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Global Search Results Dropdown */}
            {showResults && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowResults(false)} />
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-[70vh] overflow-y-auto p-4 custom-scrollbar">
                    {searchResults.categories.length === 0 && searchResults.products.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-sm font-bold text-gray-400">No results found for "{searchTerm}"</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {searchResults.categories.length > 0 && (
                          <div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-2">Categories</h3>
                            <div className="grid gap-1">
                              {searchResults.categories.map(cat => (
                                <button
                                  key={cat._id}
                                  onClick={() => handleResultClick('category', cat)}
                                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all group/res text-left"
                                >
                                  <div className="w-10 h-10 bg-stitch-bg rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-lg group-hover/res:bg-white transition-colors">
                                    {cat.image ? (
                                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                    ) : (
                                      "📁"
                                    )}
                                  </div>
                                  <span className="font-bold text-sm text-gray-900">{cat.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {searchResults.products.length > 0 && (
                          <div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-2">Products</h3>
                            <div className="grid gap-1">
                              {searchResults.products.map(prod => (
                                <button
                                  key={prod._id}
                                  onClick={() => handleResultClick('product', prod)}
                                  className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all group/res text-left"
                                >
                                  <div className="w-12 h-12 bg-stitch-bg rounded-lg overflow-hidden flex-shrink-0">
                                    {prod.image && <img src={prod.image} alt="" className="w-full h-full object-cover" />}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-bold text-sm text-gray-900 truncate">{prod.name}</p>
                                    <p className="text-[10px] font-bold text-stitch-primary uppercase tracking-widest mt-0.5">₹{prod.price}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Press Esc to close</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-6 flex-shrink-0">
           

            
            <div className="hidden md:flex items-center gap-4 border-x border-gray-100 px-6">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{user.role}</span>
                    <span className="text-[13px] font-bold text-gray-900 truncate max-w-[120px]">{user.name}</span>
                  </div>
                  <button 
                    onClick={() => { logout(); navigate('/'); }} 
                    className="p-2 hover:bg-red-50 rounded-xl group transition-all"
                    title="Logout"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login / Signup
                </button>
              )}
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="relative p-2.5 hover:bg-gray-50 rounded-2xl transition-all group"
            >
              <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Nav (Sub-navbar) */}
      <nav className="bg-white border-b border-gray-100 hidden md:block" onMouseLeave={() => setActiveMenu(null)}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between relative">
          <div className="flex">
            {categories.map((cat) => (
              <div 
                key={cat._id || cat.name}
                className="group px-6 py-4 relative cursor-pointer"
                onMouseEnter={() => setActiveMenu(cat.name)}
                onClick={() => navigate(`/category/${encodeURIComponent(cat.name)}`)}
              >
                <span className={`text-sm font-bold transition-colors ${activeMenu === cat.name ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                  {cat.name}
                </span>
                <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-gray-900 transform transition-transform duration-300 origin-left ${activeMenu === cat.name ? 'scale-x-100' : 'scale-x-0'}`} />
              </div>
            ))}
          </div>

          {/* Full-width Mega Menu Wrapper */}
          {activeMenu && MEGA_MENU_DATA[activeMenu] && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen bg-white shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200 z-50 overflow-hidden">
              <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-4 gap-12">
                {MEGA_MENU_DATA[activeMenu].sections.map((section, idx) => (
                  <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-300 delay-[100ms]">
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 border-b border-gray-50 pb-2">{section.title}</h3>
                    <ul className="space-y-4">
                      {section.items.map((item) => (
                        <li key={item}>
                          <a href="#" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors font-semibold flex items-center gap-2 group/item">
                            <span className="w-1 h-1 bg-gray-200 rounded-full group-hover/item:bg-gray-900 group-hover/item:scale-150 transition-all" />
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {/* Featured Promo */}
                <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between border border-gray-100 shadow-inner">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gray-900 text-[9px] font-black text-white rounded-full uppercase tracking-widest mb-4">Trending</span>
                    <h4 className="text-xl font-black text-gray-900 leading-tight">Elevate Your {activeMenu} Branding</h4>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Premium quality prints with express delivery.</p>
                  </div>
                  <button className="py-3 px-6 bg-white border-2 border-gray-900 text-gray-900 font-black text-xs rounded-2xl hover:bg-gray-900 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-sm">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <Link to="/admin" className="py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors flex items-center gap-2">
            Admin Panel
          </Link>
        </div>
      </nav>
      
      {/* Search Bar for Mobile */}
      <div className="md:hidden px-4 pb-4 border-b border-gray-100">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-12 pr-4 outline-none text-sm"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>
  );
}
