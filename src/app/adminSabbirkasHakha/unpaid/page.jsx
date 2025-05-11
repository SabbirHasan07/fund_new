'use client';
import React, { useEffect, useState } from 'react';

export default function UnpaidDonorsPage() {
  const [donors, setDonors] = useState([]);
  const [name, setName] = useState('');
  const [bkash, setBkash] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUnpaidDonors = async () => {
    const res = await fetch('/api/adminSabbirkasHakha/unpaid');
    const data = await res.json();
    setDonors(data);
  };

  useEffect(() => {
    fetchUnpaidDonors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !bkash) return alert('Please fill in all fields.');
    setLoading(true);

    const res = await fetch('/api/adminSabbirkasHakha/unpaid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bkash }),
    });

    if (res.ok) {
      setName('');
      setBkash('');
      fetchUnpaidDonors();
    } else {
      alert('Failed to add donor');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4 sm:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">🕓 Unpaid Donors</h1>

      {/* Add New Unpaid Donor Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Unpaid Donor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Bkash Number"
            value={bkash}
            onChange={(e) => setBkash(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* List of Unpaid Donors */}
      <div className="overflow-auto rounded-xl border bg-white shadow-md p-6">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Bkash</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="border-t">
                <td className="px-4 py-2">{donor.name}</td>
                <td className="px-4 py-2">{donor.bkash}</td>
                <td className="px-4 py-2">{donor.status}</td>
                <td className="px-4 py-2">{new Date(donor.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {donors.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No unpaid donors yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
