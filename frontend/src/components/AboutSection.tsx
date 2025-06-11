
import React, { useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-yrealty-blue to-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title reveal">About Y Realty Team</h2>
          <p className="section-subtitle reveal">Committed to excellence in property management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="relative">
              <img 
                src="/lovable-uploads/4aab176d-95ee-4ae9-bda7-892530d680f6.png"
                alt="Historic luxury apartment building with green copper roof" 
                className="rounded-lg shadow-lg w-full" 
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-yrealty-navy font-heading font-bold">Driven By</p>
                <p className="text-yrealty-accent font-heading text-xl font-bold">Excellence</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-yrealty-navy reveal">America's Premier Property Management Company</h3>
            <p className="mb-6 text-gray-700 reveal">
              Y Realty Team is committed to providing exceptional property management services across all 50 states. 
              Our team understands the unique challenges of diverse real estate markets nationwide and offers 
              tailored solutions to property owners, investors, and tenants.
            </p>
            <p className="mb-6 text-gray-700 reveal stagger-1">
              We leverage cutting-edge technology and industry best practices to maximize your property's 
              potential while minimizing stress and hassle. Our approach is built on transparency, integrity, and results.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {['Transparent Management', 'Nationwide Coverage', 'Dedicated Support', 'Market-Leading Results'].map((item, index) => (
                <div key={index} className="flex items-center reveal" style={{ transitionDelay: `${0.3 + index * 0.1}s` }}>
                  <CheckCircle className="h-5 w-5 text-yrealty-accent mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            <a href="#services" className="btn-primary reveal stagger-5">Learn More About Our Services</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
