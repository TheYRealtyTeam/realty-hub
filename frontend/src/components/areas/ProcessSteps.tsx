
import React from 'react';

const ProcessSteps = () => {
  const processSteps = [
    {
      step: "1",
      title: "Property Assessment",
      description: "Remote and local evaluation using Site Audit Pro technology and local experts"
    },
    {
      step: "2", 
      title: "Market Analysis",
      description: "Local market research and competitive pricing analysis for optimal positioning"
    },
    {
      step: "3",
      title: "Team Assignment",
      description: "Dedicated local support team assigned with regional expertise and connections"
    },
    {
      step: "4",
      title: "Technology Setup",
      description: "AppFolio integration and proprietary platform configuration for your property"
    },
    {
      step: "5",
      title: "Ongoing Management",
      description: "Continuous monitoring, reporting, and optimization with 24/7 support"
    }
  ];

  return (
    <div className="reveal">
      <h3 className="text-3xl font-bold mb-8 text-yrealty-navy">Our Process</h3>
      <div className="space-y-4">
        {processSteps.map((step, index) => (
          <div key={index} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex-shrink-0 w-12 h-12 bg-yrealty-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
              {step.step}
            </div>
            <div>
              <h4 className="text-lg font-bold mb-1 text-yrealty-navy">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
