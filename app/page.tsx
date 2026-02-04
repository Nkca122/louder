import EventDisplay, { EventDisplaySkeleton } from "@/components/event-display";
import Image from "next/image";
import { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home() {
  return (
    <>
      <section>
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-2 pb-8">
          <div className="flex-1/2 flex flex-col justify-center items-start gap-2">
            <h1 className="text-blue-500 text-4xl font-extrabold font-bungee">
              What's On
            </h1>
            <p className="">Never miss what’s on in Sydney</p>
            <p className="text-xs text-muted-foreground leading-tight">
              Discover concerts, festivals, exhibitions, workshops, and local
              experiences happening across Sydney. Browse by interest, save your
              favourites, and never miss an event again.
            </p>
          </div>
          <div className="flex-1/2 flex justify-center items-center">
            <Carousel className="w-4/5 relative">
              <CarouselContent>
                <CarouselItem key={1}>
                  <div className="w-full aspect-video">
                    <Image src={"/hero.jpg"} fill preload alt="" />
                  </div>
                </CarouselItem>
                <CarouselItem key={2}>
                  <div className="w-full aspect-video">
                    <Image src={"/hero_2.jpg"} fill preload alt="" />
                  </div>
                </CarouselItem>
                <CarouselItem key={3}>
                  <div className="w-full aspect-video">
                    <Image src={"/hero_3.jpg"} fill preload alt="" />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
      <section>
        <Suspense
          fallback={
            <>
              <EventDisplaySkeleton />
            </>
          }
        >
          <h2 className="font-bungee text-3xl mb-8">Events</h2>
          <EventDisplay />
        </Suspense>
      </section>
    </>
  );
}
