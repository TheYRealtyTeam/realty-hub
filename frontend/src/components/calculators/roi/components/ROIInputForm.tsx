
import React from 'react';

interface ROIInputFormProps {
  sharedState: {
    propertyValue: number;
    downPaymentAmount: number;
    downPaymentPercent: number;
    closingCosts: number;
    renovationCosts: number;
    monthlyRent: number;
    mortgagePayment: number;
    propertyTax: number;
    insurance: number;
    maintenanceCost: number;
    vacancyRate: number;
    managementFee: number;
    isFlatFee: boolean;
    otherExpenses: number;
    interestRate: number;
    annualAppreciation: number;
    holdingPeriod: number;
  };
  updateSharedState: (updates: any) => void;
}

const ROIInputForm = ({ sharedState, updateSharedState }: ROIInputFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateSharedState({ [name]: parseFloat(value) || 0 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)</label>
            <input
              type="number"
              name="propertyValue"
              value={sharedState.propertyValue}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label>
            <input
              type="number"
              name="downPaymentAmount"
              value={sharedState.downPaymentAmount}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                const percent = (value / sharedState.propertyValue) * 100;
                updateSharedState({ 
                  downPaymentAmount: value,
                  downPaymentPercent: percent
                });
              }}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Costs ($)</label>
            <input
              type="number"
              name="closingCosts"
              value={sharedState.closingCosts}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Renovation Costs ($)</label>
            <input
              type="number"
              name="renovationCosts"
              value={sharedState.renovationCosts}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rental Income ($)</label>
            <input
              type="number"
              name="monthlyRent"
              value={sharedState.monthlyRent}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label>
            <div className="input-field bg-gray-100 flex items-center justify-between">
              <span>
                {(
                  sharedState.propertyTax / 12 +
                  sharedState.insurance / 12 +
                  sharedState.maintenanceCost +
                  (sharedState.monthlyRent * sharedState.vacancyRate) / 100 +
                  (sharedState.isFlatFee ? sharedState.managementFee : (sharedState.monthlyRent * sharedState.managementFee) / 100) +
                  sharedState.otherExpenses
                ).toFixed(2)}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Appreciation Rate (%)</label>
            <input
              type="number"
              name="annualAppreciation"
              value={sharedState.annualAppreciation}
              onChange={handleChange}
              step="0.1"
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holding Period (years)</label>
            <select
              name="holdingPeriod"
              value={sharedState.holdingPeriod}
              onChange={handleChange}
              className="input-field"
            >
              <option value="1">1 year</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIInputForm;
