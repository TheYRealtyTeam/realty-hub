
import React from 'react';

interface ROIResults {
  totalInvestment: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  propertyValueAtSale: number;
  equityAtSale: number;
  totalROI: number;
  annualizedROI: number;
}

interface ROIResultsDisplayProps {
  results: ROIResults;
  showResults: boolean;
}

const ROIResultsDisplay = ({ results, showResults }: ROIResultsDisplayProps) => {
  if (!showResults) return null;

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-yrealty-navy">ROI Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Total Investment</p>
          <p className="text-xl font-bold text-yrealty-navy">${results.totalInvestment.toFixed(2)}</p>
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
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Total Cash Flow (over holding period)</p>
          <p className={`text-xl font-bold ${results.totalCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${results.totalCashFlow.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Property Value at Sale</p>
          <p className="text-xl font-bold text-yrealty-navy">${results.propertyValueAtSale.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Equity at Sale</p>
          <p className="text-xl font-bold text-yrealty-navy">${results.equityAtSale.toFixed(2)}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Total ROI</p>
          <p className={`text-xl font-bold ${results.totalROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {results.totalROI.toFixed(2)}%
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Annualized ROI</p>
          <p className={`text-xl font-bold ${results.annualizedROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {results.annualizedROI.toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>* This calculator provides estimates based on the input values and assumes consistent appreciation.</p>
        <p>* Actual returns may vary based on market conditions, property management, and other factors.</p>
        <p>* Consult with a financial advisor before making investment decisions.</p>
      </div>
    </div>
  );
};

export default ROIResultsDisplay;
