
import React, { useState } from 'react';
import { Building, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ValueProposition from './services/ValueProposition';
import CaseStudies from './services/CaseStudies';
import TechnologyStack from './services/TechnologyStack';
import ServicesTabContent from './services/ServicesTabContent';

const ServicesSection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("residential");
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tabName: string) => {
    setIsLoading(true);
    setActiveTab(tabName);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Enhanced header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-yrealty-navy reveal">
            Our Comprehensive Services
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto reveal leading-relaxed">
            Elevating property management with a full suite of premium services designed 
            to maximize your property's potential and minimize your stress
          </p>
          
          <ValueProposition />
        </div>

        <CaseStudies />

        {/* Enhanced Tab Navigation */}
        <div className="w-full">
          <div className="flex justify-center mb-12">
            <div className={`${isMobile ? 'w-full' : 'w-96'} inline-flex h-auto min-h-12 items-center justify-center rounded-xl bg-gray-100 p-2 text-muted-foreground shadow-inner`}>
              <button 
                onClick={() => handleTabChange("residential")}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 text-lg font-bold transition-all duration-300
                  ${activeTab === "residential" 
                    ? "bg-white text-yrealty-navy shadow-md" 
                    : "hover:bg-white/50"}`}
              >
                <Home className="mr-3 h-6 w-6" />
                Residential
              </button>
              <button 
                onClick={() => handleTabChange("commercial")}
                className={`flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 text-lg font-bold transition-all duration-300
                  ${activeTab === "commercial" 
                    ? "bg-white text-yrealty-navy shadow-md" 
                    : "hover:bg-white/50"}`}
              >
                <Building className="mr-3 h-6 w-6" />
                Commercial
              </button>
            </div>
          </div>
          
          {/* Enhanced Tab Content */}
          <div className="mt-8 min-h-[1200px]">
            <ServicesTabContent activeTab={activeTab} isLoading={isLoading} />
          </div>
        </div>

        <TechnologyStack />

        {/* Enhanced CTA with pricing emphasis */}
        <div className="mt-20 text-center reveal">
          <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-12 rounded-2xl text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Transparent, All-Inclusive Property Management?
            </h3>
            <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto">
              Join hundreds of satisfied property owners who love our straightforward pricing with everything included. 
              Get your free consultation and discover how much you can save with our transparent approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
                Get Free Consultation
              </a>
              <a href="tel:(845)734-3331" className="btn-outline border-white text-white hover:bg-white hover:text-yrealty-navy text-lg px-8 py-4 font-bold">
                Call (845) 734-3331
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
