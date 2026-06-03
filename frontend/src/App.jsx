import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import OrderModal from './components/OrderModal';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Chef from './pages/Chef';
import Menu1 from './pages/Menu1';
import Menu2 from './pages/Menu2';
import Menu3 from './pages/Menu3';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Services from './pages/Services';

// Admin Pages & Layouts
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminReservations from './pages/admin/Reservations';
import AdminMessages from './pages/admin/Messages';

// Public Layout Wrapper
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <CartSidebar />
    <OrderModal />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Admin Login - No layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Route>

      {/* Public Routes with Navbar/Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/menu-1" element={<Menu1 />} />
        <Route path="/menu-2" element={<Menu2 />} />
        <Route path="/menu-3" element={<Menu3 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/services" element={<Services />} />
      </Route>
    </Routes>
  );
}

export default App;
