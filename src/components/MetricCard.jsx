import React from 'react';

const MetricCard = ({ title, value, change, icon, unit = 'usd', loading = false }) => {
  const formatValue = (val, unitType) => {
    if (!val && val !== 0) return 'N/A';
    
    if (unitType === 'usd') {
      // Convert to billions for readability
      const billions = val / 1_000_000_000;
      return `$${billions.toFixed(2)}B`;
    } else if (unitType === 'shares') {
      const billions = val / 1_000_000_000;
      return `${billions.toFixed(2)}B shares`;
    } else if (unitType === 'percentage') {
      return `${val.toFixed(2)}%`;
    }
    return val.toLocaleString();
  };

  const getChangeColor = (changeValue) => {
    if (!changeValue) return 'text-gray-500';
    return changeValue > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (changeValue) => {
    if (!changeValue) return '';
    return changeValue > 0 ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="mb-1">
        <p className="text-3xl font-bold text-gray-900">{formatValue(value, unit)}</p>
      </div>
      {change !== undefined && change !== null && (
        <div className={`flex items-center text-sm font-medium ${getChangeColor(change)}`}>
          <span className="mr-1">{getChangeIcon(change)}</span>
          <span>{Math.abs(change).toFixed(2)}%</span>
          <span className="ml-1 text-gray-500">YoY</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
