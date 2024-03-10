import React from "react";
import { WEBSITE_FEATURES } from "../data";

import FeatureCard from "@/components/custom/FeatureCard";
import Section from "@/components/custom/Section";

const Features = () => {
  return (
    <Section id="features" name="Features">
      <div className="grid grid-cols-1 place-content-center place-items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
        {WEBSITE_FEATURES.map((feature, index) => (
          <FeatureCard key={feature.name} {...feature} />
        ))}
      </div>
    </Section>
  );
};

export default Features;
