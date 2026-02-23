import { useState, useEffect } from "react";
import { InferSelectModel } from "drizzle-orm";
import { stopsTable } from "@/app/db/schema";
import { getStopsPopular } from "@/app/data/queries";
import type { NavigatorLoc } from "@/app/lib/geo";

type Stop = InferSelectModel<typeof stopsTable>;

export default function useStopsPopular(location: NavigatorLoc | null) {
  const [stops, setStops] = useState<Stop[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!location) return;
    let ignore = false;
    getStopsPopular(location)
      .then((sto) => {
        if (!ignore) setStops(sto);
      })
      .catch((err) => {
        if (!ignore)
          setError(err instanceof Error ? err : new Error(String(err)));
      });

    return () => {
      ignore = true;
    };
  }, [location]);

  const loading = !!location && !stops && !error;

  return { stops, loading, error };
}
