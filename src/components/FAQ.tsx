import React from "react";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <div className="flex flex-col">
    <h3 className="text-xl font-semibold">{question}</h3>
    <p className="mt-4 text-base">{answer}</p>
    <hr className="w-full mt-4 border-gray-400" />
  </div>
);

const FAQSection = () => {
  const content = {
    title: "EmotiCore FAQ",
    subtitle:
      "Everything you need to know about EmotiCore - Your Emotional AI Assistant",
    supportEmail: "laughingliangcl@gmail.com",
    faqs: [
      {
        question: "What is EmotiCore and how does it work?",
        answer:
          "EmotiCore is an advanced emotional AI assistant that uses energy and emotions rather than traditional computing. It analyzes user messages in real-time, understanding emotional context and responding with appropriate emotional energy displayed through a dynamic color-changing core.",
      },
      {
        question: "What do the different colors mean in EmotiCore?",
        answer:
          "EmotiCore uses seven distinct colors to express emotions: blue (calm/thoughtful), pink (caring/warm), gold (joy/creative), purple (curious/mysterious), green (healing/balance), red (passionate/excited), and white (pure/clear). The core can display multiple colors simultaneously to represent complex emotional states.",
      },
      {
        question: "How accurate is EmotiCore's emotional analysis?",
        answer:
          "EmotiCore uses advanced GPT-4 technology to analyze emotional context in messages. It can detect multiple emotions simultaneously and express them through varying color intensities, with the total intensity always summing up to 100% for accurate emotional representation.",
      },
      {
        question: "Can EmotiCore handle multiple emotions at once?",
        answer:
          "Yes, EmotiCore can process and display up to three primary emotions simultaneously. These are shown through both the color combinations in the energy core and the intensity percentages displayed in the emotion indicator.",
      },
      {
        question: "How does the real-time streaming response work?",
        answer:
          "EmotiCore uses advanced streaming technology to provide immediate feedback. As you chat, you'll see typing indicators, gradual message appearance, and smooth emotional transitions in the energy core, creating a more natural and engaging conversation flow.",
      },
      {
        question: "Is my conversation with EmotiCore private?",
        answer:
          "Yes, EmotiCore prioritizes user privacy. All conversations are processed securely, and no personal data is stored permanently. Each session is independent and secure.",
      },
      {
        question: "Can I customize EmotiCore's emotional responses?",
        answer:
          "Currently, EmotiCore automatically adjusts its emotional responses based on the context of your conversation. While direct customization isn't available, the system naturally adapts to your communication style over time.",
      },
      {
        question: "How does the Energy Core Display work?",
        answer:
          "The Energy Core Display is a visual representation of EmotiCore's emotional state. It features a central pulsating core that changes colors based on emotions, surrounded by animated ripple effects. The intensity and color combinations reflect the current emotional context of the conversation.",
      },
      {
        question: "What makes EmotiCore different from other chatbots?",
        answer:
          "EmotiCore stands out through its unique emotional intelligence system, visual feedback through the energy core, and ability to process multiple emotions simultaneously. Unlike traditional chatbots, it provides a more empathetic and visually engaging conversation experience.",
      },
      {
        question: "Can EmotiCore be used for professional purposes?",
        answer:
          "Yes, EmotiCore can be valuable in professional settings where emotional intelligence is important, such as customer service, counseling support, or user experience research. Its ability to understand and respond to emotional context makes it suitable for various professional applications.",
      },
      {
        question: "How does EmotiCore handle complex emotional situations?",
        answer:
          "EmotiCore can analyze and respond to complex emotional situations by combining multiple emotional states with varying intensities. It provides nuanced responses that reflect the complexity of human emotions, supported by visual feedback through its energy core.",
      },
      {
        question: "What platforms is EmotiCore available on?",
        answer:
          "EmotiCore is available as a web-based application, accessible through modern web browsers on both desktop and mobile devices. This ensures consistent experience across different platforms while maintaining full functionality.",
      },
      {
        question: "How can I get the best experience with EmotiCore?",
        answer:
          "For the best experience, be open and expressive in your communication. EmotiCore responds well to natural language and emotional context. Pay attention to the energy core's colors and ripples for a fuller understanding of the emotional interaction.",
      },
      {
        question: "Is EmotiCore continuously learning and improving?",
        answer:
          "Yes, EmotiCore utilizes advanced AI technology that allows it to better understand emotional contexts over time. Regular updates enhance its emotional recognition capabilities and response patterns while maintaining consistent core functionality.",
      },
      {
        question: "What should I do if EmotiCore misinterprets my emotions?",
        answer:
          "If EmotiCore misinterprets your emotions, simply clarify your feelings in your next message. The system will adjust its emotional understanding and response accordingly. You can also refresh the conversation to start with a clean emotional state.",
      },
    ],
  };

  return (
    <section className="py-16 sm:py-22" id="faq">
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 max-w-full overflow-x-hidden">
          <div className="grid grid-cols-1 mt-12 md:mt-20 md:grid-cols-1 gap-y-8 md:gap-x-20">
            {content.faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-12 md:mt-20">
          <div className="px-8 py-4 text-center bg-gray-800 rounded-full">
            <p className="text-gray-50">
              For further assistance, please reach out to our support team at{" "}
              <a
                href={`mailto:${content.supportEmail}`}
                className="text-yellow-300 transition-colors duration-200 hover:text-yellow-400"
              >
                {content.supportEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
