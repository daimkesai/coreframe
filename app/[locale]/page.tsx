import Hero from '@/components/sections/Hero';
import ValueProp from '@/components/sections/ValueProp';
import Problem from '@/components/sections/Problem';
import Services from '@/components/sections/Services';
import CaseStudy from '@/components/sections/CaseStudy';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProp />
      <Problem />
      <Services />
      <CaseStudy />
      <HowItWorks />
      <FAQ />
      <CTA />
    </>
  );
}
