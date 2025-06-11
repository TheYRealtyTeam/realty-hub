
import React from 'react';
import { TrendingUp, Clock } from 'lucide-react';

interface CaseStudy {
  title: string;
  description: string;
  metrics: string[];
  timeframe: string;
}

const CaseStudyCard = ({ study }: { study: CaseStudy }) => (
  <div className="bg-gradient-to-br from-yrealty-blue to-white p-6 rounded-xl border-l-4 border-yrealty-accent">
    <div className="flex items-start justify-between mb-4">
      <h4 className="text-xl font-bold text-yrealty-navy">{study.title}</h4>
      <div className="flex items-center gap-1 text-yrealty-accent">
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">{study.timeframe}</span>
      </div>
    </div>
    <p className="text-gray-700 mb-4">{study.description}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {study.metrics.map((metric, index) => (
        <div key={index} className="flex items-center gap-2 bg-white/70 rounded-lg p-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">{metric}</span>
        </div>
      ))}
    </div>
  </div>
);

const CaseStudies = () => {
  const caseStudies: CaseStudy[] = [
    {
      title: "10-Unit Building Filled in 12 Days",
      description: "Transformed a struggling multi-family property with 40% vacancy into a fully occupied, profitable investment.",
      metrics: ["40% to 0% vacancy", "15% rent increase", "ROI improved 22%"],
      timeframe: "12 days"
    },
    {
      title: "Commercial Property Turnaround",
      description: "Revitalized a downtown office building, securing long-term tenants and increasing property value.",
      metrics: ["3 new long-term leases", "25% revenue increase", "Property value up 18%"],
      timeframe: "3 months"
    },
    {
      title: "Portfolio Optimization Success",
      description: "Streamlined management for 50+ residential units across 3 states, dramatically improving efficiency.",
      metrics: ["Maintenance costs down 30%", "Tenant satisfaction up 40%", "Owner profits up 20%"],
      timeframe: "6 months"
    }
  ];

  return (
    <div className="mb-16 reveal">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yrealty-navy">
        Proven Success Stories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={index} study={study} />
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
