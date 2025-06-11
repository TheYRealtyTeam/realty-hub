import React from 'react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';

const FAQSection = () => {
  const faqCategories = [
    {
      id: "property-owners",
      title: "For Property Owners",
      faqs: [
        {
          question: "How do you screen potential tenants?",
          answer: "Our tenant screening process is thorough and includes background checks, credit reports, employment verification, income validation, rental history, and reference checks. We ensure only qualified tenants are placed in your property."
        },
        {
          question: "How do you handle maintenance and repairs?",
          answer: "We have our own in-house maintenance team plus a network of licensed, insured, and vetted contractors who provide quality service at competitive rates. For routine maintenance, our team handles everything without bothering you. For larger repairs, we seek your approval before proceeding, unless it's an emergency situation."
        },
        {
          question: "How often will I receive statements and payments?",
          answer: "Property owners receive detailed monthly statements showing all income and expenses. Payments are typically disbursed by the 15th of each month via direct deposit to your designated account."
        },
        {
          question: "What are your management fees?",
          answer: "Our management fees are competitive and transparent. We offer different service packages to meet varying needs and budgets. Contact us for a personalized quote based on your specific property and requirements."
        },
        {
          question: "How quickly can you fill a vacant property?",
          answer: "Our average vacancy time is significantly below market standards thanks to our proactive marketing strategies, competitive pricing, and extensive tenant network. Most properties are leased within 2-4 weeks of becoming available."
        },
        {
          question: "Do you handle evictions if necessary?",
          answer: "Yes, we handle the entire eviction process when necessary, including proper legal notices, court filings, and coordination with attorneys. We always attempt resolution first, but will protect your interests when eviction becomes unavoidable."
        },
        {
          question: "Can I still have input on important decisions about my property?",
          answer: "Absolutely! While we handle day-to-day operations, you remain the owner and have final say on major decisions. We'll consult with you on significant repairs, tenant selection criteria, and rental rate adjustments."
        }
      ]
    },
    {
      id: "tenants",
      title: "For Tenants",
      faqs: [
        {
          question: "How do I apply for a rental property?",
          answer: "You can apply online through our website or contact our office for assistance. The application process includes background and credit checks, employment verification, and rental history review."
        },
        {
          question: "How do I report maintenance issues?",
          answer: "Maintenance requests can be submitted through our tenant portal, by email, or by phone for urgent matters. Our maintenance team responds quickly to address your concerns."
        },
        {
          question: "What is your pet policy?",
          answer: "Pet policies vary by property and owner preferences. Many properties do accept pets with additional pet deposits or fees. Service animals are accommodated according to fair housing laws."
        },
        {
          question: "How do I pay my rent?",
          answer: "We offer multiple convenient payment methods including online payments through our tenant portal and bank transfers. We encourage setting up automatic payments for convenience and to avoid late fees."
        },
        {
          question: "What happens when my lease is ending?",
          answer: "We'll contact you approximately 60 days before your lease ends to discuss renewal options. If you plan to move out, we'll provide clear instructions for the move-out process and security deposit return."
        },
        {
          question: "What should I expect during the move-in process?",
          answer: "Before move-in, we'll conduct a thorough walk-through with you to document the property's condition. You'll receive keys, garage remotes, and important contact information. We'll also explain emergency procedures and maintenance request processes."
        },
        {
          question: "How are security deposits handled?",
          answer: "Security deposits are held in separate, interest-bearing accounts as required by law. Upon move-out, we'll conduct a final inspection and return your deposit within the legally required timeframe, minus any legitimate deductions for damages beyond normal wear and tear."
        },
        {
          question: "Who do I contact for emergencies?",
          answer: "For true emergencies (water leaks, electrical issues, lockouts, heating/cooling failures), we provide 24/6 emergency contact numbers. Non-emergency maintenance requests should be submitted through our tenant portal during business hours."
        }
      ]
    },
    {
      id: "investors",
      title: "For Real Estate Investors",
      faqs: [
        {
          question: "Can you help me identify good investment properties?",
          answer: "Yes, our team has extensive knowledge of real estate markets and can help you identify properties with good investment potential based on your financial goals and risk tolerance."
        },
        {
          question: "Do you work with out-of-state property owners?",
          answer: "Absolutely! Many of our clients are out-of-state or even international investors. Our comprehensive management services allow you to invest in real estate markets nationwide without needing to be physically present."
        },
        {
          question: "What's your average property vacancy rate?",
          answer: "Our properties typically experience vacancy rates significantly below market averages thanks to our proactive marketing, competitive pricing strategies, and high tenant retention rates."
        },
        {
          question: "How do you determine optimal rental rates?",
          answer: "We conduct thorough market analyses to determine competitive rental rates that maximize your income while minimizing vacancy periods. Our pricing strategy considers property features, location, market trends, and seasonal factors."
        },
        {
          question: "What makes your property management services different from others?",
          answer: "We distinguish ourselves through personalized service, transparent communication, proactive maintenance, rigorous tenant screening, and leveraging technology to streamline operations and provide real-time information to property owners."
        },
        {
          question: "Do you provide market analysis and investment consultation?",
          answer: "Yes, we offer comprehensive market analysis reports and investment consultation services. Our team can help you evaluate potential acquisitions, assess portfolio performance, and develop long-term investment strategies."
        },
        {
          question: "How do you handle multiple properties for one investor?",
          answer: "We excel at managing investor portfolios of all sizes. You'll receive consolidated reporting, streamlined communication, and volume discounts when applicable. Our technology platform makes it easy to track performance across your entire portfolio."
        },
        {
          question: "What technology tools do you use for property management?",
          answer: "We use cutting-edge property management software that provides real-time access to financial reports, maintenance tracking, tenant communications, and market data. Property owners can access their dashboard 24/7 through our online portal."
        }
      ]
    },
    {
      id: "general",
      title: "General Questions",
      faqs: [
        {
          question: "What areas does Y Realty Team serve?",
          answer: "We provide property management services across multiple markets nationwide. Contact us to confirm coverage in your specific area and learn about our local market expertise."
        },
        {
          question: "How long has Y Realty Team been in business?",
          answer: "Y Realty Team has years of experience in property management and real estate services. Our team combines industry expertise with innovative technology to deliver superior results for our clients."
        },
        {
          question: "How do I get started with Y Realty Team?",
          answer: "Getting started is easy! Contact us for a free consultation where we'll discuss your needs, explain our services, and provide a customized proposal. You can reach us through our website, phone, or email."
        },
        {
          question: "Do you offer any guarantees on your services?",
          answer: "We stand behind our work with service guarantees and are committed to client satisfaction. If you're not completely satisfied with our services, we'll work with you to resolve any concerns promptly."
        }
      ]
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12">
          {faqCategories.map((category) => (
            <div key={category.id} className="reveal">
              <h2 className="text-2xl font-bold mb-6 text-yrealty-navy border-b pb-2">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`${category.id}-item-${index}`} className="border rounded-lg p-1">
                    <AccordionTrigger className="px-4 text-left font-medium text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
