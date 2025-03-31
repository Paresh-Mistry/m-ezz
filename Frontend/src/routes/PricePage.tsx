import React, { useEffect, useContext } from "react";
import PriceCard from "../components/PriceCard";
import Layoutwrap from "../Layout/Layoutwrap";
import { context } from "../Layout/Context";

const PricePage: React.FC = () => {
  const { theme } = useContext(context);
  const isLight = theme === "light";

  useEffect(() => {
    document.title = "Pricing";
  }, []);

  const plans = [
    { title: "Hobby", price: "$9", features: ["25 products", "Up to 10,000 subscribers", "Advanced analytics", "24-hour support response time"] },
    { title: "Pro", price: "$29", features: ["Unlimited products", "Priority support", "Advanced insights", "Dedicated account manager"] },
    { title: "Enterprise", price: "Custom", features: ["Custom integrations", "Dedicated support team", "Unlimited resources", "SLA guarantee"] },
  ];

  return (
    <Layoutwrap>
      <div
        className={`relative isolate px-6 py-6 md:py-18 lg:px-8 mx-auto overflow-y-auto`}
      >
        <header className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-5xl">
            Choose the right plan for you
          </p>
        </header>
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PriceCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </Layoutwrap>
  );
};

export default PricePage;
