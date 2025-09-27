import React from 'react';
import config from '../constants';

const LandingPage = ({ onLogin }) => {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=2400&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg">
          Welcome to Orange Grove
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-200 drop-shadow-md">
          Discover, catalog, and share the world's most fascinating orange varieties. All powered by Manifest.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onLogin('user@manifest.build', 'password')}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Try Demo User
          </button>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Admin Panel
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-300">Admin: admin@manifest.build / admin | Demo: user@manifest.build / password</p>
      </div>
    </div>
  );
};

export default LandingPage;
