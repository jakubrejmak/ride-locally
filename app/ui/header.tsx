import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/app/ui/nav-items";
import { MenuPopover } from "@/app/ui/menu-popover";

export default function Header() {
  return (
    <header className='sticky top-0 z-20 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950'>
      <div className='mx-auto flex max-w-3xl items-center justify-between px-4 py-4'>
        <Link href='/'>
          <Image
            src='/logo_rect.svg'
            alt='jade24.pl'
            width={120}
            height={40}
            priority
            className='dark:invert'
          />
        </Link>

        <nav
          className='hidden sm:block'
          aria-label='Main navigation'
        >
          <ul
            className='flex items-center gap-6'
            role='list'
          >
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className='text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <MenuPopover />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
