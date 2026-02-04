import { unstable_cache } from "next/cache";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const getEvents = unstable_cache(
  async () => {
    const response = await fetch(`/api/events`);
    const data = await response.json();
    if (data?.success) {
      return data?.events;
    }
    return null;
  },
  ["events"],
  {
    revalidate: 120,
  },
);