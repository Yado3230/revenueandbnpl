import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Section from "./components/Section";

function Landing() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Features />
      <Section />
      <Contact />
    </div>
  );
}

export default Landing;
