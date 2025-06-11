
import React from 'react';
import { CheckCircle } from 'lucide-react';

const TeamPresence = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-20 reveal">
      <h3 className="text-3xl font-bold text-center mb-8 text-yrealty-navy">
        Our Team Advantage Across America
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h4 className="text-2xl font-bold mb-4 text-yrealty-navy">Always Boots on the Ground</h4>
          <p className="text-gray-600 mb-6 leading-relaxed">
            What sets Y Realty Team apart is our commitment to having our own trained team members 
            in every state. We don't just rely on third-party management companies like others do. 
            Our approach ensures direct oversight, consistent quality control, and accountability 
            because you're working with Y Realty Team directly, not a middleman.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Primary:</strong> Our own Y Realty Team members in all 50 states</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Direct oversight:</strong> No middleman, you work with us directly</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Additional support:</strong> Vetted third-party partners when needed</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span><strong>Quality assurance:</strong> Consistent Y Realty standards nationwide</span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-yrealty-blue to-yrealty-accent/20 p-8 rounded-xl">
          <h5 className="text-xl font-bold mb-4 text-yrealty-navy">The Y Realty Difference</h5>
          <div className="space-y-4">
            <div className="bg-white/80 p-4 rounded-lg">
              <h6 className="font-bold text-yrealty-navy mb-2">Other Companies:</h6>
              <p className="text-sm text-gray-600">Rely primarily on third-party local companies with minimal oversight</p>
            </div>
            <div className="bg-yrealty-accent text-white p-4 rounded-lg">
              <h6 className="font-bold mb-2">Y Realty Team:</h6>
              <p className="text-sm">Our own trained team members provide direct service with third-party support as needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPresence;
