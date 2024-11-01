import Header from "./Header";
// import Footer from "./Footer";
import { ThemeProvider } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}
