
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  pricing: string;
}

const ServiceCard = ({ title, description, icon, features, pricing }: ServiceCardProps) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yrealty-accent/30">
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-yrealty-navy">{title}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    
    <div className="mb-6">
      <h4 className="font-bold text-yrealty-navy mb-3">Key Features:</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="border-t pt-4">
      <p className="text-sm font-medium text-yrealty-accent">{pricing}</p>
    </div>
  </div>
);

export default ServiceCard;
