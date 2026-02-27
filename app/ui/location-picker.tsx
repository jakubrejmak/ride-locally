"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox";

import { LocationOption } from "@/app/lib/locations";

export type LocationGroup = {
  label: string,
  items: LocationOption[],
};

export type LocationPickerProps = {
  placeholder: string,
  groups: LocationGroup[],
  value: LocationOption | null,
  onValueChange: (value: LocationOption | null) => void,
};

export default function LocationPicker({
  placeholder,
  groups,
  value,
  onValueChange,
}: LocationPickerProps) {
  const allItems = groups.flatMap((g) => g.items);
  return (
    <Combobox
      value={value}
      onValueChange={onValueChange}
      items={allItems}
      itemToStringValue={(item: LocationOption) => item.label}
    >
      <input type="hidden" name="origin" value={value?.id ?? ""} />
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {groups.map((group) => (
            <ComboboxGroup key={group.label}>
              <ComboboxLabel>{group.label}</ComboboxLabel>
              {group.items.map((item) => (
                <ComboboxItem key={item.id} value={item}>
                  {item.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
