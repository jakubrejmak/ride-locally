"use client";

import { useState } from "react";
import { LocationOption } from "@/app/lib/locations";
import { searchTrips } from "@/app/actions/actions";
import { useUserLocation, useLocations } from "@/app/hooks/use-locations";
import {
  getStopsCloseby,
  getStopsPopular,
  getLocationsCloseby,
  getLocationsPopular,
} from "@/app/data/queries";
import LocationPicker from "@/app/ui/location-picker";
import { LocationGroup } from "@/app/ui/location-picker";

import { InferSelectModel } from "drizzle-orm";
import { stopsTable, addressesTable } from "@/app/db/schema";

type Stop = InferSelectModel<typeof stopsTable>;
type Address = InferSelectModel<typeof addressesTable>;

export default function TripSearch() {
  const [origin, setOrigin] = useState<LocationOption | null>(null);
  const [destination, setDestination] = useState<LocationOption | null>(null);

  const { location: userLoc } = useUserLocation();

  const { data: stopsCloseby } = useLocations(userLoc, getStopsCloseby);
  const { data: locationsCloseby } = useLocations(userLoc, getLocationsCloseby);
  const { data: stopsPopular } = useLocations(userLoc, getStopsPopular);
  const { data: locationsPopular } = useLocations(userLoc, getLocationsPopular);

  function toStopGroup(label: string, data: Stop[] | null): LocationGroup {
    return {
      label,
      items: (data ?? []).map((s) => ({
        kind: "stop" as const,
        id: `stop:${s.id}`,
        label: s.name,
      })),
    };
  }

  function toAddressGroup(
    label: string,
    data: Address[] | null,
  ): LocationGroup {
    return {
      label,
      items: (data ?? []).map((a) => ({
        kind: "address" as const,
        id: `address:${a.id}`,
        label: a.display_name,
      })),
    };
  }

  return (
    <form action={searchTrips}>
      <LocationPicker
        placeholder='Pick origin'
        groups={[
          toStopGroup("Nearby stops", stopsCloseby),
          toAddressGroup("Nearby addresses", locationsCloseby),
        ]}
        value={origin}
        onValueChange={setOrigin}
      />
      <LocationPicker
        placeholder='Pick destination'
        groups={[
          toStopGroup("Popular stops nearby", stopsPopular),
          toAddressGroup("Popular addresses nearby", locationsPopular),
        ]}
        value={destination}
        onValueChange={setDestination}
      />
    </form>
  );
}
