import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

export default function InvoicePage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/orders/${id}`)
      .then((res) => setOrder(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading Invoice...</div>;
  if (!order) return <div className="p-10 text-center">Order not found.</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white my-10 shadow-lg border border-gray-100 rounded-xl print:shadow-none print:border-none print:my-0">
      <div className="flex justify-between items-start border-b pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">PrintHub</h1>
          <p className="text-sm text-gray-500">Your partner in quality printing</p>
          <div className="mt-4 text-sm text-gray-600">
            <p>123 Business Park, Sector 62</p>
            <p>Noida, UP, 201301</p>
            <p>Email: support@printhub.com</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest mb-2">Invoice</h2>
          <p className="text-sm font-semibold">Order ID: <span className="text-gray-900">#{order._id.toUpperCase()}</span></p>
          <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Billed To</h3>
          <p className="font-bold text-gray-900">{order.userDetails.name}</p>
          <p className="text-sm text-gray-600">{order.userDetails.phone}</p>
          <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{order.userDetails.address}</p>
        </div>
        <div className="text-right">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Payment Status</h3>
          <p className="text-sm font-bold text-green-600 uppercase">Paid / Cash on Delivery</p>
        </div>
      </div>

      <table className="w-full mb-10 border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left text-xs uppercase text-gray-500 font-bold border-b">
            <th className="py-3 px-4">Item & Customization</th>
            <th className="py-3 px-4 text-center">Price</th>
            <th className="py-3 px-4 text-center">Qty</th>
            <th className="py-3 px-4 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, idx) => (
            <tr key={idx} className="border-b border-gray-50 text-sm">
              <td className="py-4 px-4">
                <p className="font-bold text-gray-800">{p.name}</p>
                {p.customText && (
                  <p className="text-xs text-gray-600 mt-1 italic font-medium">✏️ "{p.customText}"</p>
                )}
              </td>
              <td className="py-4 px-4 text-center text-gray-600">₹{p.price}</td>
              <td className="py-4 px-4 text-center text-gray-600">{p.quantity}</td>
              <td className="py-4 px-4 text-right font-bold text-gray-800">₹{p.price * p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-10">
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-semibold">₹{order.totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax (0%)</span>
            <span className="font-semibold">₹0</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-lg font-bold">Total Amount</span>
            <span className="text-2xl font-black text-gray-900">₹{order.totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-8 text-center">
        <p className="text-sm text-gray-500 mb-6">Thank you for choosing PrintHub. We appreciate your business!</p>
        <div className="flex justify-center gap-4 print:hidden">
          <button onClick={handlePrint} className="btn-primary py-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print Invoice
          </button>
          <Link to="/" className="btn-outline py-2 border-gray-300 text-gray-600 hover:bg-gray-50">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
