
import React from 'react';

interface CalculationResults {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
}

interface ResultsDisplayProps {
  results: CalculationResults;
  downPaymentPercent: number;
  downPaymentAmount: number;
}

const ResultsDisplay = ({ results, downPaymentPercent, downPaymentAmount }: ResultsDisplayProps) => {
  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-yrealty-navy">Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Monthly Income</p>
          <p className="text-xl font-bold text-yrealty-navy">${results.monthlyIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Monthly Expenses</p>
          <p className="text-xl font-bold text-yrealty-navy">${results.monthlyExpenses.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Monthly Cash Flow</p>
          <p className={`text-xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${results.monthlyCashFlow.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Annual Cash Flow</p>
          <p className={`text-xl font-bold ${results.annualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${results.annualCashFlow.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-2">
          <p className="text-gray-500 text-sm">Cash on Cash Return</p>
          <p className={`text-xl font-bold ${results.cashOnCashReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {results.cashOnCashReturn.toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>* Cash on Cash Return is based on your {downPaymentPercent}% down payment (${downPaymentAmount.toLocaleString()}) and 3% closing costs.</p>
        <p>* Consult with a financial advisor for personalized investment advice.</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
