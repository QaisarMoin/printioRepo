import { Link } from 'react-router-dom';

const categoryData = {
  'Business Cards': {
    image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=600',
    description: 'Premium paper stocks and finishes.',
    price: '14.99'
  },
  'Brochures': {
    image: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=600',
    description: 'Versatile folding options for detailed info.',
    price: '35.00'
  },
  'Banners': {
    image: 'https://images.unsplash.com/photo-1560157368-98694c99dca3?auto=format&fit=crop&q=80&w=600',
    description: 'Durable indoor and outdoor displays.',
    price: '29.99'
  },
  'Flyers': {
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    description: 'High-impact marketing handouts.',
    price: '19.50'
  },
  'Posters': {
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600',
    description: 'Large format prints for maximum visibility.',
    price: '12.00'
  },
  'Stickers': {
    image: 'https://images.unsplash.com/photo-1572375927902-1c09e4d53066?auto=format&fit=crop&q=80&w=600',
    description: 'Custom shapes and weather-resistant materials.',
    price: '9.99'
  },
  'Notebooks': {
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600',
    description: 'Branded stationery for teams and clients.',
    price: '8.50'
  },
  'T-Shirts': {
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
    description: 'High-quality apparel screen printing.',
    price: '15.00'
  },
};

export default function CategoryCard({ category }) {
  const name = typeof category === 'string' ? category : category.name;
  const dbImage = typeof category === 'object' ? category.image : null;

  const data = categoryData[name] || {
    image: 'https://via.placeholder.com/600x400?text=' + name,
    description: 'Custom printing solutions for ' + name,
    price: '10.00'
  };

  const displayImage = dbImage || data.image;

  return (
    <Link
      to={`/category/${encodeURIComponent(name)}`}
      className="group flex flex-col items-center text-center gap-4 transition-all duration-300 transform hover:scale-105"
    >
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 group">
        {/* Outer concentric border */}
        <div className="absolute inset-0 rounded-full border-2 border-stitch-primary/10 group-hover:border-stitch-primary/20 transition-all duration-300 scale-110" />
        {/* Inner concentric border */}
        <div className="absolute inset-0 rounded-full border-2 border-stitch-primary group-hover:scale-105 transition-all duration-300" />
        
        {/* Image Container */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden bg-white shadow-inner">
          <img
            src={displayImage}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {name === 'Business Cards' && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg z-10 animate-bounce">
            Hot
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm sm:text-base font-bold text-stitch-neutral group-hover:text-stitch-primary transition-colors tracking-tight">
          {name}
        </h3>
        <p className="text-[10px] sm:text-[11px] font-black text-stitch-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Shop Now
        </p>
      </div>
    </Link>
  );
}
