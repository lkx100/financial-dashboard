import React, { useState, useMemo } from 'react';
import MetricCard from './MetricCard';
import FinancialChart from './FinancialChart';

const ReportSection = () => {
  const [symbol, setSymbol] = useState('');
  const [rawReportData, setRawReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Chart controls
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('5y');
  const [selectedMetricKeys, setSelectedMetricKeys] = useState(['netIncome', 'revenue']);

  const WEBHOOK_URL = 'https://lkx100.app.n8n.cloud/webhook-test/8c0d0c76-69db-495a-bb78-c038a6bc301a';

  // Available metrics for selection
  const availableMetrics = [
    { key: 'revenue', label: 'Revenue', unit: 'usd', category: 'Income Statement', 
      concept: 'us-gaap_Revenues', 
      alternativeConcepts: ['us-gaap_SalesRevenueNet', 'us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax'] },
    { key: 'netIncome', label: 'Net Income', unit: 'usd', category: 'Income Statement', 
      concept: 'us-gaap_NetIncomeLoss' },
    { key: 'operatingIncome', label: 'Operating Income', unit: 'usd', category: 'Income Statement', 
      concept: 'us-gaap_OperatingIncomeLoss' },
    { key: 'operatingExpenses', label: 'Operating Expenses', unit: 'usd', category: 'Income Statement', 
      concept: 'us-gaap_OperatingExpenses' },
    { key: 'operatingCashFlow', label: 'Operating Cash Flow', unit: 'usd', category: 'Cash Flow', 
      concept: 'us-gaap_NetCashProvidedByUsedInOperatingActivities' },
    { key: 'sharesOutstanding', label: 'Shares Outstanding', unit: 'shares', category: 'Balance Sheet', 
      concept: 'us-gaap_CommonStockSharesOutstanding' },
  ];

  // Extract value from financial statement by concept (with fallbacks)
  const extractMetricValue = (report, concept, alternativeConcepts = []) => {
    if (!report) return null;
    
    // Search in all statement types (bs, ic, cf)
    const statementTypes = ['bs', 'ic', 'cf'];
    
    // Try main concept first
    for (const type of statementTypes) {
      if (report[type] && Array.isArray(report[type])) {
        const item = report[type].find(entry => entry.concept === concept);
        if (item) {
          console.log(`  Found ${concept} = ${item.value}`);
          return item.value;
        }
      }
    }
    
    // Try alternative concepts
    if (alternativeConcepts && alternativeConcepts.length > 0) {
      for (const altConcept of alternativeConcepts) {
        for (const type of statementTypes) {
          if (report[type] && Array.isArray(report[type])) {
            const item = report[type].find(entry => entry.concept === altConcept);
            if (item) {
              console.log(`  Found alternative ${altConcept} = ${item.value}`);
              return item.value;
            }
          }
        }
      }
    }
    
    return null;
  };

  // Process raw API data into chart-friendly format
  const processedChartData = useMemo(() => {
    console.log('=== Processing Chart Data ===');
    console.log('rawReportData:', rawReportData);
    
    if (!rawReportData) {
      console.log('No rawReportData');
      return [];
    }
    
    if (!rawReportData.data) {
      console.log('No rawReportData.data array');
      console.log('rawReportData keys:', Object.keys(rawReportData));
      return [];
    }
    
    console.log('rawReportData.data length:', rawReportData.data.length);
    console.log('First data entry:', rawReportData.data[0]);
    
    const processed = rawReportData.data
      .filter(entry => {
        const hasReport = !!entry.report;
        console.log(`Year ${entry.year} - has report:`, hasReport);
        return hasReport;
      })
      .map(entry => {
        const yearData = {
          year: entry.year,
          quarter: entry.quarter,
        };
        
        // Extract all metric values for this year
        availableMetrics.forEach(metric => {
          const value = extractMetricValue(entry.report, metric.concept, metric.alternativeConcepts);
          yearData[metric.key] = value;
          console.log(`  ${metric.label}: ${value}`);
        });
        
        return yearData;
      })
      .sort((a, b) => a.year - b.year);
    
    console.log('Processed chart data:', processed);
    console.log('=== Processing Complete ===');
    return processed;
  }, [rawReportData]);

  // Calculate latest metrics for summary cards
  const latestMetrics = useMemo(() => {
    console.log('=== Calculating Latest Metrics ===');
    console.log('processedChartData:', processedChartData);
    console.log('processedChartData length:', processedChartData?.length);
    
    if (!processedChartData || processedChartData.length === 0) {
      console.log('No processed chart data available');
      return null;
    }
    
    const latest = processedChartData[processedChartData.length - 1];
    const previous = processedChartData[processedChartData.length - 2];
    
    console.log('Latest year data:', latest);
    console.log('Previous year data:', previous);
    
    const calculateChange = (current, prev) => {
      if (!current || !prev || prev === 0) return null;
      return ((current - prev) / Math.abs(prev)) * 100;
    };
    
    const metrics = {
      revenue: {
        value: latest.revenue,
        change: previous ? calculateChange(latest.revenue, previous.revenue) : null
      },
      netIncome: {
        value: latest.netIncome,
        change: previous ? calculateChange(latest.netIncome, previous.netIncome) : null
      },
      operatingIncome: {
        value: latest.operatingIncome,
        change: previous ? calculateChange(latest.operatingIncome, previous.operatingIncome) : null
      },
      operatingCashFlow: {
        value: latest.operatingCashFlow,
        change: previous ? calculateChange(latest.operatingCashFlow, previous.operatingCashFlow) : null
      }
    };
    
    console.log('Calculated metrics:', metrics);
    console.log('=== Metrics Calculation Complete ===');
    return metrics;
  }, [processedChartData]);

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
    setRawReportData(null);

    try {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      console.log('Response type:', typeof data);
      console.log('Is array?', Array.isArray(data));
      
      // Handle n8n webhook response format - multiple levels of nesting
      let reportData = data;
      
      // Check for array wrapper with body inside
      if (Array.isArray(data) && data.length > 0 && data[0].body) {
        console.log('Found data[0].body structure');
        reportData = data[0].body;
      } 
      // Check for direct body property
      else if (data.body) {
        console.log('Found data.body structure');
        reportData = data.body;
      }
      
      console.log('Extracted report data:', reportData);
      console.log('Report data has "data" array?', reportData?.data ? 'YES' : 'NO');
      console.log('Report data.data length:', reportData?.data?.length);
      
      setRawReportData(reportData);
      
    } catch (err) {
      console.error('Error fetching report:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('=== Fetch Complete ===');
    }
  };

  const toggleMetric = (metricKey) => {
    setSelectedMetricKeys(prev => {
      if (prev.includes(metricKey)) {
        return prev.filter(k => k !== metricKey);
      } else {
        return [...prev, metricKey];
      }
    });
  };

  const selectedMetricsForChart = useMemo(() => {
    return availableMetrics.filter(m => selectedMetricKeys.includes(m.key));
  }, [selectedMetricKeys]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Financial Reports</h1>
          <p className="text-slate-600">Analyze company financials with interactive visualizations</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <form onSubmit={handleFetchReport} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g., AAPL, TSLA, MSFT"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase"
                required
              />
              <p className="text-sm text-slate-500 mt-1.5">
                Enter a valid stock ticker symbol
              </p>
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
                'Get Report'
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

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <MetricCard key={i} loading={true} />
              ))}
            </div>
          </div>
        )}

        {/* Report Results */}
        {!loading && rawReportData && latestMetrics && (
          <div className="space-y-8">
            {/* Company Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl border border-indigo-500 shadow-lg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{symbol.toUpperCase()}</h2>
                  <p className="text-indigo-100 mt-2">Financial Analysis • Latest: {processedChartData[processedChartData.length - 1]?.year}</p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Revenue"
                value={latestMetrics.revenue.value}
                change={latestMetrics.revenue.change}
                unit="usd"
              />
              <MetricCard
                title="Net Income"
                value={latestMetrics.netIncome.value}
                change={latestMetrics.netIncome.change}
                unit="usd"
              />
              <MetricCard
                title="Operating Income"
                value={latestMetrics.operatingIncome.value}
                change={latestMetrics.operatingIncome.change}
                unit="usd"
              />
              <MetricCard
                title="Operating Cash Flow"
                value={latestMetrics.operatingCashFlow.value}
                change={latestMetrics.operatingCashFlow.change}
                unit="usd"
              />
            </div>

            {/* Chart Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Chart Controls</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chart Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Chart Type</label>
                  <div className="flex gap-2">
                    {['line', 'bar', 'area'].map(type => (
                      <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                          chartType === type
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Range */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Time Range</label>
                  <div className="flex gap-2">
                    {['1y', '3y', '5y', 'all'].map(range => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                          timeRange === range
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {range.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metrics Selector */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Metrics to Display</label>
                  <div className="space-y-2.5">
                    {availableMetrics.slice(0, 4).map(metric => (
                      <label key={metric.key} className="flex items-center space-x-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedMetricKeys.includes(metric.key)}
                          onChange={() => toggleMetric(metric.key)}
                          className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">{metric.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            {selectedMetricKeys.length > 0 ? (
              <FinancialChart
                data={processedChartData}
                chartType={chartType}
                selectedMetrics={selectedMetricsForChart}
                timeRange={timeRange}
                loading={false}
              />
            ) : (
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-16 text-center">
                <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-slate-600 text-lg">Please select at least one metric to display</p>
              </div>
            )}
          </div>
        )}

        {!loading && !rawReportData && !error && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">📭 Enter a stock symbol to view financial reports</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSection;
