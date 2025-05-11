'use client';
import React, { useState } from 'react';

export default function DonationForm() {
  const [form, setForm] = useState({
    name: '',
    bkash: '',
    note: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/donate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      alert('✅ Donation submitted successfully!');
      setForm({ name: '', bkash: '', note: '' });
    } else {
      alert('❌ Error submitting donation');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">💰 Donate Now</h2>

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
              rows="3"
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
            {loading ? 'Submitting...' : 'Submit Donation'}
          </button>
        </form>
      </div>
    </div>
  );
}
