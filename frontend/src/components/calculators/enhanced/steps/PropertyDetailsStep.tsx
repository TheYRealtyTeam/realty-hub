
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, MapPin, DollarSign, TrendingUp } from 'lucide-react';
import { CalculatorState, CalculatorResults } from '../types';
import QuickInsightCard from '../components/QuickInsightCard';

interface PropertyDetailsStepProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  results: CalculatorResults;
}

const PropertyDetailsStep = ({ state, updateState, results }: PropertyDetailsStepProps) => {
  const handleChange = (field: keyof CalculatorState, value: string | number) => {
    updateState({ [field]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-yrealty-accent" />
              <span>Property Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyValue" className="text-sm font-medium text-gray-700">
                  Property Value
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="propertyValue"
                    type="number"
                    value={state.propertyValue}
                    onChange={(e) => handleChange('propertyValue', parseFloat(e.target.value) || 0)}
                    className="pl-10"
                    placeholder="300,000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="propertyType" className="text-sm font-medium text-gray-700">
                  Property Type
                </Label>
                <Select 
                  value={state.propertyType} 
                  onValueChange={(value) => handleChange('propertyType', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="multi-family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location (Optional)
              </Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  type="text"
                  value={state.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="pl-10"
                  placeholder="e.g., Atlanta, GA"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Adding location helps us provide more accurate market insights
              </p>
            </div>

            <div className="bg-yrealty-blue/10 p-4 rounded-lg">
              <h4 className="font-medium text-yrealty-navy mb-2">💡 Property Selection Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Consider properties in growing neighborhoods</li>
                <li>• Look for areas with good rental demand</li>
                <li>• Factor in proximity to amenities and transportation</li>
                <li>• Research local market trends and price appreciation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <QuickInsightCard
          title="Property Value"
          value={`$${state.propertyValue.toLocaleString()}`}
          subtitle="Current market value"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="neutral"
        />
        
        <Card className="bg-gradient-to-br from-yrealty-navy to-yrealty-blue text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-bold text-lg mb-2">Market Insight</h4>
              <p className="text-sm opacity-90">
                {state.propertyType === 'single-family' 
                  ? 'Single-family homes typically offer steady appreciation and easier management.'
                  : state.propertyType === 'multi-family'
                  ? 'Multi-family properties can provide multiple income streams and better cash flow.'
                  : 'This property type offers unique investment opportunities in your market.'
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-3">Quick Market Benchmarks</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Price/sqft:</span>
                <span className="font-medium">$150-250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rent/Price Ratio:</span>
                <span className="font-medium">0.8%-1.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cap Rate Range:</span>
                <span className="font-medium">4%-8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetailsStep;
