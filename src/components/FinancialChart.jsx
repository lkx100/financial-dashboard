import React from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const FinancialChart = ({ 
  data, 
  chartType = 'line', 
  selectedMetrics = [], 
  timeRange = 'all',
  loading = false 
}) => {
  console.log('FinancialChart - Data:', data);
  console.log('FinancialChart - Selected Metrics:', selectedMetrics);
  console.log('FinancialChart - Chart Type:', chartType);

  // Filter data based on time range
  const filterDataByTimeRange = (chartData, range) => {
    if (!chartData || chartData.length === 0) return [];
    
    const now = new Date().getFullYear();
    let yearsToShow;
    
    switch (range) {
      case '1y':
        yearsToShow = 1;
        break;
      case '3y':
        yearsToShow = 3;
        break;
      case '5y':
        yearsToShow = 5;
        break;
      case 'all':
      default:
        return chartData;
    }
    
    return chartData.filter(item => now - item.year < yearsToShow);
  };

  const filteredData = filterDataByTimeRange(data, timeRange);
  console.log('Filtered data for time range:', filteredData);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 h-96 flex items-center justify-center">
        <p className="text-gray-500 text-lg">No data available for the selected time range</p>
      </div>
    );
  }

  // Color palette for different metrics
  const colors = ['#2563eb', '#dc2626', '#059669', '#d97706', '#7c3aed', '#db2777'];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">Year {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatValue(entry.value, entry.unit)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Format value for display
  const formatValue = (value, unit = 'usd') => {
    if (!value && value !== 0) return 'N/A';
    if (unit === 'usd') {
      const billions = value / 1_000_000_000;
      return `$${billions.toFixed(2)}B`;
    } else if (unit === 'shares') {
      const billions = value / 1_000_000_000;
      return `${billions.toFixed(2)}B`;
    }
    return value.toLocaleString();
  };

  // Y-axis formatter
  const yAxisFormatter = (value) => {
    const billions = value / 1_000_000_000;
    return `$${billions.toFixed(0)}B`;
  };

  const renderChart = () => {
    const chartProps = {
      data: filteredData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    const commonAxisProps = {
      xAxis: <XAxis dataKey="year" />,
      yAxis: <YAxis tickFormatter={yAxisFormatter} />,
      grid: <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />,
      tooltip: <Tooltip content={<CustomTooltip />} />,
      legend: <Legend />
    };

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...chartProps}>
            {commonAxisProps.grid}
            {commonAxisProps.xAxis}
            {commonAxisProps.yAxis}
            {commonAxisProps.tooltip}
            {commonAxisProps.legend}
            {selectedMetrics.map((metric, index) => (
              <Bar 
                key={metric.key} 
                dataKey={metric.key} 
                fill={colors[index % colors.length]} 
                name={metric.label}
                unit={metric.unit}
              />
            ))}
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...chartProps}>
            {commonAxisProps.grid}
            {commonAxisProps.xAxis}
            {commonAxisProps.yAxis}
            {commonAxisProps.tooltip}
            {commonAxisProps.legend}
            {selectedMetrics.map((metric, index) => (
              <Area 
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.3}
                name={metric.label}
                unit={metric.unit}
              />
            ))}
          </AreaChart>
        );
      
      case 'line':
      default:
        return (
          <LineChart {...chartProps}>
            {commonAxisProps.grid}
            {commonAxisProps.xAxis}
            {commonAxisProps.yAxis}
            {commonAxisProps.tooltip}
            {commonAxisProps.legend}
            {selectedMetrics.map((metric, index) => (
              <Line 
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={metric.label}
                unit={metric.unit}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ResponsiveContainer width="100%" height={400}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;
