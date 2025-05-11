'use client';

import { useEffect, useState } from 'react';

export default function MemberPage() {
  const [unpaidDonors, setUnpaidDonors] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchDonors = async () => {
    const res = await fetch('/api/unpaidDonors');
    const data = await res.json();
    setUnpaidDonors(data);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleApprove = async (id) => {
    setLoadingId(id);

    const res = await fetch(`/api/unpaidDonors/${id}`, {
      method: 'PUT',
    });

    if (res.ok) {
      await fetchDonors(); // Refresh the list
    } else {
      alert('Failed to approve');
    }

    setLoadingId(null);
  };

  return (
    <div className="bg-white text-black max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Unpaid Donors</h1>
      <table className="min-w-full border rounded">
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
              <td className="px-4 py-2">{donor.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleApprove(donor.id)}
                  disabled={loadingId === donor.id || donor.status === 'in progress'}
                  className={`px-4 py-1 rounded text-white ${
                    donor.status === 'in progress'
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
  );
}
