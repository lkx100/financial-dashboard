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
    if (!changeValue) return 'text-slate-500';
    return changeValue > 0 ? 'text-emerald-600' : 'text-rose-600';
  };

  const getChangeIcon = (changeValue) => {
    if (!changeValue) return '';
    return changeValue > 0 ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{title}</h3>
        {icon && (
          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
            <span className="text-xl">{icon}</span>
          </div>
        )}
      </div>
      <div className="mb-2">
        <p className="text-3xl font-bold text-slate-900">{formatValue(value, unit)}</p>
      </div>
      {change !== undefined && change !== null && (
        <div className={`flex items-center text-sm font-semibold ${getChangeColor(change)}`}>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            {change > 0 ? (
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            )}
          </svg>
          <span>{Math.abs(change).toFixed(2)}%</span>
          <span className="ml-2 text-slate-500 font-normal">vs last year</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
