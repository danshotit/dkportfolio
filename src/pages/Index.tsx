
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Photography from '@/components/Photography';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Photography />
      <Contact />
    </Layout>
  );
};

export default Index;
