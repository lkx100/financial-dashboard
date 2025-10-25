import React from 'react';

const Home = () => {
  console.log('Home page rendered');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Financial Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Your gateway to real-time financial news and comprehensive stock reports
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* News Feature */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Financial News</h2>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest financial news across multiple categories including
              general market news, forex, cryptocurrency, and mergers & acquisitions.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Multiple news categories</li>
              <li>✓ Real-time updates</li>
              <li>✓ Detailed summaries</li>
              <li>✓ Direct source links</li>
            </ul>
          </div>

          {/* Reports Feature */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-4">📈</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Financial Reports</h2>
            <p className="text-gray-600 mb-4">
              Access comprehensive financial reports for any publicly traded company.
              Get key metrics and insights to make informed investment decisions.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Company financials</li>
              <li>✓ Key metrics & ratios</li>
              <li>✓ Revenue & earnings data</li>
              <li>✓ Quick analysis</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Choose a Section</h3>
              <p className="text-sm text-gray-600">
                Navigate to News or Reports using the navigation bar
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Enter Your Query</h3>
              <p className="text-sm text-gray-600">
                Select a news category or enter a stock symbol
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Instant Results</h3>
              <p className="text-sm text-gray-600">
                View beautifully formatted financial data instantly
              </p>
            </div>
          </div>
        </div>

        {/* Tech Info */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Powered by n8n Workflows
          </h3>
          <p className="text-sm text-gray-600">
            This dashboard integrates seamlessly with n8n cloud workflows via webhooks,
            providing real-time financial data from trusted sources like Finnhub API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
