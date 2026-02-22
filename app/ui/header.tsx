import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Rozkładzik
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6" role="list">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/schedules"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Schedules
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
