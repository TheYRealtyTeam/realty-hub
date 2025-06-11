import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp, MapPin } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      name: "Michael Thompson",
      role: "Property Owner, Manhattan",
      location: "New York",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      text: "Y Realty Team has completely transformed how I manage my properties. Their attention to detail and proactive approach has increased my rental income by 15% while reducing vacancies to practically zero. The technology they use keeps me informed in real-time, and I couldn't be happier with their service.",
      results: "15% income increase, 0% vacancy"
    },
    {
      name: "Sarah Johnson",
      role: "Commercial Investor",
      location: "California",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      text: "As an out-of-state investor with properties across multiple states, I needed a management company I could trust completely. The Y Realty Team has exceeded my expectations in every way. They treat my properties as if they were their own, and their financial reporting is exceptionally transparent and detailed.",
      results: "Multi-state portfolio success"
    },
    {
      name: "David Chen",
      role: "Apartment Building Owner",
      location: "Brooklyn, NY",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      stars: 5,
      text: "I've worked with several property management companies over the years, and Y Realty Team stands head and shoulders above the rest. Their responsiveness, professionalism, and attention to detail are unmatched. They filled my 12-unit building in just 8 days after months of struggle with the previous company.",
      results: "12 units filled in 8 days"
    },
    {
      name: "Emma Rodriguez",
      role: "Residential Landlord",
      location: "Texas",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      stars: 5,
      text: "Switching to Y Realty Team was the best decision I've made for my rental properties. They found qualified tenants quickly, handle all maintenance issues promptly, and their online portal makes it easy to track everything. My stress levels have dropped dramatically while my profits have increased.",
      results: "Stress-free management, higher profits"
    },
    {
      name: "Robert Kim",
      role: "Multi-Family Property Owner",
      location: "Florida",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      stars: 5,
      text: "The Y Realty Team's expertise in multi-family properties is outstanding. They transformed my struggling 20-unit complex into a thriving investment. Their tenant screening process is thorough, and they've maintained 98% occupancy for over two years running.",
      results: "98% occupancy maintained"
    },
    {
      name: "Jennifer Walsh",
      role: "Real Estate Investor",
      location: "Colorado",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      stars: 5,
      text: "What sets Y Realty Team apart is their proactive approach and use of technology. I get detailed monthly reports, real-time maintenance updates, and their preventive maintenance program has saved me thousands in major repairs. They're true partners in my investment success.",
      results: "Thousands saved in repairs"
    },
    {
      name: "James Patterson",
      role: "Commercial Property Executive",
      location: "Illinois",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face",
      stars: 5,
      text: "As an executive managing a portfolio of commercial properties, I need a partner who understands the complexities of commercial real estate. Y Realty Team delivers exceptional service with their professional approach and comprehensive reporting. They've increased our NOI by 12% across our entire portfolio.",
      results: "12% NOI increase across portfolio"
    },
    {
      name: "Victoria Sterling",
      role: "Investment Fund Manager",
      location: "New York",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
      stars: 5,
      text: "Managing institutional-grade properties requires precision and expertise. Y Realty Team has proven themselves as the premier choice for our fund's real estate investments. Their technology platform provides the transparency and data analytics we need for informed decision-making.",
      results: "Institutional-grade management"
    },
    {
      name: "Alexander Brooks",
      role: "Corporate Real Estate Director",
      location: "California",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=face",
      stars: 5,
      text: "Our corporate real estate portfolio spans multiple states, and Y Realty Team has been instrumental in streamlining our operations. Their professional team handles everything from lease negotiations to maintenance coordination with remarkable efficiency. We've seen a 20% reduction in operational costs.",
      results: "20% operational cost reduction"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToTestimonial = (index) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-white via-yrealty-blue/10 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yrealty-navy reveal">Client Success Stories</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto reveal leading-relaxed">
            Don't just take our word for it - hear what our satisfied clients have to say
            about their experience with Y Realty Team and the results they've achieved
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 reveal">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-yrealty-navy">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-bold text-yrealty-navy">500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
              <MapPin className="h-5 w-5 text-yrealty-accent" />
              <span className="font-bold text-yrealty-navy">All 50 States</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className={`bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            <div className="absolute top-8 right-8">
              <Quote className="h-16 w-16 text-yrealty-accent opacity-20" />
            </div>
            
            <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
              <div className="flex-shrink-0">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="w-24 h-24 rounded-full border-4 border-yrealty-accent object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yrealty-navy mb-1">{testimonials[activeIndex].name}</h3>
                    <p className="text-lg text-gray-600 mb-2">{testimonials[activeIndex].role}</p>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{testimonials[activeIndex].location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex mb-2">
                      {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {testimonials[activeIndex].results}
                    </div>
                  </div>
                </div>

                <blockquote className="text-xl md:text-2xl italic text-gray-700 leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </blockquote>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevTestimonial} 
              disabled={isAnimating}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-yrealty-navy hover:text-white transition-all duration-300 disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isAnimating}
                  className={`transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 h-3 bg-yrealty-navy rounded-full' 
                      : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-yrealty-accent'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial} 
              disabled={isAnimating}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-yrealty-navy hover:text-white transition-all duration-300 disabled:opacity-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Additional testimonial highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-yrealty-accent mb-2">15%</div>
              <div className="text-lg font-medium text-yrealty-navy mb-1">Average Income Increase</div>
              <div className="text-gray-600 text-sm">Clients see significant returns</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-yrealty-accent mb-2">7 Days</div>
              <div className="text-lg font-medium text-yrealty-navy mb-1">Average Vacancy Period</div>
              <div className="text-gray-600 text-sm">Faster than industry standard</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-yrealty-accent mb-2">98%</div>
              <div className="text-lg font-medium text-yrealty-navy mb-1">Client Retention Rate</div>
              <div className="text-gray-600 text-sm">Long-term partnerships</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 reveal">
          <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-lg mb-6 opacity-95">
              See how Y Realty Team can transform your property investment experience and maximize your returns.
            </p>
            <a href="#contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
              Get Your Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
