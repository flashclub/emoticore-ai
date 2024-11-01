import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import FeatureSection from "@/components/FeatureSection";
import FAQ from "@/components/FAQ";
import Slogan from "@/components/Slogan";
export default function Index({ locale = "en" }: { locale?: string }) {
  return (
    <>
      <Slogan />
      <FeatureSection className="pt-[250px]" />
      <FAQ />
    </>
  );
}
