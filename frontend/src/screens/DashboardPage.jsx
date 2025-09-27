import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [varieties, setVarieties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newVariety, setNewVariety] = useState({
    name: '',
    description: '',
    origin: '',
    sweetness: '3 (Sweet)',
    photo: null,
  });

  useEffect(() => {
    loadVarieties();
  }, []);

  const loadVarieties = async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('OrangeVariety').find({
        sort: { createdAt: 'desc' },
        include: ['owner']
      });
      setVarieties(response.data);
    } catch (error) {
      console.error('Failed to load orange varieties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVariety({ ...newVariety, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewVariety({ ...newVariety, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newVariety.name || !newVariety.photo) {
        alert('Please provide a name and a photo for the new variety.');
        return;
    }
    try {
      const created = await manifest.from('OrangeVariety').create(newVariety);
      setVarieties([created, ...varieties]);
      setNewVariety({ name: '', description: '', origin: '', sweetness: '3 (Sweet)', photo: null });
      e.target.reset(); // Reset form fields
    } catch (error) {
      console.error('Failed to create variety:', error);
      alert('Failed to create variety. Please check the console for details.');
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this variety?')) {
        try {
            await manifest.from('OrangeVariety').delete(id);
            setVarieties(varieties.filter(v => v.id !== id));
        } catch (error) {
            console.error('Failed to delete variety:', error);
            alert('You can only delete varieties you created.');
        }
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">Orange Grove</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}!</span>
            <button 
              onClick={onLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Variety</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Variety Name" value={newVariety.name} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" required />
                <textarea name="description" placeholder="Description" value={newVariety.description} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" rows="3"></textarea>
                <input type="text" name="origin" placeholder="Country of Origin" value={newVariety.origin} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500" />
                <select name="sweetness" value={newVariety.sweetness} onChange={handleInputChange} className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white">
                  {['1 (Tart)', '2 (Slightly Sweet)', '3 (Sweet)', '4 (Very Sweet)', '5 (Syrupy)'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Photo</label>
                    <input type="file" name="photo" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200" required />
                </div>
                <button type="submit" className="w-full bg-orange-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-700 transition duration-200">Add Orange</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Variety Catalog</h2>
            {isLoading ? (
              <p>Loading varieties...</p>
            ) : varieties.length === 0 ? (
              <div className='bg-white p-6 rounded-lg shadow text-center text-gray-500'>No orange varieties found. Add one to get started!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {varieties.map(variety => (
                  <div key={variety.id} className="bg-white rounded-lg shadow overflow-hidden relative group">
                    <img src={variety.photo.thumbnail.url} alt={variety.name} className="w-full h-48 object-cover" />
                     {variety.owner?.id === user.id && (
                        <button onClick={() => handleDelete(variety.id)} className='absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                        </button>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900">{variety.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Origin: {variety.origin || 'N/A'}</p>
                      <p className="text-sm text-gray-600">Sweetness: {variety.sweetness}</p>
                      <p className="text-gray-700 mt-2 text-sm">{variety.description}</p>
                      <p className='text-xs text-gray-400 mt-3'>Added by: {variety.owner?.name || 'Unknown'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
