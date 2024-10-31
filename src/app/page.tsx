import FeatureSection from "@/components/FeatureSection";
import Home from "@/components/Home";
export const generateMetadata = () => {
  return {
    title: "Emotional AI",
    description:
      "Emotional AI is a chatbot that can generate emotional responses",
  };
};
export default function Index() {
  return <Home />;
}
