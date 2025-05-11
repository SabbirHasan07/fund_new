'use client';

import { useEffect, useState } from 'react';


export default function MemberPage() {

  const [unpaidDonors, setUnpaidDonors] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [form, setForm] = useState({ name: '', bkash: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const fetchDonors = async () => {
    try {
      const res = await fetch('/api/unpaidDonors');
      const data = await res.json();
      setUnpaidDonors(data);
    } catch (err) {
      setToast({ message: 'Failed to fetch donors', type: 'error' });
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {

        setToast({ message: '✅ Information updated successfully!', type: 'success' });
        setForm({ name: '', bkash: '', note: '' });
        setTimeout(() => {
          setToast({ message: '', type: '' });
        }, 3000)
        await fetchDonors();

      } else {
        setToast({ message: '❌ Error submitting information', type: 'error' });
      }
    } catch (error) {
      setLoading(false);
      setToast({ message: '❌ Server error. Try again.', type: 'error' });
    }
  };

  const handleApprove = async (id) => {
    setLoadingId(id);

    const res = await fetch(`/api/unpaidDonors/${id}`, { method: 'PUT' });

    if (res.ok) {
      await fetchDonors();
    } else {
      setToast({ message: '❌ Failed to approve', type: 'error' });
    }

    setLoadingId(null);
  };

  return (
    <div className="bg-white text-black max-w-6xl mx-auto py-8 px-4">
      {toast.message && (
        <div
          className={`mb-4 px-4 py-3 rounded ${toast.type === 'success'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}
        >
          {toast.message}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">Unpaid Donors</h1>

      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Bkash</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {unpaidDonors.map((donor) => (
              <tr key={donor.id} className="border-t">
                <td className="px-4 py-2">{donor.name}</td>
                <td className="px-4 py-2">{donor.bkash}</td>
                <td className="px-4 py-2 capitalize">{donor.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleApprove(donor.id)}
                    disabled={loadingId === donor.id || donor.status === 'in progress'}
                    className={`px-4 py-1 rounded text-white ${donor.status === 'in progress'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                      }`}
                  >
                    {loadingId === donor.id ? 'Approving...' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📋 Update Information</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Bkash Number</label>
            <input
              name="bkash"
              type="text"
              required
              value={form.bkash}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Note (optional)</label>
            <textarea
              name="note"
              rows={3}
              value={form.note}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Write a message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
