import { useState, useEffect } from 'react';
import { ShoppingBag, CalendarCheck, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    reservations: 0,
    messages: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, resRes, msgRes] = await Promise.all([
          fetch(`${API_URL}/api/orders`),
          fetch(`${API_URL}/api/reservations`),
          fetch(`${API_URL}/api/messages`),
        ]);

        const ordersData = await ordersRes.json();
        const resData = await resRes.json();
        const msgData = await msgRes.json();

        if (ordersData.success && resData.success && msgData.success) {
          const orders = ordersData.orders;
          setStats({
            orders: orders.length,
            reservations: resData.reservations.length,
            messages: msgData.messages.length,
            pendingOrders: orders.filter(o => o.status === 'pending').length,
          });
          setRecentOrders(orders.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { title: 'Total Orders', value: stats.orders, icon: <ShoppingBag size={24} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Reservations', value: stats.reservations, icon: <CalendarCheck size={24} />, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Messages', value: stats.messages, icon: <MessageSquare size={24} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Pending Orders', value: stats.pendingOrders, icon: <Clock size={24} />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gold">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading text-white tracking-widest">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-heading text-white tracking-widest">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-gold hover:text-gold-light transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">Order Ref</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No recent orders found.</td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/[0.02] transition-colors text-gray-300">
                    <td className="p-4 font-mono text-sm text-gray-400">#{order.orderReference}</td>
                    <td className="p-4">{order.customerName}</td>
                    <td className="p-4">{order.items?.length || 0} items</td>
                    <td className="p-4 text-gold">${order.totalAmount?.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                        order.status === 'confirmed' ? 'bg-blue-500/10 text-blue-500' :
                        order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
