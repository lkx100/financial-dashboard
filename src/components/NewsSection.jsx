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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📰 Financial News</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleFetchNews} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    console.log('Category changed to:', e.target.value);
                    setCategory(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="forex">Forex</option>
                  <option value="crypto">Crypto</option>
                  <option value="merger">Merger</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min ID (Optional)
                </label>
                <input
                  type="text"
                  value={minId}
                  onChange={(e) => setMinId(e.target.value)}
                  placeholder="e.g., 12345"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 Loading...' : '🔍 Fetch News'}
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

        {/* News Results */}
        {!loading && newsData.length === 0 && !error && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">📭 No news articles found. Try fetching news!</p>
          </div>
        )}

        {!loading && newsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((article, index) => {
              if (index === 0) console.log('Rendering first article:', article);
              return (
                <div
                  key={article.id || index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
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
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {article.headline || 'No headline'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {article.summary || 'No summary available'}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>📰 {article.source || 'Unknown source'}</span>
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
                      className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Read More →
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
