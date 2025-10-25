import React from 'react';

const Navbar = ({ activeSection, setActiveSection }) => {
  console.log('Navbar rendered - Active section:', activeSection);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            📊 Financial Dashboard
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                console.log('Navigation clicked: Home');
                setActiveSection('home');
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activeSection === 'home'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'bg-blue-700 hover:bg-blue-600'
              }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                console.log('Navigation clicked: News');
                setActiveSection('news');
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activeSection === 'news'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'bg-blue-700 hover:bg-blue-600'
              }`}
            >
              📰 News
            </button>
            <button
              onClick={() => {
                console.log('Navigation clicked: Reports');
                setActiveSection('reports');
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                activeSection === 'reports'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'bg-blue-700 hover:bg-blue-600'
              }`}
            >
              📈 Reports
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
