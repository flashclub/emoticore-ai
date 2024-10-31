import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import FeatureSection from "@/components/FeatureSection";
import FAQ from "@/components/FAQ";
import Slogan from "@/components/Slogan";
export default async function Index({ locale = "en" }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });
  return (
    <>
      <Slogan />
      <FeatureSection className="pt-[250px]" />
      <FAQ />
    </>
  );
}
