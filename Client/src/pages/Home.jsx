import { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { getCategories, getProducts } from '../api';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import book from "../assets/book.jpeg";
import quality from "../assets/quality.png";
import deliverservice from "../assets/deliverservice.jpg";
import customedesign from "../assets/customedesign.jpg";
import blackcard from "../assets/blackcard.avif";
import bestprice from "../assets/bestprice.jpg";


export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('New Arrivals');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(res => setCategories(Array.isArray(res.data) ? res.data : (res.data?.data || [])))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

    // Fetch all products for the tabbed section
    setProductsLoading(true);
    getProducts()
      .then(res => setProducts(res.data?.data || (Array.isArray(res.data) ? res.data : [])))
      .catch(err => console.error(err))
      .finally(() => setProductsLoading(false));
  }, []);

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section - bbag.in style */}
      <section className="relative w-full overflow-hidden bg-stitch-primary">
        {/* Blueprint Pattern Background */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img 
            src="/hero_blueprint_pattern_1776851686298.png" 
            alt="Pattern" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Premium Stationery heaven</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
              Season of <br />
              <span className="text-white/40 italic font-serif">Premium Printing</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-bold text-white/70 uppercase tracking-widest">
              UPGRADE YOUR BRAND ESSENTIALS.
            </p>
            
            <div className="pt-4">
              <Link to="/categories" className="px-12 py-5 bg-white text-stitch-primary rounded-full font-black text-xs uppercase tracking-widest hover:bg-stitch-neutral hover:text-white transition-all shadow-2xl shadow-blue-900/40 transform hover:scale-105 inline-block">
                Explore
              </Link>
            </div>
          </div>

          {/* Floating Assets Mockup */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative w-full aspect-square flex items-center justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 animate-bounce duration-[3s]">
                <img src={book} className="w-full h-full object-contain rounded-3xl shadow-2xl -rotate-12 border-4 border-white" alt="Floating Note" />
              </div>
              <div className="absolute bottom-0 left-0 w-56 h-56 animate-bounce duration-[4s] delay-700">
                <img src={blackcard} className="w-full h-full object-contain rounded-3xl shadow-2xl rotate-12 border-4 border-white" alt="Floating Pen" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-none">
          <svg className="relative block w-full h-12 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.37,103.49,118.45,100.41,175,87.36c53.53-12.35,106.69-31.51,146.39-30.92Z"></path>
          </svg>
        </div>
      </section>

      {/* Categories Section - "I'm Looking For..." */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-stitch-neutral tracking-tight mb-16 italic font-serif">
            I'm Looking For...
          </h2>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-16">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col items-center gap-4">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gray-100" />
                  <div className="h-4 bg-gray-100 rounded w-24" />
                </div>
              ))
            ) : (
              categories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Tabbed Products Section */}
      <section className="bg-stitch-bg/30 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-4 mb-16">
            {['New Arrivals', 'Top Sellers', 'Our Picks'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase transition-all ${
                  activeTab === tab 
                    ? 'bg-stitch-primary text-white shadow-xl shadow-stitch-primary/30' 
                    : 'bg-white text-stitch-neutral hover:bg-gray-50 border border-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {productsLoading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-6 rounded-[2.5rem] space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-[2rem]" />
                  <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
                </div>
              ))
            ) : (
              (Array.isArray(products) ? products : []).slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          <div className="mt-20 text-center">
            <Link to="/categories" className="px-10 py-4 bg-stitch-neutral text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-stitch-primary shadow-xl inline-block">
              See More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services - ZigZag Showcase */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Feature 1: Fast Delivery */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 w-full animate-in slide-in-from-left duration-1000">
              <div className="relative group">
                <div className="absolute -inset-4 bg-stitch-primary/5 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:bg-stitch-primary/10" />
                <img 
                  src={deliverservice}
                  alt="Express Delivery" 
                  className="relative w-full rounded-[2rem] shadow-2xl shadow-stitch-primary/10 transition-all duration-700 group-hover:scale-[1.02] border border-gray-100"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <span className="text-stitch-primary font-black text-xs uppercase tracking-[0.3em]">Express Logistics</span>
              <h3 className="text-4xl sm:text-5xl font-black text-stitch-neutral leading-[1.1] tracking-tighter">Fast Delivery. <br/><span className="text-stitch-neutral/30">Next-Day Precision.</span></h3>
              <p className="text-lg text-stitch-neutral/50 font-medium leading-relaxed max-w-lg">
                Time is your most valuable asset. Our express 3–5 business day delivery network ensures your projects arrive exactly when you need them, without compromising on quality.
              </p>
              <div className="pt-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-stitch-bg rounded-xl text-stitch-neutral font-black text-[10px] uppercase tracking-widest border border-gray-100 shadow-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Live Tracking Enabled
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Custom Design (Reversed) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <div className="flex-1 w-full animate-in slide-in-from-right duration-1000">
              <div className="relative group">
                <div className="absolute -inset-4 bg-stitch-primary/5 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:bg-stitch-primary/10" />
                <img 
                  src={customedesign}
                  alt="Custom Design Studio" 
                  className="relative w-full rounded-[2rem] shadow-2xl shadow-stitch-primary/10 transition-all duration-700 group-hover:scale-[1.02] border border-gray-100"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <span className="text-stitch-primary font-black text-xs uppercase tracking-[0.3em]">Bespoke Creation</span>
              <h3 className="text-4xl sm:text-5xl font-black text-stitch-neutral leading-[1.1] tracking-tighter">Custom Design. <br/><span className="text-stitch-neutral/30">Your Vision, Perfected.</span></h3>
              <p className="text-lg text-stitch-neutral/50 font-medium leading-relaxed max-w-lg">
                Upload your own artwork or use our integrated design tools to create unique assets. Every detail is adjustable, from textures to typography.
              </p>
              <button className="text-xs font-black text-stitch-neutral uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                Try Drawing Board 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>

          {/* Feature 3: Quality Assured */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-stitch-primary/5 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:bg-stitch-primary/10" />
                <img 
                  src={quality} 
                  alt="Quality Inspection" 
                  className="relative w-full rounded-[2rem] shadow-2xl shadow-stitch-primary/10 transition-all duration-700 group-hover:scale-[1.02] border border-gray-100"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <span className="text-stitch-primary font-black text-xs uppercase tracking-[0.3em]">Absolute Reliability</span>
              <h3 className="text-4xl sm:text-5xl font-black text-stitch-neutral leading-[1.1] tracking-tighter">Quality Assured. <br/><span className="text-stitch-neutral/30">Premium End-to-End.</span></h3>
              <p className="text-lg text-stitch-neutral/50 font-medium leading-relaxed max-w-lg">
                We use industrially-sourced, sustainable materials and advanced lithography to ensure your brand's colors are reproduced with absolute fidelity.
              </p>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-stitch-neutral">100%</span>
                  <span className="text-[10px] font-bold text-stitch-neutral/30 uppercase tracking-widest">Satisfaction</span>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-stitch-neutral">ISO</span>
                  <span className="text-[10px] font-bold text-stitch-neutral/30 uppercase tracking-widest">Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Best Prices (Reversed) */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <div className="flex-1 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-stitch-primary/5 rounded-[2.5rem] blur-2xl transition-all duration-700 group-hover:bg-stitch-primary/10" />
                <img 
                  src={bestprice} 
                  alt="Premium Value" 
                  className="relative w-full rounded-[2rem] shadow-2xl shadow-stitch-primary/10 transition-all duration-700 group-hover:scale-[1.02] border border-gray-100"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <span className="text-stitch-primary font-black text-xs uppercase tracking-[0.3em]">Value Engineering</span>
              <h3 className="text-4xl sm:text-5xl font-black text-stitch-neutral leading-[1.1] tracking-tighter">Best Prices. <br/><span className="text-stitch-neutral/30">Bulk Printing Advantage.</span></h3>
              <p className="text-lg text-stitch-neutral/50 font-medium leading-relaxed max-w-lg">
                We bridge the gap between premium quality and industrial pricing. Enjoy significant bulk discounts suitable for large-scale operations and events.
              </p>
              <button className="btn-primary flex items-center gap-2 group">
                Check Bulk Rates
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
