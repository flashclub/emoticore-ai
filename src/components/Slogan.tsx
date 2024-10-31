import React from "react";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  const data = {
    title: "Emotional AI",
    description: "EmotiCore is a chatbot that can generate emotional responses",
  };
  const { title, description } = data;
  return (
    <div className="relative pb-[200px]">
      <div className="absolute inset-2 bottom-0 rounded-3xl overflow-hidden ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]" />

      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          {/* Hero Content */}
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <div className="grid grid-cols-1 gap-8 items-center">
              {/* Left Content */}
              <div className="relative z-10">
                <h1 className="font-display text-center text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
                  {title}
                </h1>
                <p className="mt-8 max-w-full text-center text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
                  {description}
                </p>
                <div className="mt-4 flex flex-col justify-center items-center  gap-x-6 gap-y-4 sm:flex-row">
                  <a
                    className="inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
                    href="/bot"
                  >
                    Get started
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="absolute bottom-[-350px] right-0 left-0 m-auto flex justify-center items-center hidden md:flex w-[800px] h-[500px]  ">
                <img
                  src="/f4.png"
                  alt="EmotiCore AI"
                  className="w-full h-auto object-contain rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
