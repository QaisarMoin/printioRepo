import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CustomizationPage from './pages/CustomizationPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import AdminDashboard from './pages/AdminDashboard';
import InvoicePage from './pages/InvoicePage';
import LoginPage from './pages/LoginPage';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
    </div>
  );

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:name" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/customize/:id" element={<CustomizationPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/invoice/:id" element={<InvoicePage />} />
            </Routes>
          </main>
          <footer className="border-t border-gray-100 bg-white py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} PrintHub — Your one-stop printing partner
            </div>
          </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
