
import React from 'react';
import { CheckCircle } from 'lucide-react';

const ValueProposition = () => {
  const includedFeatures = [
    "No Setup Fees",
    "No Marketing Costs", 
    "No Inspection Fees",
    "No Technology Fees",
    "No Placement Fees",
    "No Renewal Fees",
    "No Administrative Fees",
    "No Hidden Costs"
  ];

  return (
    <div className="bg-gradient-to-r from-yrealty-accent to-yrealty-navy p-8 rounded-2xl max-w-5xl mx-auto reveal text-white">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">
        ONE Simple Price - EVERYTHING Included
      </h3>
      <p className="text-lg md:text-xl opacity-95 mb-6">
        Unlike other property management companies that nickel and dime you with add-on fees, Y Realty Team includes <span className="font-bold">EVERYTHING</span> in one transparent management fee. Our comprehensive price covers ALL services, technology, inspections, marketing, and support with absolutely NO hidden costs or surprise charges.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-base mb-6">
        {includedFeatures.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="bg-white/20 p-4 rounded-lg">
        <p className="text-lg font-bold">
          What you pay for maintenance = Actual contractor cost
        </p>
        <p className="text-sm opacity-90 mt-1">
          We pass through maintenance costs at exact invoice price with no markups, no coordination fees, and no inflated charges.
        </p>
      </div>
    </div>
  );
};

export default ValueProposition;
