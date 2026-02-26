import { HeroSection } from "@/components/sections/hero";
import { ValuePropSection } from "@/components/sections/value-prop";
import { HighlightsSection } from "@/components/sections/highlights";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { StoreInfoSection } from "@/components/sections/store-info";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropSection />
      <HighlightsSection />
      <TestimonialsSection />
      <StoreInfoSection />
    </>
  );
}
