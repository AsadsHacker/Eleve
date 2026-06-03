import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reservations`);
      const data = await res.json();
      if (data.success) setReservations(data.reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setReservations(reservations.map(r => r._id === id ? { ...r, status: newStatus } : r));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reservation?')) return;
    try {
      const res = await fetch(`${API_URL}/api/reservations/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReservations(reservations.filter(r => r._id !== id));
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  if (loading) return <div className="text-gold">Loading reservations...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading text-white tracking-widest">Manage Reservations</h1>

      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="p-4 font-medium">Ref</th>
                <th className="p-4 font-medium">Guest Details</th>
                <th className="p-4 font-medium">Booking Time</th>
                <th className="p-4 font-medium">Special Requests</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">No reservations found.</td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res._id} className="hover:bg-white/[0.02] transition-colors text-gray-300">
                    <td className="p-4 font-mono text-sm text-gray-400">
                      <div>#{res.reservationReference}</div>
                      <div className="text-xs text-gray-600 mt-1">{new Date(res.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{res.fullName}</div>
                      <div className="text-sm text-gray-500">{res.phone}</div>
                      <div className="text-sm text-gold mt-1">{res.guests} Guests</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white">{res.date}</div>
                      <div className="text-sm text-gray-400">{res.time}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-400 max-w-xs truncate">
                      {res.specialRequests || '-'}
                    </td>
                    <td className="p-4">
                      <select 
                        value={res.status}
                        onChange={(e) => updateStatus(res._id, e.target.value)}
                        className={`bg-[#121212] border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer focus:border-gold/50 ${
                          res.status === 'confirmed' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => deleteReservation(res._id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Reservation"
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
