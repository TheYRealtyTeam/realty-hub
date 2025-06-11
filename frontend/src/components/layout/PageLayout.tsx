
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/utils/AnimationObserver';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  metaDescription?: string;
  className?: string;
}

const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  metaDescription,
  className = '' 
}: PageLayoutProps) => {
  
  // Set page title and meta description
  useEffect(() => {
    // Set page title
    document.title = `${title} | Y Realty Team`;
    
    // Add meta description if provided
    if (metaDescription) {
      const metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = metaDescription;
      document.head.appendChild(metaDesc);
      
      return () => {
        const existingDesc = document.querySelector('meta[name="description"]');
        if (existingDesc) {
          document.head.removeChild(existingDesc);
        }
      };
    }
  }, [title, metaDescription]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-28 md:pt-32 pb-8 md:pb-12 bg-yrealty-blue">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-yrealty-navy text-center">{title}</h1>
            {subtitle && (
              <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <section className={`section-padding bg-white ${className}`}>
          <div className="container-custom">
            {children}
          </div>
        </section>
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default PageLayout;
