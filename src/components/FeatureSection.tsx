const FeatureSection = ({ className = "" }) => {
  const data = {
    title: "Experience EmotiCore - The EmotiCore AI Assistant",
    description:
      "EmotiCore is an empathetic AI assistant that understands and responds to users' emotional states, creating an immersive conversational experience through unique visual feedback.",
    features: [
      {
        title: "Multi-Dimensional Emotional Analysis",
        description:
          "EmotiCore analyzes user emotions in real-time and expresses complex emotional states through a combination of colors. From calming blue to warm pink, each emotion has its unique visual representation.",
        buttonText: "Learn More",
        buttonLink: "/bot",
        image: "f1.png",
        imageAlt: "EmotiCore emotion analysis display",
        reverse: false,
      },
      {
        title: "Dynamic Energy Core Display",
        description:
          "Watch the pulsating energy core and ripple effects visually represent AI's emotional states. The core changes colors and intensity in real-time based on conversation context, creating a vivid interactive experience.",
        buttonText: "See Demo",
        buttonLink: "/bot",
        image: "f2.png",
        imageAlt: "EmotiCore energy core display",
        reverse: true,
      },
      {
        title: "Real-Time Streaming Responses",
        description:
          "Using advanced streaming technology for instant and smooth conversation feedback. The system displays typing animations and emotional transitions in real-time, making interactions more natural.",
        buttonText: "Start Chat",
        buttonLink: "/bot",
        image: "f3.png",
        imageAlt: "EmotiCore chat interface",
        reverse: false,
      },
    ],
  };
  const { title, description, features } = data;

  return (
    <section className={`py-16 sm:py-22 ${className}`}>
      <div className="mx-auto max-w-7xl text-center px-4">
        <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
        <p className="mt-8  max-w-4xl text-sm md:text-base mx-auto  text-neutral-400">
          {description}
        </p>
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col-reverse pt-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
          >
            <div
              className={`mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 ${
                feature.reverse
                  ? "lg:col-start-8 xl:col-start-9"
                  : "lg:col-start-1"
              }`}
            >
              <h3 className="text-2xl font-medium text-left ">
                {feature.title}
              </h3>
              <p className="mt-4 text-base text-left ">{feature.description}</p>
              <div className="mt-6">
                <a
                  href={feature.buttonLink}
                  className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-orange-500 text-white hover:text-slate-100 hover:bg-orange-600 active:bg-orange-500 active:text-orange-100 focus-visible:outline-orange-500"
                >
                  {feature.buttonText}
                </a>
              </div>
            </div>
            <div
              className={`flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8 ${
                feature.reverse
                  ? "lg:col-start-1 xl:col-start-1"
                  : "lg:col-start-6 xl:col-start-5"
              }`}
            >
              <div className="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg h-[400px] flex justify-center items-center">
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="object-contain h-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
