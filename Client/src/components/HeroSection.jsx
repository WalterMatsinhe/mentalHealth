import { ArrowDown } from "lucide-react";
import React from "react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
  <section id="hero" className="relative flex flex-col items-center justify-center py-30 px-4 text-center overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-8xl max-h-8xl items-center justify-center gap-1 overflow-hidden">
        {/* Left Column */}
        <div className="flex-1 items-center justify-center z-10 max-w-2xl mx-auto py-19 mt-5">
          <BoxReveal boxColor={"hsl(var(--primary))"} duration={2.5}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-primary-font mb-6 drop-shadow-lg">
              Prioritize Your <span className="text-primary">Mental Health</span>
            </h1>
          </BoxReveal>
          <BoxReveal boxColor={"white"} duration={3.5}>
            <p className="text-lg md:text-2xl text-primary-font max-w-2xl mb-8 mx-auto">
              Your mind matters. Take a step towards a healthier, happier you. Explore resources, tips, and support to nurture your mental well-being every day.
            </p>
          </BoxReveal>
          <InteractiveHoverButton>
           <Link
              className="inline-block px-8 py-3  dark:bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 dark:hover:bg-purple-700 transition-colors duration-200"
              to="/auth/register"
            >
              Get Started
            </Link>
          </InteractiveHoverButton>
        </div>
        {/* Right Column (empty for now, add content here) */}
        <div className="flex-1 flex items-center justify-center">
          <img 
            src="/hero.png" 
            alt="Mental Health Illustration" 
            className="w-full max-w-3xl rounded-xl shadow-2xl object-cover" 
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-3 animate-bounce">
        <span className="text-sm text-muted-foreground">scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;