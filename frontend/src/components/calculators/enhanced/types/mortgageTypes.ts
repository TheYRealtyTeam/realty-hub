
export interface MortgageCalculatorState {
  // Loan Details
  propertyValue: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  
  // Loan Terms
  interestRate: number;
  loanTerm: number;
  
  // Additional Costs
  propertyTax: number;
  insurance: number;
  pmi: number;
  hoaFees: number;
  
  // Property Type
  propertyType: string;
  location: string;
}

export interface MortgageResults {
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalPaymentLifetime: number;
  totalInterestPaid: number;
  loanAmount: number;
  monthlyPaymentBreakdown: {
    principal: number;
    interest: number;
    taxes: number;
    insurance: number;
    pmi: number;
    hoa: number;
  };
}
