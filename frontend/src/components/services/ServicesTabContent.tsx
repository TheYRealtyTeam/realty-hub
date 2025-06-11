
import React from 'react';
import { Loader } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { getResidentialServices, getCommercialServices } from './servicesData';

interface ServicesTabContentProps {
  activeTab: string;
  isLoading: boolean;
}

const ServicesTabContent = ({ activeTab, isLoading }: ServicesTabContentProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="h-12 w-12 text-yrealty-accent animate-spin" />
      </div>
    );
  }

  const services = activeTab === "residential" ? getResidentialServices() : getCommercialServices();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <ServiceCard 
          key={`${activeTab}-${index}`} 
          title={service.title} 
          description={service.description} 
          icon={service.icon} 
          features={service.features}
          pricing={service.pricing}
        />
      ))}
    </div>
  );
};

export default ServicesTabContent;
