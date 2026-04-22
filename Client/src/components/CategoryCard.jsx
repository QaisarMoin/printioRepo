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
      className="card group flex flex-col bg-white hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {name === 'Business Cards' && (
          <span className="absolute top-3 left-3 bg-stitch-neutral/80 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
            Best Seller
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-black text-stitch-neutral mb-1 tracking-tight group-hover:text-stitch-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-stitch-neutral/40 font-medium leading-snug mb-4 line-clamp-2">
          {data.description}
        </p>
        <div className="mt-auto flex items-center justify-between group/link">
          <p className="text-[11px] font-black text-stitch-primary uppercase tracking-widest">
            From ₹{data.price}
          </p>
          <svg className="w-5 h-5 text-stitch-neutral/20 group-hover/link:translate-x-1 group-hover/link:text-stitch-primary transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
