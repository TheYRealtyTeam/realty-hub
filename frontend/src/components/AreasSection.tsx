
import React from 'react';
import TechnologyFeatures from './areas/TechnologyFeatures';
import ProcessSteps from './areas/ProcessSteps';
import TeamPresence from './areas/TeamPresence';
import TechnologyShowcase from './areas/TechnologyShowcase';
import StatesCoverage from './areas/StatesCoverage';
import CommitmentSection from './areas/CommitmentSection';

const AreasSection = () => {
  return (
    <section id="areas" className="section-padding bg-gradient-to-b from-white to-yrealty-blue/5">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yrealty-navy reveal">
            Nationwide Excellence, Local Expertise
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto reveal leading-relaxed">
            Managing properties across all 50 states with our own trained team members on the ground, 
            cutting-edge technology, and personalized service that delivers results everywhere.
          </p>
        </div>

        {/* Technology & Process Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <TechnologyFeatures />
          <ProcessSteps />
        </div>

        {/* Enhanced Team Presence Section */}
        <TeamPresence />

        {/* Technology Stack Showcase */}
        <TechnologyShowcase />

        {/* States Coverage */}
        <StatesCoverage />

        {/* Guarantees & Commitments */}
        <CommitmentSection />
      </div>
    </section>
  );
};

export default AreasSection;
