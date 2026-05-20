import HeroSection from "@/components/layout/HeroSection";
import HeroMockup from "@/components/layout/HeroMockup";
import FeatureSection from "@/components/layout/FeatureSection";
import CTASection from "@/components/layout/CtaSection";
import TextReveal from "@/components/layout/Textreveal";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroMockup />
      <TextReveal />
      <FeatureSection />
      <CTASection />

    </>
  );
}
