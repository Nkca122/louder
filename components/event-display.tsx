import { getEvents } from "@/lib/events/actions";
import { IEvent } from "@/lib/schemas/event";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Locate } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function EventDisplaySkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2 justify-center">
        {Array.from({ length: 9 }).map((_, idx: number) => {
          return (
            <Card className="w-full h-105 rounded-none border" key={idx}>
              <Skeleton className="w-full h-full" />
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default async function EventDisplay() {
  const events = (await getEvents()) || [];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2 justify-center">
        {events.map((event: IEvent) => {
          return (
            <a href={event.link || "#"} key={event.title} target="main">
              <Card className="w-full h-full py-0 pb-4 rounded-none">
                <CardHeader className="w-full aspect-video relative">
                  <Image src={`${event.image}`} fill preload alt="" />
                </CardHeader>
                <CardContent className="px-4 flex flex-col justify-center items-start gap-2">
                  <CardTitle>
                    <div className="flex flex-col justify-center items-start gap-1">
                      {event.title}
                      <span className="inline-flex justify-center items-center gap-2 text-xs text-blue-500">
                        <Locate size={12} /> {event.venue}
                      </span>
                    </div>
                  </CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                  <CardFooter className="p-0 text-xs">{event.date}</CardFooter>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </>
  );
}
