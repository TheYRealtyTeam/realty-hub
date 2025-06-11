
import React from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface PropertyInputFormProps {
  sharedState: {
    propertyValue: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    monthlyRent: number;
    propertyTax: number;
    insurance: number;
    maintenanceCost: number;
    vacancyRate: number;
    managementFee: number;
    mortgagePayment: number;
    otherExpenses: number;
    isFlatFee: boolean;
    isYearly: boolean;
  };
  updateSharedState: (updates: any) => void;
}

const PropertyInputForm = ({ sharedState, updateSharedState }: PropertyInputFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSharedState({ [name]: parseFloat(value) || 0 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                {sharedState.isYearly ? 'Yearly' : 'Monthly'} Rent ($)
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Monthly</span>
                <Switch 
                  checked={sharedState.isYearly}
                  onCheckedChange={(checked) => updateSharedState({ isYearly: checked })}
                  className="data-[state=checked]:bg-yrealty-navy"
                />
                <span className="text-xs text-gray-500">Yearly</span>
              </div>
            </div>
            <input
              type="number"
              name="monthlyRent"
              value={sharedState.monthlyRent}
              onChange={handleChange}
              className="input-field"
              placeholder={sharedState.isYearly ? "Enter yearly rent" : "Enter monthly rent"}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Value ($)</label>
            <input
              type="number"
              name="propertyValue"
              value={sharedState.propertyValue}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Down Payment (%)</label>
              <span className="text-sm text-gray-500">${sharedState.downPaymentAmount.toLocaleString()}</span>
            </div>
            <Input
              type="number"
              name="downPaymentPercent"
              value={sharedState.downPaymentPercent}
              onChange={handleChange}
              className="input-field"
              min="0"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Property Tax ($)</label>
            <input
              type="number"
              name="propertyTax"
              value={sharedState.propertyTax}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Insurance ($)</label>
            <input
              type="number"
              name="insurance"
              value={sharedState.insurance}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </div>
      
      <div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Maintenance ($)</label>
            <input
              type="number"
              name="maintenanceCost"
              value={sharedState.maintenanceCost}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
            <input
              type="number"
              name="vacancyRate"
              value={sharedState.vacancyRate}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Management Fee {sharedState.isFlatFee ? '($)' : '(%)'}
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Percentage</span>
                <Switch 
                  checked={sharedState.isFlatFee}
                  onCheckedChange={(checked) => updateSharedState({ isFlatFee: checked })}
                  className="data-[state=checked]:bg-yrealty-navy"
                />
                <span className="text-xs text-gray-500">Flat Fee</span>
              </div>
            </div>
            <input
              type="number"
              name="managementFee"
              value={sharedState.managementFee}
              onChange={handleChange}
              className="input-field"
              placeholder={sharedState.isFlatFee ? "Enter flat fee amount" : "Enter percentage"}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Mortgage Payment ($)</label>
            <input
              type="number"
              name="mortgagePayment"
              value={sharedState.mortgagePayment}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Monthly Expenses ($)</label>
            <input
              type="number"
              name="otherExpenses"
              value={sharedState.otherExpenses}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInputForm;
