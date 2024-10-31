import EnhancedEmotiCoreInterface from "@/components/EnhancedEmotiCoreInterface";

export const generateMetadata = () => {
  return {
    title: "Chat | EmotiCore AI",
    description:
      "EmotiCore AI is a chatbot that can generate emotional responses",
  };
};

export default function UniversePage() {
  return <EnhancedEmotiCoreInterface />;
}
