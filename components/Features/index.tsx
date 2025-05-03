import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Plan & Prepare"
            paragraph="Before you jump into any career path, it's important to have a clear plan.
             This is where you set your goals, explore your options, and create a roadmap for your future.
              Whether you want to go to university, learn a trade, or start working,
              we’ll help you break your big dreams into realistic, step-by-step actions. 
              The better you prepare now, the smoother your journey will be later.

"
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
