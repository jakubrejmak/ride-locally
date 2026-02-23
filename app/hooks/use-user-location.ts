import { useEffect, useState } from "react";
import { getUserLocation, NavigatorLoc } from "@/app/lib/geo";

export default function useUserLocation() {
  const [location, setLocation] = useState<NavigatorLoc | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ignore = false;
    getUserLocation()
      .then((loc) => {
        if (!ignore) setLocation(loc);
      })
      .catch((err) => {
        if (!ignore)
          setError(err instanceof Error ? err : new Error(String(err)));
      });
    return () => {
      ignore = true;
    };
  }, []);

  return { location, error };
}
