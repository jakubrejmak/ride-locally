"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "next-themes";

const themes = ["light", "dark", "system"] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="theme" className="border-b-0">
        <AccordionTrigger className="gap-1 justify-center py-0 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 hover:no-underline dark:text-zinc-400 dark:hover:text-zinc-50">
          Theme
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-2">
          <div className="flex flex-col items-center gap-1">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-full rounded-md py-1.5 text-sm capitalize transition-colors ${
                  theme === t
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
