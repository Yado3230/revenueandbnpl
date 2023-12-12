import IntroHero from "./IntroHero";
import IntroSection from "./IntroSection";
import IntroLast from "./IntoLast";
import Steps from "./Steps";
import { IntroFeature } from "./IntroFeature";

function Itro() {
  return (
    <>
      <div className="md:mt-24 md:mx-24">
        <IntroHero />
        <IntroSection />
        <Steps />
        <IntroFeature />
        <IntroLast />
      </div>
    </>
  );
}

export default Itro;
