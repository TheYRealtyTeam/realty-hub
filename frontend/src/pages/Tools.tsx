
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CalculatorsSection from '@/components/CalculatorsSection';

const Tools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Property Investment Tools"
      subtitle="Free calculators and tools to help you make informed property investment decisions"
      metaDescription="Access free property investment calculators for rental income, mortgage payments, and ROI analysis. Make data-driven real estate investment decisions."
    >
      <CalculatorsSection />
    </PageLayout>
  );
};

export default Tools;
