import { useEffect, useState } from 'react';
import { 
  getOrders, 
  createProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct, 
  getCategories, 
  createCategory, 
  deleteCategory,
  updateCategory 
} from '../api';
import { Link, useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', or 'categories'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Data states
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // stores productId
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', image: '', customizable: true, description: '', minQuantity: 1
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [isEditingCategory, setIsEditingCategory] = useState(null); // stores categoryId

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes, categoriesRes] = await Promise.all([
        getOrders(),
        getProducts(),
        getCategories()
      ]);
      setOrders(ordersRes.data.data || ordersRes.data || []);
      setProducts(productsRes.data.data || productsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEditing) {
        await updateProduct(isEditing, formData);
        alert('Product updated!');
      } else {
        await createProduct(formData);
        alert('Product added!');
      }
      setFormData({ name: '', category: '', price: '', image: '', customizable: true, description: '', minQuantity: 1 });
      setShowForm(false);
      setIsEditing(null);
      fetchData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleProductDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      fetchData();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const startProductEdit = (p) => {
    setFormData(p);
    setIsEditing(p._id);
    setShowForm(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setSubmitting(true);
    try {
      if (isEditingCategory) {
        await updateCategory(isEditingCategory, { name: newCategoryName, image: newCategoryImage });
        alert('Category updated!');
      } else {
        await createCategory({ name: newCategoryName, image: newCategoryImage });
        alert('Category created!');
      }
      setNewCategoryName('');
      setNewCategoryImage('');
      setIsEditingCategory(null);
      fetchData();
    } catch (err) {
      alert('Failed to save category');
    } finally {
      setSubmitting(false);
    }
  };

  const startCategoryEdit = (cat) => {
    setNewCategoryName(cat.name);
    setNewCategoryImage(cat.image || '');
    setIsEditingCategory(cat._id);
  };

  const cancelCategoryEdit = () => {
    setNewCategoryName('');
    setNewCategoryImage('');
    setIsEditingCategory(null);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete category? products in this category will remain.')) return;
    try {
      await deleteCategory(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Full control over your printing platform</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 border-b border-gray-100 flex-1 md:flex-none justify-center">
          {['orders', 'products', 'categories'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setShowForm(false); }}
              className={`pb-4 px-2 font-black text-xs uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 items-center justify-end">
          {activeTab === 'products' && (
            <button
              onClick={() => { setShowForm(!showForm); setIsEditing(null); setFormData({ name: '', category: '', price: '', image: '', customizable: true, description: '', minQuantity: 1 }); }}
              className="py-3 px-6 bg-gray-900 text-white rounded-2xl font-black text-xs hover:bg-black transition-all shadow-lg active:scale-95"
            >
              {showForm ? '✕ Close Form' : '+ New Product'}
            </button>
          )}
          <button
            onClick={fetchData}
            className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm"
            title="Refresh Data"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handleLogout}
            className="py-3 px-6 bg-red-50 text-red-600 rounded-2xl font-black text-xs hover:bg-red-100 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Workspace...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-6 rounded-3xl border border-red-100 text-center font-bold mb-10">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-10">
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
                  <p className="text-4xl font-black text-gray-900">{orders.length}</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Revenue</p>
                  <p className="text-4xl font-black text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Details</th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer</th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total</th>
                        <th className="text-right py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-6 px-8">
                            <div className="font-bold text-gray-900 mb-1">#{order._id?.slice(-6).toUpperCase()}</div>
                            <div className="text-[11px] font-medium text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                          </td>
                          <td className="py-6 px-8">
                            <div className="font-bold text-gray-900">{order.userDetails.name}</div>
                            <div className="text-[11px] font-medium text-gray-400">{order.userDetails.phone}</div>
                          </td>
                          <td className="py-6 px-8">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${STATUS_COLORS[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-6 px-8">
                            <div className="font-black text-gray-900">₹{order.totalPrice}</div>
                          </td>
                          <td className="py-6 px-8 text-right">
                            <Link 
                              to={`/invoice/${order._id}`}
                              className="px-5 py-2.5 bg-gray-50 text-gray-900 rounded-xl text-xs font-black border border-gray-100 hover:bg-gray-900 hover:text-white transition-all transform hover:-translate-y-0.5 inline-block"
                            >
                              Invoice
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              {showForm && (
                <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-100 border border-gray-100">
                  <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                  <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Product Name</label>
                      <input 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        required 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold placeholder-gray-300" 
                        placeholder="e.g. Premium Business Cards"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Category</label>
                      <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})} 
                        required 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold"
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Price (₹)</label>
                      <input 
                        type="number" 
                        value={formData.price} 
                        onChange={e => setFormData({...formData, price: e.target.value})} 
                        required 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold" 
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Image URL</label>
                      <div className="flex gap-4">
                        <input 
                          value={formData.image} 
                          onChange={e => setFormData({...formData, image: e.target.value})} 
                          required 
                          className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold text-sm" 
                        />
                        {formData.image && (
                          <div className="w-16 h-16 rounded-2xl border border-gray-100 overflow-hidden bg-gray-50">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=Error'} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Min Quantity</label>
                      <input 
                        type="number" 
                        value={formData.minQuantity} 
                        onChange={e => setFormData({...formData, minQuantity: e.target.value})} 
                        required 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold" 
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <button disabled={submitting} type="submit" className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-[0.98]">
                        {submitting ? 'Updating Platform...' : (isEditing ? 'Update Product Details' : 'Deploy Product to Store')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product</th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                        <th className="text-left py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</th>
                        <th className="text-right py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="py-6 px-8 flex items-center gap-4">
                            <img src={p.image} className="w-14 h-14 rounded-2xl object-cover bg-gray-100 shadow-sm" onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=No+Img'} />
                            <div className="font-bold text-gray-900">{p.name}</div>
                          </td>
                          <td className="py-6 px-8">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-wider">{p.category}</span>
                          </td>
                          <td className="py-6 px-8 font-black text-gray-900 text-lg">₹{p.price}</td>
                          <td className="py-6 px-8 text-right">
                            <div className="flex gap-4 justify-end">
                              <button onClick={() => startProductEdit(p)} className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button onClick={() => handleProductDelete(p._id)} className="p-3 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-100 border border-gray-100 sticky top-24">
                    <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">{isEditingCategory ? 'Edit Category' : 'Add Category'}</h2>
                    <form onSubmit={handleCategorySubmit} className="space-y-8">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Category Name</label>
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold placeholder-gray-300"
                          placeholder="e.g. Stickers"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Image URL</label>
                        <input
                          type="text"
                          value={newCategoryImage}
                          onChange={(e) => setNewCategoryImage(e.target.value)}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-gray-100 outline-none transition-all font-bold placeholder-gray-300"
                          placeholder="e.g. https://images.unsplash.com/..."
                        />
                      </div>
                      <div className="flex gap-4">
                        <button type="submit" disabled={submitting} className="flex-1 py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-[0.98]">
                          {isEditingCategory ? 'Update Category' : 'Create Category'}
                        </button>
                        {isEditingCategory && (
                          <button 
                            type="button" 
                            onClick={cancelCategoryEdit}
                            className="px-8 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Categories</h2>
                      <span className="px-4 py-1.5 bg-white text-gray-500 text-[10px] font-black uppercase rounded-full border border-gray-100">{categories.length} Total</span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {categories.map((cat) => (
                        <div key={cat._id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-gray-100 rounded-[1.5rem] flex items-center justify-center font-black text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all text-2xl shadow-inner uppercase">
                              {cat.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-black text-gray-900 text-xl tracking-tight">{cat.name}</h3>
                              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Status: Active & Live</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={() => startCategoryEdit(cat)}
                              className="p-4 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat._id)}
                              className="p-4 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
