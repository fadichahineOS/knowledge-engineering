import React, { useState, useEffect } from 'react';
import Header from './header/header';

interface Writer {
  id: number;
  username: string;
  email: string;
  isApproved: boolean;
}

const AdminDashboard: React.FC = () => {
  const [writers, setWriters] = useState<Writer[]>([]);

  useEffect(() => {
    fetchWriters();
  }, []);

  const fetchWriters = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/writers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch writers');
      }
      const data = await response.json();
      setWriters(data.writers);
    } catch (error) {
      console.error('Error fetching writers:', error);
    }
  };

  const handleApprove = async (writerId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/approve-writer/${writerId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to approve writer');
      }
      fetchWriters(); // Refresh the list
    } catch (error) {
      console.error('Error approving writer:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {writers.map((writer) => (
                <tr key={writer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{writer.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{writer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {writer.isApproved ? 
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span> :
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Pending</span>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!writer.isApproved && (
                      <button 
                        onClick={() => handleApprove(writer.id)}
                        className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;