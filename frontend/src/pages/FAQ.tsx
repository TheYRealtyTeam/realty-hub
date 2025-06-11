
import React, { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import FAQSection from '@/components/FAQSection';

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout 
      title="Frequently Asked Questions"
      subtitle="Find answers to the most common questions about property management services"
      metaDescription="Get answers to common questions about Y Realty Team's property management services. Learn about tenant screening, maintenance, fees, and more."
    >
      <FAQSection />
    </PageLayout>
  );
};

export default FAQ;
