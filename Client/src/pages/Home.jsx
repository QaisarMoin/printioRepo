import { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';
import { getCategories } from '../api';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden bg-stitch-neutral aspect-[21/9] flex items-center shadow-2xl shadow-stitch-primary/10">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src="/hero-bg.png" 
                alt="Modern Printing Press" 
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stitch-neutral via-stitch-neutral/80 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 px-8 sm:px-16 md:px-24 flex flex-col items-start max-w-4xl">
              <span className="inline-flex items-center bg-stitch-primary/20 backdrop-blur-md text-white border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
                Professional Quality
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Precision Printing for<br />
                <span className="text-white/60">Modern Business.</span>
              </h1>
              <p className="text-lg text-white/50 max-w-xl mb-10 font-medium leading-relaxed">
                Elevate your brand with premium materials, flawless execution, and fast delivery. Built for professionals who demand excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/category/Business%20Cards" className="btn-primary flex items-center gap-2 group">
                  Shop All Products
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <button className="px-8 py-3.5 bg-white text-stitch-neutral rounded-xl font-black text-sm hover:bg-stitch-bg transition-all shadow-xl shadow-white/5 border border-white/10">
                  Get a Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-stitch-neutral tracking-tight mb-2">Explore Categories</h2>
            <p className="text-stitch-neutral/40 font-medium">Everything you need to make a lasting impression.</p>
          </div>
          <Link to="/categories" className="inline-flex items-center gap-2 text-stitch-primary font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
            View All Categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="card animate-pulse border-none shadow-none bg-white">
                <div className="aspect-[4/3] bg-stitch-bg rounded-2xl" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-stitch-bg rounded w-3/4" />
                  <div className="h-3 bg-stitch-bg rounded w-1/2" />
                  <div className="h-4 bg-stitch-bg rounded w-1/4 mt-4" />
                </div>
              </div>
            ))
          ) : (
            categories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))
          )}
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
                  src="/fast_delivery_premium_1776843662428.png" 
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
                  src="/custom_design_premium_1776843679494.png" 
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
                  src="/quality_assured_premium_1776843694910.png" 
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
                  src="/best_prices_premium_1776843712726.png" 
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
