import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api';
import { useCart } from '../context/CartContext';
import CanvasPreview from '../components/CanvasPreview';

export default function CustomizationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customText, setCustomText] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [quantity, setQuantity] = useState(1);
  const fileRef = useRef(null);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data.data))
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCustomImageUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity, customText, customImageUrl);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-8" />
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-10 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
            <div className="h-28 bg-gray-100 rounded-xl" />
          </div>
          <div className="aspect-[4/3] bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Customize Your Product</h1>
      <p className="text-gray-500 text-sm mb-8">{product.name}</p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          {/* Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Custom Text
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. John's Bakery, Your Slogan..."
              className="input-field"
              maxLength={60}
            />
            <p className="text-xs text-gray-400 mt-1">{customText.length}/60 characters</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Upload Your Image / Logo
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-brand-300 hover:bg-brand-50 transition-all"
            >
              {customImageUrl ? (
                <img src={customImageUrl} alt="uploaded" className="h-24 object-contain rounded-lg" />
              ) : (
                <>
                  <span className="text-3xl">📁</span>
                  <p className="text-sm text-gray-500">Click to upload PNG, JPG, SVG</p>
                  <p className="text-xs text-gray-400">Max 5 MB</p>
                </>
              )}
            </div>
            <input type="file" ref={fileRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
            {customImageUrl && (
              <button className="text-xs text-red-400 mt-1 hover:text-red-600" onClick={() => setCustomImageUrl('')}>
                Remove image
              </button>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(product.minQuantity || 1, quantity - 1))}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
              >–</button>
              <span className="text-lg font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
              >+</button>
              <span className="text-xs text-gray-400 ml-2">Min: {product.minQuantity}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total</span>
            <span className="text-2xl font-extrabold text-gray-500">₹{product.price * quantity}</span>
          </div>

          <button onClick={handleAddToCart} className="btn-primary w-full text-center">
            🛒 Add to Cart
          </button>
        </div>

        {/* Live Preview */}
        <div className="flex flex-col gap-4">
          <CanvasPreview
            productImage={product.image}
            customText={customText}
            customImageUrl={customImageUrl}
          />
          <p className="text-xs text-center text-gray-400">
            This is an approximate preview. Final print may vary slightly.
          </p>
        </div>
      </div>
    </div>
  );
}
