"use client";

import LocationPicker from "@/app/ui/location-picker";
import useUserLocation from "@/app/hooks/use-user-location";
import useStopsCloseby from "@/app/hooks/use-stops-closeby";
import useStopsPopular from "@/app/hooks/use-stops-popular";

export default function RouteSearch() {
  const { location, error: locationError } = useUserLocation();

  const {
    stops: stopsCloseby,
    loading: stopsClosebyLoading,
    error: stopsClosebyError,
  } = useStopsCloseby(location);

  const {
    stops: stopsPopular,
    loading: stopsPopularLoading,
    error: stopsPopularError,
  } = useStopsPopular(location);

  const isLocationLoading = !location && !locationError;

  const stopsClosebyList = stopsCloseby?.map((stop) => ({
    id: stop.id,
    label: stop.name,
  }));

  const stopsPopularList = stopsPopular?.map((stop) => ({
    id: stop.id,
    label: stop.name,
  }));

  return (
    <form className='mt-8 flex flex-col gap-6'>
      <fieldset className='flex flex-col gap-4'>
        <legend className='sr-only'>Route selection</legend>

        <LocationPicker
          id='origin'
          label='From'
          placeholder='Departure location'
          locations={{
            locationList: stopsClosebyList ?? [],
            loading: isLocationLoading || stopsClosebyLoading,
            error: locationError ?? stopsClosebyError,
          }}
        />

        <LocationPicker
          id='destination'
          label='To'
          placeholder='Arrival location'
          locations={{
            locationList: stopsPopularList ?? [],
            loading: isLocationLoading || stopsPopularLoading,
            error: locationError ?? stopsPopularError,
          }}
        />
      </fieldset>

      <button
        type='submit'
        disabled
        className='rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
      >
        Search
      </button>
    </form>
  );
}
