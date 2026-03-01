"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTheme } from "next-themes";

const themes = ["light", "dark", "system"] as const;

type ThemeSwitcherProps = {
  label: string;
  themeLabels: string[];
  className: string;
};

export function ThemeSwitcher({
  label,
  themeLabels,
  className,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Accordion
      type='single'
      collapsible
    >
      <AccordionItem
        value='theme'
        className='border-b-0'
      >
        <AccordionTrigger className={className}>{label}</AccordionTrigger>
        <AccordionContent className='pb-0 pt-2'>
          <div className='flex flex-col items-center gap-1'>
            {themes.map((t, i) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-full rounded-md py-1.5 transition-colors ${
                  theme === t
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {themeLabels[i]}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
