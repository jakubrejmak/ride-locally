"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

export type LocationItem = {
  id: number;
  label: string;
}

type LocationPickerProps = {
  id: string;
  label: string;
  placeholder?: string;
  locations?: { locationList: LocationItem[]; loading: boolean | null; error: Error | null };
};

export default function LocationPicker({
  id,
  label,
  placeholder = "Select a location",
  locations = { locationList: [], loading: false, error: null },
}: LocationPickerProps) {
  const {locationList, loading, error} = locations;

  return (
    <Combobox>
      <label htmlFor={id}>{label}</label>
      <ComboboxInput
        id={id}
        placeholder={placeholder}
      />
      <ComboboxContent>
        <ComboboxList>
          {loading && <p className='p-2 text-sm'>Loading...</p>}
          {error && <p className='p-2 text-sm'>{error.message}</p>}
          {locationList.map((item) => (
            <ComboboxItem
              key={item.id}
              value={String(item.id)}
            >
              {item.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No stops found.</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
