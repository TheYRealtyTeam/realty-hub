
import { useState, useEffect } from 'react';
import { CalculatorState, CalculatorResults } from '../types';

export const useRentalCalculator = (sharedState: any, updateSharedState: (updates: any) => void) => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    propertyValue: sharedState.propertyValue || 300000,
    downPaymentPercent: sharedState.downPaymentPercent || 20,
    downPaymentAmount: sharedState.downPaymentAmount || 60000,
    interestRate: sharedState.interestRate || 4.5,
    loanTerm: sharedState.loanTerm || 30,
    monthlyRent: sharedState.monthlyRent || 2000,
    propertyTax: sharedState.propertyTax || 3000,
    insurance: sharedState.insurance || 1200,
    maintenanceCost: sharedState.maintenanceCost || 100,
    vacancyRate: sharedState.vacancyRate || 5,
    managementFee: sharedState.managementFee || 8,
    otherExpenses: sharedState.otherExpenses || 100,
    isFlatFee: sharedState.isFlatFee || false,
    isYearly: sharedState.isYearly || false,
    propertyType: 'single-family',
    location: '',
    holdingPeriod: 5,
    targetReturn: 8
  });

  const [results, setResults] = useState<CalculatorResults>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0,
    capRate: 0,
    totalROI: 0,
    breakEvenPoint: 0,
    mortgagePayment: 0
  });

  // Real-time calculations
  useEffect(() => {
    calculateResults();
    updateSharedState(calculatorState);
  }, [calculatorState]);

  const calculateResults = () => {
    const monthlyIncome = calculatorState.isYearly ? calculatorState.monthlyRent / 12 : calculatorState.monthlyRent;
    
    // Calculate mortgage payment
    const principal = calculatorState.propertyValue - calculatorState.downPaymentAmount;
    const monthlyRate = calculatorState.interestRate / 100 / 12;
    const numPayments = calculatorState.loanTerm * 12;
    const mortgagePayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate monthly expenses
    const propertyTaxMonthly = calculatorState.propertyTax / 12;
    const insuranceMonthly = calculatorState.insurance / 12;
    const vacancyCost = (monthlyIncome * calculatorState.vacancyRate) / 100;
    
    let managementCost = 0;
    if (calculatorState.isFlatFee) {
      managementCost = calculatorState.managementFee;
    } else {
      managementCost = (monthlyIncome * calculatorState.managementFee) / 100;
    }
    
    const monthlyExpenses = propertyTaxMonthly + 
                           insuranceMonthly + 
                           calculatorState.maintenanceCost + 
                           vacancyCost + 
                           managementCost + 
                           mortgagePayment + 
                           calculatorState.otherExpenses;
    
    const monthlyCashFlow = monthlyIncome - monthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Calculate returns
    const closingCosts = calculatorState.propertyValue * 0.03;
    const initialInvestment = calculatorState.downPaymentAmount + closingCosts;
    
    const cashOnCashReturn = initialInvestment > 0 ? (annualCashFlow / initialInvestment) * 100 : 0;
    const netOperatingIncome = (monthlyIncome * 12) - ((propertyTaxMonthly + insuranceMonthly + calculatorState.maintenanceCost + managementCost + calculatorState.otherExpenses) * 12);
    const capRate = (netOperatingIncome / calculatorState.propertyValue) * 100;
    
    const breakEvenPoint = monthlyCashFlow > 0 ? 0 : Math.abs(annualCashFlow / monthlyCashFlow);
    
    setResults({
      monthlyIncome,
      monthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
      capRate,
      totalROI: cashOnCashReturn,
      breakEvenPoint,
      mortgagePayment
    });
  };

  const updateCalculatorState = (updates: Partial<CalculatorState>) => {
    setCalculatorState(prev => {
      const newState = { ...prev, ...updates };
      
      // Auto-calculate dependent values
      if (updates.propertyValue !== undefined || updates.downPaymentPercent !== undefined) {
        newState.downPaymentAmount = (newState.propertyValue * newState.downPaymentPercent) / 100;
      }
      
      return newState;
    });
  };

  return {
    calculatorState,
    results,
    updateCalculatorState
  };
};
