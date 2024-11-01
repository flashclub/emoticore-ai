"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 在组件挂载后设置 mounted 为 true
  useEffect(() => {
    setMounted(true);
  }, []);

  // 如果组件未挂载，返回null以避免闪烁
  if (!mounted) {
    return <div className="h-10 bg-gray-200 animate-pulse rounded-full"></div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => setTheme("light")}
        size="icon"
        variant={theme === "light" ? "default" : "ghost"}
      >
        <Sun className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        size="icon"
        variant={theme === "dark" ? "default" : "ghost"}
      >
        <Moon className="h-5 w-5" />
      </Button>
    </div>
  );
}
