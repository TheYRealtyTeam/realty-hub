
import React from 'react';
import { Building, Search, TrendingUp } from 'lucide-react';

const TechnologyStack = () => {
  const technologies = [
    {
      icon: <Building className="h-10 w-10 text-yrealty-navy" />,
      title: "AppFolio",
      description: "Industry-leading property management software for comprehensive operations management"
    },
    {
      icon: <Search className="h-10 w-10 text-yrealty-navy" />,
      title: "Site Audit Pro",
      description: "Advanced property inspection technology with detailed reporting and photo documentation"
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-yrealty-navy" />,
      title: "Proprietary Software",
      description: "Our custom-built state-of-the-art platform for enhanced client experience and efficiency"
    }
  ];

  return (
    <div className="mt-20 reveal">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-3xl font-bold text-center mb-8 text-yrealty-navy">
          Powered by Advanced Technology
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div key={index} className="text-center">
              <div className="bg-yrealty-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                {tech.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-yrealty-navy">{tech.title}</h4>
              <p className="text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologyStack;
