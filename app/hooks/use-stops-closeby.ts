import { useEffect, useState } from "react";
import { getUserLocation, NavigatorLoc } from "@/app/lib/geo";
import { getStopsCloseby } from "../data/queries";
import { InferSelectModel } from "drizzle-orm";
import { stopsTable } from "@/app/db/schema";

type Stop = InferSelectModel<typeof stopsTable>;

export function useStopsCloseby() {
    const [location, setLocation] = useState<NavigatorLoc | null>(null);
    const [stops, setStops] = useState<Stop[] | null>(null);
    const [locationError, setLocationError] = useState<Error | null>(null);
    const [stopsError, setStopsError] = useState<Error | null>(null);

    useEffect(() => {
        let ignore = false;
        getUserLocation()
            .then((loc) => {
                if (!ignore) setLocation(loc);
            })
            .catch((err) => {
                if (!ignore) setLocationError(err instanceof Error ? err : new Error(String(err)));
            });
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        if (!location) return;
        let ignore = false;
        getStopsCloseby(location)
            .then((sto) => {
                if (!ignore) setStops(sto);
            })
            .catch((err) => {
                if (!ignore) setStopsError(err instanceof Error ? err : new Error(String(err)));
            });

        return () => {
            ignore = true;
        };
    }, [location]);

    const isLocationLoading = !location && !locationError;
    const isStopsLoading = !!location && !stops && !stopsError;
    const loading = isLocationLoading || isStopsLoading;

    const error = locationError ?? stopsError ?? null;

    return { location, stops, loading, error };
}
