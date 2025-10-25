import React from 'react';

const Navbar = ({ activeSection, setActiveSection }) => {
  console.log('Navbar rendered - Active section:', activeSection);

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Financial Dashboard</h1>
              <p className="text-xs text-slate-500">Real-time market insights</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                console.log('Navigation clicked: Home');
                setActiveSection('home');
              }}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'home'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                console.log('Navigation clicked: News');
                setActiveSection('news');
              }}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'news'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              News
            </button>
            <button
              onClick={() => {
                console.log('Navigation clicked: Reports');
                setActiveSection('reports');
              }}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'reports'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => {
                console.log('Navigation clicked: IPO Calendar');
                setActiveSection('ipo');
              }}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeSection === 'ipo'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
              }`}
            >
              IPO Calendar
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
