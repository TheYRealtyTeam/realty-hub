
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import AreasSection from '@/components/AreasSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AIChat from '@/components/chat/AIChat';
import AnimationObserver from '@/utils/AnimationObserver';

const Index = () => {
  useEffect(() => {
    document.title = "Y Realty Team | Premium Property Management Nationwide";
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Y Realty Team offers premium property management services across all 50 states. Expert tenant placement, maintenance coordination, and financial reporting for residential and commercial properties.';
    document.head.appendChild(metaDescription);
    
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://theYteam.co';
    document.head.appendChild(canonicalLink);
    
    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      const existingDescription = document.querySelector('meta[name="description"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
      if (existingDescription) {
        document.head.removeChild(existingDescription);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AreasSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <AIChat />
      <AnimationObserver />
    </div>
  );
};

export default Index;
