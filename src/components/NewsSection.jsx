import React, { useState } from 'react';

const NewsSection = () => {
  const [category, setCategory] = useState('general');
  const [minId, setMinId] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const WEBHOOK_URL = 'https://lkx100.app.n8n.cloud/webhook-test/8fa85732-41ed-4d19-ab17-03204077aaf9';

  const handleFetchNews = async (e) => {
    e.preventDefault();
    console.log('=== Fetching News ===');
    console.log('Category:', category);
    console.log('MinId:', minId);

    setLoading(true);
    setError(null);
    setNewsData([]);

    try {
      // Build URL with query parameters
      const url = new URL(WEBHOOK_URL);
      url.searchParams.append('category', category);
      if (minId) {
        url.searchParams.append('minId', minId);
      }

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
      console.log('Response data type:', typeof data);
      
      // Handle different response structures
      // Check for n8n webhook response format: {body: [], headers: {}, statusCode: 200}
      let newsArray = [];
      
      // Check if response is wrapped in array with body inside first element
      if (Array.isArray(data) && data.length > 0 && data[0].body && Array.isArray(data[0].body)) {
        newsArray = data[0].body;
        console.log('Using data[0].body (n8n Respond to Webhook format)');
      } 
      // Check for direct body property
      else if (data.body && Array.isArray(data.body)) {
        newsArray = data.body;
        console.log('Using data.body (n8n webhook format)');
      } 
      // Check if data itself is array of articles
      else if (Array.isArray(data) && data.length > 0 && data[0].headline) {
        newsArray = data;
        console.log('Using data directly (article array format)');
      }
      // Check for nested structures
      else if (data.news && Array.isArray(data.news)) {
        newsArray = data.news;
        console.log('Using data.news format');
      } else if (data.data && Array.isArray(data.data)) {
        newsArray = data.data;
        console.log('Using data.data format');
      }
      
      console.log('Parsed news array length:', newsArray.length);
      console.log('First article sample:', newsArray[0]);

      setNewsData(newsArray);

      if (newsArray.length === 0) {
        console.warn('No news articles found');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      console.error('Error details:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('=== Fetch Complete ===');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Financial News</h1>
          <p className="text-slate-600">Stay updated with the latest market developments</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <form onSubmit={handleFetchNews} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    console.log('Category changed to:', e.target.value);
                    setCategory(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-900"
                >
                  <option value="general">General</option>
                  <option value="forex">Forex</option>
                  <option value="crypto">Crypto</option>
                  <option value="merger">Merger</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Min ID (Optional)
                </label>
                <input
                  type="text"
                  value={minId}
                  onChange={(e) => setMinId(e.target.value)}
                  placeholder="e.g., 12345"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'Fetch News'
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg mb-6">
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
          </div>
        )}

        {/* News Results */}
        {!loading && newsData.length === 0 && !error && (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-xl text-slate-600">No news articles found</p>
            <p className="text-sm text-slate-500 mt-2">Select a category and click "Fetch News" to get started</p>
          </div>
        )}

        {!loading && newsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((article, index) => {
              if (index === 0) console.log('Rendering first article:', article);
              return (
                <div
                  key={article.id || index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-xl transition-all duration-200"
                >
              
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.headline}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', article.image);
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {article.headline || 'No headline'}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {article.summary || 'No summary available'}
                  </p>
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                    <span className="font-medium">{article.source || 'Unknown source'}</span>
                    {article.datetime && (
                      <span>{new Date(article.datetime * 1000).toLocaleDateString()}</span>
                    )}
                  </div>
                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => console.log('Opening article:', article.url)}
                      className="block text-center bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Read More
                    </a>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
