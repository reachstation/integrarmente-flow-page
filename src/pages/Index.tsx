
import React from 'react';
import Hero from '../components/landing/Hero';
import Problem from '../components/landing/Problem';
import Solution from '../components/landing/Solution';
import Testimonials from '../components/landing/Testimonials';
import Demo from '../components/landing/Demo';
import Pricing from '../components/landing/Pricing';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Hero />
      <Problem />
      <Solution />
      <Testimonials />
      <Demo />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
