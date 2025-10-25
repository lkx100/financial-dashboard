import React, { useState } from 'react';

const ReportSection = () => {
  const [symbol, setSymbol] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const WEBHOOK_URL = 'https://lkx100.app.n8n.cloud/webhook-test/8c0d0c76-69db-495a-bb78-c038a6bc301a';

  const handleFetchReport = async (e) => {
    e.preventDefault();
    
    if (!symbol.trim()) {
      console.warn('Symbol is empty');
      setError('Please enter a stock symbol');
      return;
    }

    console.log('=== Fetching Financial Report ===');
    console.log('Symbol:', symbol.toUpperCase());

    setLoading(true);
    setError(null);
    setReportData(null);

    try {
      // Build URL with query parameters
      const url = new URL(WEBHOOK_URL);
      url.searchParams.append('symbol', symbol.toUpperCase());

      console.log('Request URL:', url.toString());

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      setReportData(data);
    } catch (err) {
      console.error('Error fetching report:', err);
      console.error('Error details:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('=== Fetch Complete ===');
    }
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📈 Financial Reports</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleFetchReport} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => {
                  console.log('Symbol input:', e.target.value);
                  setSymbol(e.target.value);
                }}
                placeholder="e.g., AAPL, TSLA, MSFT"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter a valid stock ticker symbol
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 Loading...' : '📊 Get Report'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        )}

        {/* Report Results */}
        {!loading && reportData && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <h2 className="text-2xl font-bold">
                {reportData.name || reportData.companyName || symbol.toUpperCase()}
              </h2>
              {reportData.ticker && (
                <p className="text-blue-100 mt-1">Ticker: {reportData.ticker}</p>
              )}
            </div>

            <div className="p-6">
              {/* Render data as key-value pairs */}
              <div className="space-y-4">
                {Object.entries(reportData).map(([key, value]) => {
                  // Skip rendering certain keys
                  if (key === 'name' || key === 'ticker' || key === 'companyName') {
                    return null;
                  }

                  return (
                    <div
                      key={key}
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="font-semibold text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-gray-900 text-right">
                        {typeof value === 'object' && value !== null
                          ? JSON.stringify(value)
                          : renderValue(value)}
                      </span>
                    </div>
                  );
                })}

                {Object.keys(reportData).length <= 2 && (
                  <div className="text-center py-6 text-gray-500">
                    <p>No detailed financial data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!loading && !reportData && !error && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">📭 Enter a stock symbol to view financial reports</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSection;
