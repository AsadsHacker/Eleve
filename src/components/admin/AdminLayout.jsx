import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, CalendarCheck, MessageSquare, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('eleve_admin_auth');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Reservations', path: '/admin/reservations', icon: <CalendarCheck size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-gray-200 font-body overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-heading text-2xl text-gold text-center tracking-widest">ÉLEVÉ</h2>
          <p className="text-xs text-center text-gray-500 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gold/20 text-gold border border-gold/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-[#1a1a1a] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
          <div className="font-heading text-lg tracking-widest text-gold md:hidden">ÉLEVÉ</div>
          <div className="hidden md:block text-gray-400">
            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm text-gray-400">Logged in as <span className="text-white">eleve_admin</span></span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0f0f0f] p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
