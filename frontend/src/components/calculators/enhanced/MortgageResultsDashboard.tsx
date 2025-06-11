
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { MortgageCalculatorState, MortgageResults } from './types/mortgageTypes';

interface MortgageResultsDashboardProps {
  state: MortgageCalculatorState;
  results: MortgageResults;
}

const MortgageResultsDashboard = ({ state, results }: MortgageResultsDashboardProps) => {
  const pieData = [
    { name: 'Principal & Interest', value: results.monthlyPrincipalInterest, color: '#1f2937' },
    { name: 'Property Tax', value: results.monthlyPropertyTax, color: '#3b82f6' },
    { name: 'Insurance', value: results.monthlyInsurance, color: '#10b981' },
    { name: 'PMI', value: results.monthlyPMI, color: '#f59e0b' },
    { name: 'HOA', value: results.monthlyHOA, color: '#ef4444' }
  ].filter(item => item.value > 0);

  // Generate amortization data for first 5 years
  const generateAmortizationData = () => {
    const data = [];
    let remainingBalance = results.loanAmount;
    const monthlyRate = state.interestRate / 100 / 12;
    
    for (let year = 1; year <= Math.min(state.loanTerm, 10); year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        if (remainingBalance <= 0) break;
        
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = results.monthlyPrincipalInterest - interestPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingBalance -= principalPayment;
      }
      
      data.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(remainingBalance)
      });
    }
    
    return data;
  };

  const amortizationData = generateAmortizationData();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yrealty-navy to-yrealty-blue text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${results.totalMonthlyPayment.toFixed(0)}</div>
            <p className="text-sm opacity-90">Monthly Payment</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${results.loanAmount.toLocaleString()}</div>
            <p className="text-sm opacity-90">Loan Amount</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${results.totalInterestPaid.toLocaleString()}</div>
            <p className="text-sm opacity-90">Total Interest</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${results.totalPaymentLifetime.toLocaleString()}</div>
            <p className="text-sm opacity-90">Total of Payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${Number(value).toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(0)}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Principal vs Interest Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={amortizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="principal" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="interest" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Loan Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Home Price:</span>
                  <span className="font-medium">${state.propertyValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-medium">${state.downPaymentAmount.toLocaleString()} ({state.downPaymentPercent}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-medium">${results.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-medium">{state.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Term:</span>
                  <span className="font-medium">{state.loanTerm} years</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Payment Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Principal & Interest:</span>
                  <span className="font-medium">${results.monthlyPrincipalInterest.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Tax:</span>
                  <span className="font-medium">${results.monthlyPropertyTax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insurance:</span>
                  <span className="font-medium">${results.monthlyInsurance.toFixed(0)}</span>
                </div>
                {results.monthlyPMI > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">PMI:</span>
                    <span className="font-medium">${results.monthlyPMI.toFixed(0)}</span>
                  </div>
                )}
                {results.monthlyHOA > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">HOA Fees:</span>
                    <span className="font-medium">${results.monthlyHOA.toFixed(0)}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Monthly Payment:</span>
                  <span>${results.totalMonthlyPayment.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-yrealty-navy to-yrealty-blue text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Get Pre-Approved?</h3>
            <p className="mb-4 opacity-90">
              Our mortgage specialists can help you secure the best rates and terms for your home purchase.
            </p>
            <Button asChild variant="secondary" className="bg-white text-yrealty-navy hover:bg-gray-100">
              <Link to="/appointment">Schedule Consultation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>* This calculator provides estimates only. Actual loan terms may vary based on creditworthiness and lender requirements.</p>
        <p>* Interest rates are subject to market conditions and individual qualifications.</p>
        <p>* Consult with a qualified mortgage professional for personalized advice.</p>
      </div>
    </div>
  );
};

export default MortgageResultsDashboard;
