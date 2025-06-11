
import React from 'react';
import { CalculatorState, CalculatorResults } from './types';
import PerformanceOverview from './components/PerformanceOverview';
import MetricsGrid from './components/MetricsGrid';
import InvestmentInsights from './components/InvestmentInsights';
import InvestmentRecommendations from './components/InvestmentRecommendations';
import ActionButtons from './components/ActionButtons';

interface ResultsDashboardProps {
  state: CalculatorState;
  results: CalculatorResults;
}

const ResultsDashboard = ({ state, results }: ResultsDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <PerformanceOverview results={results} />

      {/* Detailed Results Grid */}
      <MetricsGrid state={state} results={results} />

      {/* Investment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InvestmentInsights state={state} results={results} />
        <InvestmentRecommendations results={results} />
      </div>

      {/* Action Buttons */}
      <ActionButtons />

      {/* Disclaimer */}
      <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
        <p>
          * This analysis is for informational purposes only and should not be considered financial advice. 
          Consult with a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default ResultsDashboard;
