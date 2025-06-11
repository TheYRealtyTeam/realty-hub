
import React, { useState } from 'react';
import { Monitor, Users, Shield, Headphones, CheckCircle } from 'lucide-react';

const TechnologyFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-yrealty-accent" />,
      title: "Advanced Technology Stack",
      description: "AppFolio property management software, Site Audit Pro inspections, and our proprietary platform ensure seamless remote management across all states.",
      details: [
        "Real-time property monitoring",
        "Digital inspection reports",
        "Online rent collection",
        "24/7 client portal access"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-yrealty-accent" />,
      title: "Boots on the Ground Everywhere",
      description: "We always have our own trained Y Realty Team members in every state providing direct oversight and quality control. When additional support is needed, we supplement with carefully vetted third-party partners while maintaining our high standards.",
      details: [
        "Own trained team members in all 50 states",
        "Direct Y Realty oversight and control",
        "Vetted third-party support when needed",
        "Consistent quality standards nationwide"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-yrealty-accent" />,
      title: "Compliance & Legal",
      description: "State-specific legal knowledge and compliance management ensure your properties meet all local regulations and requirements.",
      details: [
        "State-specific expertise",
        "Legal compliance monitoring",
        "Local regulation updates",
        "Risk management protocols"
      ]
    },
    {
      icon: <Headphones className="h-8 w-8 text-yrealty-accent" />,
      title: "24/7 Communication",
      description: "Round-the-clock support and communication systems keep you connected to your properties no matter where you are.",
      details: [
        "24/7 emergency response",
        "Real-time notifications",
        "Mobile app access",
        "Direct communication channels"
      ]
    }
  ];

  return (
    <div className="reveal">
      <h3 className="text-3xl font-bold mb-8 text-yrealty-navy">How We Manage Nationwide</h3>
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              activeFeature === index 
                ? 'border-yrealty-accent bg-yrealty-blue/20' 
                : 'border-gray-200 bg-white hover:border-yrealty-accent/50'
            }`}
            onClick={() => setActiveFeature(index)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-yrealty-navy">{feature.title}</h4>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                {activeFeature === index && (
                  <ul className="space-y-2 animate-fade-in">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyFeatures;
