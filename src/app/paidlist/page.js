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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          🕌 Ka Shakha Central Fund
        </h1>


        
        {/* Donor List Table */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Paid ✅ Donor List</h2>

          <div className="overflow-x-auto bg-white rounded-xl shadow border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                {donors.map((donor) => (
                  <tr key={donor.id} className="hover:bg-green-50">
                    <td className="px-6 py-4 whitespace-nowrap">{donor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          donor.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : donor.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {donor.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {donors.length === 0 && (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                      No donors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
