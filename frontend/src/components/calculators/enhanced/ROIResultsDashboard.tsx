
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Calendar, 
  Download, 
  Share2,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart
} from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart as RechartsBarChart, Bar } from 'recharts';
import { ROICalculatorState, ROIResults } from './types/roiTypes';
import { Link } from 'react-router-dom';

interface ROIResultsDashboardProps {
  state: ROICalculatorState;
  results: ROIResults;
}

const ROIResultsDashboard = ({ state, results }: ROIResultsDashboardProps) => {
  const getPerformanceRating = () => {
    if (results.annualizedROI >= state.targetReturn * 1.2) return { rating: 'Excellent', color: 'bg-green-500', icon: CheckCircle };
    if (results.annualizedROI >= state.targetReturn) return { rating: 'Good', color: 'bg-blue-500', icon: CheckCircle };
    if (results.annualizedROI >= state.targetReturn * 0.8) return { rating: 'Fair', color: 'bg-yellow-500', icon: AlertTriangle };
    return { rating: 'Poor', color: 'bg-red-500', icon: AlertTriangle };
  };

  const performance = getPerformanceRating();

  // Data for charts
  const investmentBreakdown = [
    { name: 'Down Payment', value: state.downPaymentAmount, color: '#3b82f6' },
    { name: 'Closing Costs', value: state.closingCosts, color: '#ef4444' },
    { name: 'Renovations', value: state.renovationCosts, color: '#f59e0b' }
  ];

  const returnsBreakdown = [
    { name: 'Cash Flow', value: Math.max(0, results.totalCashFlow), color: '#10b981' },
    { name: 'Appreciation', value: Math.max(0, results.propertyValueAtSale - state.propertyValue), color: '#8b5cf6' }
  ];

  // Cash flow projection over time
  const cashFlowProjection = Array.from({ length: state.holdingPeriod }, (_, index) => {
    const year = index + 1;
    const adjustedRent = state.monthlyRent * Math.pow(1 + (state.rentGrowthRate / 100), year - 1);
    const annualIncome = adjustedRent * 12;
    const annualExpenses = ((state.propertyTax + state.insurance) + 
                           (state.maintenanceCost * 12) + 
                           ((adjustedRent * state.vacancyRate) / 100 * 12) +
                           ((state.isFlatFee ? state.managementFee : (adjustedRent * state.managementFee) / 100) * 12) +
                           (results.mortgagePayment * 12) +
                           (state.otherExpenses * 12));
    
    return {
      year: `Year ${year}`,
      income: Math.round(annualIncome),
      expenses: Math.round(annualExpenses),
      cashFlow: Math.round(annualIncome - annualExpenses)
    };
  });

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card className="bg-gradient-to-r from-yrealty-navy to-yrealty-blue text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl">ROI Investment Analysis</span>
            <Badge className={`${performance.color} text-white`}>
              <performance.icon className="h-4 w-4 mr-1" />
              {performance.rating}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">
                {results.annualizedROI.toFixed(1)}%
              </div>
              <p className="text-sm opacity-90">Annualized ROI</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">
                {results.cashOnCashReturn.toFixed(1)}%
              </div>
              <p className="text-sm opacity-90">Cash-on-Cash Return</p>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-1 ${
                results.monthlyCashFlow >= 0 ? 'text-green-200' : 'text-red-200'
              }`}>
                ${results.monthlyCashFlow.toLocaleString()}
              </div>
              <p className="text-sm opacity-90">Monthly Cash Flow</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">
                ${results.totalROI.toFixed(0)}%
              </div>
              <p className="text-sm opacity-90">Total ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Total Investment</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${results.totalInvestment.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Initial capital required</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Property Value at Sale</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${results.propertyValueAtSale.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">After {state.holdingPeriod} years</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Total Cash Flow</span>
            </div>
            <div className={`text-2xl font-bold ${
              results.totalCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${results.totalCashFlow.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Over holding period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Projected Net Worth</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${results.projectedNetWorth.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Investment + profits</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-yrealty-accent" />
              <span>Initial Investment Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={investmentBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${Number(value).toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {investmentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(0)}`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-yrealty-accent" />
              <span>Returns Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={returnsBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${Number(value).toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {returnsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(0)}`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Projection Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Projection Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={cashFlowProjection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              <Bar dataKey="cashFlow" fill="#3b82f6" name="Net Cash Flow" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Investment Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-yrealty-accent" />
              <span>Key Investment Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Annualized ROI</span>
              <span className="font-bold text-yrealty-navy">{results.annualizedROI.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Cash-on-Cash Return</span>
              <span className="font-bold text-yrealty-navy">{results.cashOnCashReturn.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Cap Rate</span>
              <span className="font-bold text-yrealty-navy">{results.capRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Return</span>
              <span className="font-bold text-yrealty-navy">{results.totalROI.toFixed(2)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.annualizedROI < state.targetReturn && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Below Target Return</h4>
                      <p className="text-sm text-yellow-700">
                        Your projected return ({results.annualizedROI.toFixed(1)}%) is below your target ({state.targetReturn}%). Consider optimizing rent, reducing expenses, or exploring better financing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.monthlyCashFlow < 0 && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Negative Cash Flow</h4>
                      <p className="text-sm text-red-700">
                        This investment requires monthly contributions of ${Math.abs(results.monthlyCashFlow).toFixed(0)}. Ensure you have adequate reserves.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {results.annualizedROI >= state.targetReturn && results.monthlyCashFlow > 0 && (
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Excellent Investment Opportunity</h4>
                      <p className="text-sm text-green-700">
                        This property meets your target return with positive cash flow. Strong fundamentals indicate a solid investment opportunity.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-yrealty-navy">Ready to Analyze More Properties?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our investment specialists can help you find and analyze profitable investment opportunities that meet your criteria.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="bg-yrealty-navy hover:bg-yrealty-navy/90 text-white px-8 py-3">
                <Link to="/appointment">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Link>
              </Button>
              
              <Button variant="outline" className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white px-8 py-3">
                <Download className="h-4 w-4 mr-2" />
                Download Analysis
              </Button>
              
              <Button variant="outline" className="border-yrealty-navy text-yrealty-navy hover:bg-yrealty-navy hover:text-white px-8 py-3">
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
        <p>
          * This analysis is for informational purposes only and should not be considered financial advice. 
          Actual returns may vary based on market conditions, property management, and other factors.
          Consult with a qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default ROIResultsDashboard;
