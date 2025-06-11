
import { useState } from 'react';

interface ROIState {
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
}

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

export const useROICalculations = (sharedState: ROIState) => {
  const [results, setResults] = useState<ROIResults>({
    totalInvestment: 0,
    monthlyCashFlow: 0,
    annualCashFlow: 0,
    totalCashFlow: 0,
    propertyValueAtSale: 0,
    equityAtSale: 0,
    totalROI: 0,
    annualizedROI: 0
  });
  
  const [showResults, setShowResults] = useState(false);

  const calculateResults = () => {
    // Calculate total initial investment
    const totalInvestment = sharedState.downPaymentAmount + sharedState.closingCosts + sharedState.renovationCosts;
    
    // Calculate monthly expenses for cash flow
    const monthlyRent = sharedState.monthlyRent;
    const propertyTaxMonthly = sharedState.propertyTax / 12;
    const insuranceMonthly = sharedState.insurance / 12;
    const maintenanceCost = sharedState.maintenanceCost;
    const vacancyCost = (monthlyRent * sharedState.vacancyRate) / 100;
    
    // Calculate management fee based on type (percentage or flat)
    let managementCost = 0;
    if (sharedState.isFlatFee) {
      managementCost = sharedState.managementFee; // Flat fee is already a monthly amount
    } else {
      managementCost = (monthlyRent * sharedState.managementFee) / 100; // Percentage of rent
    }
    
    const totalMonthlyExpenses = propertyTaxMonthly + 
                              insuranceMonthly + 
                              maintenanceCost + 
                              vacancyCost + 
                              managementCost + 
                              sharedState.mortgagePayment + 
                              sharedState.otherExpenses;
    
    // Calculate monthly and annual cash flow
    const monthlyCashFlow = monthlyRent - totalMonthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Calculate total cash flow over holding period
    const totalCashFlow = annualCashFlow * sharedState.holdingPeriod;
    
    // Calculate property value after appreciation
    const propertyValueAtSale = sharedState.propertyValue * Math.pow(1 + (sharedState.annualAppreciation / 100), sharedState.holdingPeriod);
    
    // Calculate equity at sale
    // Loan amount = purchase price - down payment
    const loanAmount = sharedState.propertyValue - sharedState.downPaymentAmount;
    
    // Calculate monthly rate from annual rate
    const monthlyRate = (sharedState.interestRate / 100) / 12;
    const numberOfPayments = 30 * 12; // Assuming 30-year loan
    
    // Calculate monthly payment
    const monthlyPayment = loanAmount * 
                          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate remaining loan balance after holding period
    let remainingBalance = loanAmount;
    for (let i = 0; i < sharedState.holdingPeriod * 12; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
    }
    
    // Equity at sale = property value - remaining loan balance
    const equityAtSale = propertyValueAtSale - remainingBalance;
    
    // Calculate total profit
    const totalProfit = equityAtSale - sharedState.downPaymentAmount + totalCashFlow;
    
    // Calculate total ROI percentage
    const totalROI = (totalProfit / totalInvestment) * 100;
    
    // Calculate annualized ROI
    const annualizedROI = Math.pow(1 + (totalROI / 100), 1 / sharedState.holdingPeriod) - 1;
    
    setResults({
      totalInvestment,
      monthlyCashFlow,
      annualCashFlow,
      totalCashFlow,
      propertyValueAtSale,
      equityAtSale,
      totalROI,
      annualizedROI: annualizedROI * 100
    });
    
    setShowResults(true);
  };

  return {
    results,
    showResults,
    calculateResults
  };
};
