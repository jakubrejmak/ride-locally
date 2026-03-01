import Link from "next/link";

export default function NotFound() {
  return (
    <div className='pb-8 pt-8 flex flex-col items-center bg-zinc-50 font-sans dark:bg-black'>
      <div className='flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 sm:px-16'>
        <p className='text-6xl font-bold text-zinc-300 dark:text-zinc-700'>
          404
        </p>
        <h2 className='mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50'>
          Na razie nic tu nie ma, ale...
        </h2>
        <p className='mt-3 text-center text-zinc-600 dark:text-zinc-400'>
          Strona jest w budowie i wkrótce będzie dostępna. Jeśli chcesz śledzić
          development i być na bieżąco z nowymi funkcjami serwisu, zapisz się do
          newslettera.
        </p>
        <code className='mt-6 rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500'>
          Newsletter jeszcze nie istnieje :c
        </code>
        <Link
          href='/'
          className='mt-8 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
        >
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}
