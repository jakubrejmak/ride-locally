"use client";

import { useStopsCloseby } from "../hooks/use-stops-closeby";

type LocationPickerProps = {
    id: string;
    label: string;
    placeholder?: string;
};

export default function LocationPicker({
    id,
    label,
    placeholder = "Select a location",
}: LocationPickerProps) {
    const {location, stops} = useStopsCloseby()

    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
            >
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={id}
                placeholder={placeholder}
                autoComplete="off"
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
            />
        </div>
    );
}
