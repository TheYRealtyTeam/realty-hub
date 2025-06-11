
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import EnhancedRentalCalculator from './calculators/enhanced/EnhancedRentalCalculator';
import EnhancedMortgageCalculator from './calculators/enhanced/EnhancedMortgageCalculator';
import EnhancedROICalculator from './calculators/enhanced/EnhancedROICalculator';

// Define shared state interface
interface SharedCalculatorState {
  // Property details
  propertyValue: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  
  // Mortgage details
  interestRate: number;
  loanTerm: number;
  mortgagePayment: number;
  
  // Rental details
  monthlyRent: number;
  propertyTax: number;
  insurance: number;
  maintenanceCost: number;
  vacancyRate: number;
  managementFee: number;
  isFlatFee: boolean;
  isYearly: boolean;
  otherExpenses: number;

  // ROI details
  closingCosts: number;
  renovationCosts: number;
  annualAppreciation: number;
  holdingPeriod: number;
}

const CalculatorsSection = () => {
  const isMobile = useIsMobile();

  // Initialize shared state with default values - this persists across calculator switches
  const [sharedState, setSharedState] = useState<SharedCalculatorState>({
    propertyValue: 300000,
    downPaymentPercent: 20,
    downPaymentAmount: 60000,
    
    interestRate: 4.5,
    loanTerm: 30,
    mortgagePayment: 1500,
    
    monthlyRent: 2000,
    propertyTax: 3000,
    insurance: 1200,
    maintenanceCost: 100,
    vacancyRate: 5,
    managementFee: 8,
    isFlatFee: false,
    isYearly: false,
    otherExpenses: 100,

    closingCosts: 5000,
    renovationCosts: 10000,
    annualAppreciation: 3,
    holdingPeriod: 5
  });

  // Function to update shared state - persists data across calculator switches
  const updateSharedState = (updates: Partial<SharedCalculatorState>) => {
    setSharedState(prevState => ({
      ...prevState,
      ...updates,
      // Auto-calculate downPaymentAmount whenever propertyValue or downPaymentPercent changes
      downPaymentAmount: updates.downPaymentPercent !== undefined || updates.propertyValue !== undefined
        ? ((updates.propertyValue || prevState.propertyValue) * (updates.downPaymentPercent || prevState.downPaymentPercent)) / 100
        : prevState.downPaymentAmount
    }));
  };

  // Reset function - only called when user explicitly resets or refreshes page
  const resetCalculators = () => {
    setSharedState({
      propertyValue: 300000,
      downPaymentPercent: 20,
      downPaymentAmount: 60000,
      
      interestRate: 4.5,
      loanTerm: 30,
      mortgagePayment: 1500,
      
      monthlyRent: 2000,
      propertyTax: 3000,
      insurance: 1200,
      maintenanceCost: 100,
      vacancyRate: 5,
      managementFee: 8,
      isFlatFee: false,
      isYearly: false,
      otherExpenses: 100,

      closingCosts: 5000,
      renovationCosts: 10000,
      annualAppreciation: 3,
      holdingPeriod: 5
    });
  };
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <Tabs defaultValue="rental" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className={`flex flex-wrap ${isMobile ? 'flex-col w-full' : 'grid-cols-3'} max-w-2xl w-full`}>
              <TabsTrigger value="rental" className="flex-1">Enhanced Rental Calculator</TabsTrigger>
              <TabsTrigger value="mortgage" className="flex-1">Mortgage Calculator</TabsTrigger>
              <TabsTrigger value="roi" className="flex-1">ROI Calculator</TabsTrigger>
            </TabsList>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={resetCalculators}
              className="text-sm"
            >
              Reset All Calculators
            </Button>
          </div>
          
          <TabsContent value="rental" className="reveal">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 text-yrealty-navy">Advanced Property Investment Calculator</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Make informed investment decisions with our comprehensive analysis tool. Get detailed insights, real-time calculations, and professional recommendations for your property investment.
                </p>
              </div>
              <EnhancedRentalCalculator 
                sharedState={sharedState} 
                updateSharedState={updateSharedState} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="mortgage" className="reveal">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 text-yrealty-navy">Advanced Mortgage Calculator</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Calculate your mortgage payments with precision. Get detailed breakdowns, amortization schedules, and professional insights to make informed home buying decisions.
                </p>
              </div>
              <EnhancedMortgageCalculator 
                sharedState={sharedState} 
                updateSharedState={updateSharedState} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="roi" className="reveal">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 text-yrealty-navy">Advanced ROI Investment Calculator</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Analyze investment opportunities with sophisticated modeling. Calculate returns, cash flow projections, and get professional insights for your property investments.
                </p>
              </div>
              <EnhancedROICalculator 
                sharedState={sharedState} 
                updateSharedState={updateSharedState} 
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4 text-yrealty-navy">Need Help Understanding Your Investment Options?</h3>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Our team of property investment specialists can help you analyze potential investments and develop a customized strategy for your goals.
          </p>
          <Button asChild className="bg-yrealty-navy hover:bg-yrealty-navy/90 text-white py-3 px-6 text-base font-medium rounded">
            <Link to="/appointment">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsSection;
