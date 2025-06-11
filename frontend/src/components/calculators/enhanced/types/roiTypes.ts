
export interface ROICalculatorState {
  // Investment Details
  propertyValue: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  closingCosts: number;
  renovationCosts: number;
  
  // Income Projections
  monthlyRent: number;
  annualAppreciation: number;
  rentGrowthRate: number;
  
  // Operating Expenses
  propertyTax: number;
  insurance: number;
  maintenanceCost: number;
  vacancyRate: number;
  managementFee: number;
  otherExpenses: number;
  isFlatFee: boolean;
  
  // Investment Timeline
  holdingPeriod: number;
  targetReturn: number;
  interestRate: number;
  loanTerm: number;
}

export interface ROIResults {
  totalInvestment: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  propertyValueAtSale: number;
  equityAtSale: number;
  totalROI: number;
  annualizedROI: number;
  capRate: number;
  cashOnCashReturn: number;
  breakEvenPoint: number;
  mortgagePayment: number;
  projectedNetWorth: number;
}
