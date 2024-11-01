// import Link from "next/link";
// import { Link } from "@/i18n";
import Link from "next/link";
import { languages } from "@/languageConfig";

export default function Footer() {
  // console.log("languages", languages);

  return (
    <div className="container py-8 px-4 max-w-6xl  mx-auto flex justify-between items-center">
      <div className="flex items-center flex-wrap gap-2">
        {languages.map((language) => (
          <Link
            key={language.code}
            className="hover:underline"
            href={`/${language.code}`}
          >
            {language.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
