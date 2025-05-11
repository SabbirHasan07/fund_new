'use client';
import React, { useEffect, useState } from 'react';

export default function LandingPage() {
  const [donors, setDonors] = useState([]);
  const [totals, setTotals] = useState({ total: 0, monthly: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/landing-data');
      const data = await res.json();
      setDonors(data.donors);
      setTotals({ total: data.totalDonation, monthly: data.monthlyDonation });
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white text-black from-white to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          🕌 Ka Shakha Central Fund
        </h1>

        {/* Total Donation Stats */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 border text-center">
            <p className="text-gray-500">Total Donation</p>
            <p className="text-3xl font-bold text-green-600">{totals.total} BDT</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 border text-center">
            <p className="text-gray-500">Monthly Donation</p>
            <p className="text-3xl font-bold text-blue-600">{totals.monthly} BDT</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => window.location.href = '/donate'} // Update with your actual donation route
            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow hover:bg-green-700 transition"
          >
            Donate Now
          </button>
        </div>
        {/* Donor List */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">✅ Donor List</h2>
          <div className="flex flex-wrap gap-4">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white w-full sm:w-[48%] md:w-[31%] p-4 rounded-xl shadow border"
              >
                <p className="text-lg font-medium text-gray-800">{donor.name}</p>
                <p className="text-sm text-gray-500">Status: {donor.status}</p>
              </div>
            ))}
            {donors.length === 0 && (
              <p className="text-gray-500">No donors found.</p>
            )}
          </div>
        </section>

      </div>

    </div>
  );
}
