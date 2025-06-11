
import { useState, useEffect } from 'react';

interface RentalCalculatorState {
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
}

interface CalculationResults {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
}

export const useRentalCalculations = (state: RentalCalculatorState) => {
  const [results, setResults] = useState<CalculationResults>({
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    cashOnCashReturn: 0
  });

  useEffect(() => {
    calculateResults();
  }, [state]);

  const calculateResults = () => {
    // Calculate monthly income
    const monthlyIncome = state.isYearly ? state.monthlyRent / 12 : state.monthlyRent;
    
    // Calculate monthly expenses
    const propertyTaxMonthly = state.propertyTax / 12;
    const insuranceMonthly = state.insurance / 12;
    const maintenanceCost = state.maintenanceCost;
    const vacancyCost = (monthlyIncome * state.vacancyRate) / 100;
    
    // Calculate management fee based on type (percentage or flat)
    let managementCost = 0;
    if (state.isFlatFee) {
      managementCost = state.managementFee;
    } else {
      managementCost = (monthlyIncome * state.managementFee) / 100;
    }
    
    const otherExpenses = state.otherExpenses;
    
    const monthlyExpenses = propertyTaxMonthly + 
                           insuranceMonthly + 
                           maintenanceCost + 
                           vacancyCost + 
                           managementCost + 
                           state.mortgagePayment + 
                           otherExpenses;
    
    // Calculate cash flow
    const monthlyCashFlow = monthlyIncome - monthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Using the calculated down payment for cash on cash return calculation
    const closingCosts = state.propertyValue * 0.03;
    const initialInvestment = state.downPaymentAmount + closingCosts;
    
    const cashOnCashReturn = initialInvestment > 0 ? (annualCashFlow / initialInvestment) * 100 : 0;
    
    setResults({
      monthlyIncome,
      monthlyExpenses,
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn
    });
  };

  return results;
};
