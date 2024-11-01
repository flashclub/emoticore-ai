import Home from "@/components/Home";

import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
export const generateMetadata = () => {
  return {
    title: "EmotiCore AI",
    description:
      "EmotiCore AI is a chatbot that can generate emotional responses",
  };
};
export default async function Index() {
  return <Home />;
}
