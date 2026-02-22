import LocationPicker from "./ui/location-picker";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="w-full max-w-3xl px-4 py-16 sm:px-16">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Find a ride
                </h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Search local transit schedules between two locations.
                </p>

                <form className="mt-8 flex flex-col gap-6">
                    <fieldset className="flex flex-col gap-4">
                        <legend className="sr-only">Route selection</legend>

                        <LocationPicker
                            id="origin"
                            label="From"
                            placeholder="Departure location"
                        />

                        <LocationPicker
                            id="destination"
                            label="To"
                            placeholder="Arrival location"
                        />
                    </fieldset>

                    <button
                        type="submit"
                        disabled
                        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Search
                    </button>
                </form>
            </main>
        </div>
    );
}
