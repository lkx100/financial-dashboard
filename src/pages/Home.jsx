import React from 'react';

const Home = () => {
  console.log('Home page rendered');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Financial Intelligence Platform
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Access real-time market news and comprehensive financial reports powered by industry-leading data sources.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl border border-slate-200 p-8 hover:border-indigo-300 hover:shadow-xl transition-all duration-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Financial News</h2>
            <p className="text-slate-600 mb-4">
              Stay updated with the latest market news across multiple categories including general market updates, forex movements, cryptocurrency trends, and merger & acquisition activities.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Real-time market updates
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Category-based filtering
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Curated from trusted sources
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Direct source links
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Financial Reports</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Comprehensive company financial data with interactive charts and year-over-year analysis
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-lg">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">IPO Calendar</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track upcoming and past initial public offerings with detailed pricing and share information
            </p>
          </div>
        </div>
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-xl border border-indigo-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Select Category</h3>
              <p className="text-sm text-slate-600">Choose between News or Reports to access the information you need.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Enter Parameters</h3>
              <p className="text-sm text-slate-600">Specify your search criteria such as news category or stock symbol.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Analyze Results</h3>
              <p className="text-sm text-slate-600">View formatted data with interactive visualizations and insights.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-2">Powered by Finnhub and Financial Modeling Prep APIs</p>
          <p className="text-sm text-slate-500">Data updated in real-time through automated workflows</p>
        </div>
      </div>
    // </div>
  );
};

export default Home;
