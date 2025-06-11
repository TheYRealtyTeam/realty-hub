
import React from 'react';

const StatesCoverage = () => {
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  return (
    <div className="text-center mb-16 reveal">
      <h3 className="text-3xl font-bold mb-8 text-yrealty-navy">
        Operating in All 50 States
      </h3>
      <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
        From coast to coast, we provide the same exceptional level of service and expertise. 
        Our nationwide presence ensures consistent quality regardless of your property location.
      </p>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 text-sm">
          {states.map((state, index) => (
            <div key={index} className="p-2 bg-yrealty-blue/10 rounded text-yrealty-navy font-medium hover:bg-yrealty-accent hover:text-white transition-colors cursor-default">
              {state}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatesCoverage;
