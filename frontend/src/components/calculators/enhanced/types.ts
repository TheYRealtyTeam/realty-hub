
export interface CalculatorState {
  // Property details
  propertyValue: number;
  propertyType: string;
  location: string;
  
  // Financing
  downPaymentPercent: number;
  downPaymentAmount: number;
  interestRate: number;
  loanTerm: number;
  
  // Income & expenses
  monthlyRent: number;
  propertyTax: number;
  insurance: number;
  maintenanceCost: number;
  vacancyRate: number;
  managementFee: number;
  otherExpenses: number;
  isFlatFee: boolean;
  isYearly: boolean;
  
  // Investment goals
  holdingPeriod: number;
  targetReturn: number;
}

export interface CalculatorResults {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  totalROI: number;
  breakEvenPoint: number;
  mortgagePayment: number;
}
