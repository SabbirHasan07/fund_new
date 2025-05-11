'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalDonation: 0, monthlyDonation: 0 });

  useEffect(() => {
    fetchDonors();
    fetchStats();
  }, []);

  const fetchDonors = async () => {
    const res = await fetch('/api/admin/donors');
    const data = await res.json();
    setDonors(data);
  };

  const fetchStats = async () => {
    const res = await fetch('/api/admin/stats');
    const data = await res.json();
    setStats(data);
  };

  const handleAmountChange = (id, value) => {
    setAmounts({ ...amounts, [id]: value });
  };

  const updateStats = async (amount = 0) => {
    const addedAmount = parseInt(amount);
    const newStats = {
      totalDonation: stats.totalDonation + addedAmount,
      monthlyDonation: stats.monthlyDonation + addedAmount,
    };

    setStats(newStats);

    await fetch('/api/admin/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStats),
    });

    alert('✅ Updated successfully');
  };

  const handleStatChange = (e) => {
    setStats({
      ...stats,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleApprove = async (id) => {
    const amount = amounts[id];
    if (!amount) return alert('Enter an amount first.');
    setLoading(true);

    const res = await fetch(`/api/admin/approve/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    if (res.ok) {
      await fetchDonors();
      await updateStats(amount);
      setAmounts({ ...amounts, [id]: '' });
    } else {
      alert('Failed to approve');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this donor?')) return;

    await fetch(`/api/admin/delete/${id}`, { method: 'DELETE' });
    fetchDonors();
  };

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">📊 Admin Dashboard</h1>
      <Link className='bg-red-800 text-white px-4 py-1 mb-9 flex justify-center' href={'/adminSabbirkasHakha/unpaid'}>UNPAID MEMBER</Link>
      <div className="overflow-auto rounded-xl border bg-white shadow-md p-6">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Bkash</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Note</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="border-t">
                <td className="px-4 py-2">{donor.id.slice(0, 6)}</td>
                <td className="px-4 py-2">{donor.name}</td>
                <td className="px-4 py-2">{donor.bkash}</td>
                <td className="px-4 py-2">{donor.status}</td>
                <td className="px-4 py-2">{donor.note}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={amounts[donor.id] || ''}
                    onChange={(e) => handleAmountChange(donor.id, e.target.value)}
                    className="w-24 px-2 py-1 border rounded-md"
                  />
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleApprove(donor.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleDelete(donor.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {donors.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No donors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white border rounded-xl shadow-md p-6 mb-8 mt-11">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📈 Donation Totals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Total Donation</label>
            <input
              type="number"
              name="totalDonation"
              value={stats.totalDonation}
              onChange={handleStatChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Monthly Donation</label>
            <input
              type="number"
              name="monthlyDonation"
              value={stats.monthlyDonation}
              onChange={handleStatChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={() => updateStats(0)} // Just save without adding amount
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Totals
        </button>
      </div>
    </div>
  );
}
