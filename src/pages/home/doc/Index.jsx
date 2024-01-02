import IntoLast from "./components/IntoLast";
import { IntroFeature } from "./components/IntroFeature";
import IntroHero from "./components/IntroHero";
import IntroSection from "./components/IntroSection";
import Steps from "./components/Steps";

function Index() {
  return (
    <div className="md:border-l">
      <IntroHero />
      <IntroSection />
      <Steps />
      <IntroFeature />
      <IntoLast />
    </div>
  );
}

export default Index;
