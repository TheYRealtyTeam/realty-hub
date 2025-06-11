import React from 'react';
import { 
  Building, Home, User, ClipboardCheck, Wallet, LineChart, 
  ShieldCheck, Wrench, Calendar, Search, Handshake, PiggyBank
} from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  pricing: string;
}

const coreServices: Service[] = [
  {
    title: "Expert Tenant Placement",
    description: "Rigorous 12-point tenant screening process including credit checks, employment verification, rental history analysis, and background checks to place only the most qualified tenants.",
    icon: <User className="h-12 w-12 text-yrealty-accent" />,
    features: ["12-point screening process", "Average 3-day placement", "95% tenant retention rate", "Legal compliance guaranteed"],
    pricing: "Included in management fee"
  },
  {
    title: "Comprehensive Property Inspections",
    description: "Monthly detailed inspections using Site Audit Pro technology, identifying maintenance issues before they become costly problems and ensuring tenant compliance.",
    icon: <ClipboardCheck className="h-12 w-12 text-yrealty-accent" />,
    features: ["Monthly detailed reports", "Photo documentation", "Preventive maintenance alerts", "Code compliance monitoring"],
    pricing: "Included in management fee"
  },
  {
    title: "Advanced Rent Collection",
    description: "Automated rent collection system with online payments, late fee management, and detailed financial tracking through AppFolio integration.",
    icon: <Wallet className="h-12 w-12 text-yrealty-accent" />,
    features: ["Online payment portal", "Automated late fees", "Real-time tracking", "99.2% collection rate"],
    pricing: "No additional fees"
  },
  {
    title: "Detailed Financial Reporting",
    description: "Monthly and annual financial statements, tax documentation, expense tracking, and performance analytics accessible through our client portal 24/7.",
    icon: <LineChart className="h-12 w-12 text-yrealty-accent" />,
    features: ["Monthly statements", "Tax-ready documents", "Performance analytics", "24/7 portal access"],
    pricing: "Included in service"
  },
  {
    title: "24/7 Property Security",
    description: "Implementation of security measures, monitoring systems, emergency response protocols, and coordination with local authorities when needed.",
    icon: <ShieldCheck className="h-12 w-12 text-yrealty-accent" />,
    features: ["Emergency response", "Security system monitoring", "Local authority coordination", "Incident documentation"],
    pricing: "Custom security packages available"
  },
  {
    title: "Maintenance Management",
    description: "24/7 maintenance coordination with our vetted contractor network, preventative maintenance scheduling, and emergency response protocols.",
    icon: <Wrench className="h-12 w-12 text-yrealty-accent" />,
    features: ["24/7 emergency response", "Vetted contractor network", "Preventive scheduling", "Cost optimization"],
    pricing: "Maintenance at cost + coordination fee"
  },
  {
    title: "Professional Lease Management",
    description: "Expert lease drafting, renewal negotiations, legal compliance monitoring, and enforcement procedures to protect your investment.",
    icon: <Calendar className="h-12 w-12 text-yrealty-accent" />,
    features: ["Legal compliance", "Renewal optimization", "Lease enforcement", "Market rate analysis"],
    pricing: "Included in management"
  },
  {
    title: "Strategic Property Marketing",
    description: "Professional photography, targeted online advertising, market analysis, and vacancy minimization strategies across multiple platforms.",
    icon: <Search className="h-12 w-12 text-yrealty-accent" />,
    features: ["Professional photography", "Multi-platform advertising", "Market analysis", "Average 7-day vacancy"],
    pricing: "Marketing costs covered"
  },
  {
    title: "Dedicated Investor Relations",
    description: "Specialized support for property investors including portfolio analysis, acquisition assistance, market insights, and growth strategies.",
    icon: <Handshake className="h-12 w-12 text-yrealty-accent" />,
    features: ["Portfolio analysis", "Acquisition support", "Market insights", "Growth planning"],
    pricing: "Consultation packages available"
  },
  {
    title: "Value Enhancement Programs",
    description: "Strategic property improvements, renovation management, market positioning optimization, and ROI maximization planning.",
    icon: <PiggyBank className="h-12 w-12 text-yrealty-accent" />,
    features: ["Improvement planning", "Renovation management", "ROI optimization", "Market positioning"],
    pricing: "Included in management fee"
  }
];

export const getResidentialServices = (): Service[] => [
  {
    title: "Residential Property Management",
    description: "Comprehensive management for single-family homes, condos, and apartments with focus on maximizing rental income and maintaining property value.",
    icon: <Home className="h-12 w-12 text-yrealty-accent" />,
    features: ["Single-family homes", "Condos & apartments", "HOA coordination", "Residential compliance"],
    pricing: "8-12% of monthly rent"
  },
  ...coreServices
];

export const getCommercialServices = (): Service[] => [
  {
    title: "Commercial Property Management",
    description: "Expert management of office buildings, retail spaces, industrial properties, and mixed-use developments to maximize ROI and tenant satisfaction.",
    icon: <Building className="h-12 w-12 text-yrealty-accent" />,
    features: ["Office buildings", "Retail spaces", "Industrial properties", "Mixed-use developments"],
    pricing: "Custom commercial pricing"
  },
  ...coreServices
];
