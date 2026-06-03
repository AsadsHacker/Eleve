import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.filter(o => o._id !== id));
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) return <div className="text-gold">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading text-white tracking-widest">Manage Orders</h1>

      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">Order Ref</th>
                <th className="p-4 font-medium">Customer Details</th>
                <th className="p-4 font-medium">Order Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/[0.02] transition-colors text-gray-300">
                    <td className="p-4 font-mono text-sm text-gray-400">
                      <div>#{order.orderReference}</div>
                      <div className="text-xs text-gray-600 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                      <div className="text-sm text-gray-500">{order.address}, {order.city}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm space-y-1">
                        {order.items?.map((item, idx) => (
                          <div key={idx}>
                            <span className="text-gold">{item.quantity}x</span> {item.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-gold font-medium">${order.totalAmount?.toFixed(2)}</td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className={`bg-[#121212] border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer focus:border-gold/50 ${
                          order.status === 'pending' ? 'text-yellow-500' :
                          order.status === 'confirmed' ? 'text-blue-500' :
                          order.status === 'delivered' ? 'text-green-500' :
                          'text-red-500'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => deleteOrder(order._id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Order"
                      >
                        <Trash2 size={18} />
                      </button>
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
