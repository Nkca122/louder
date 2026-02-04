"use client";

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-background">
        <Spinner className="size-8 animate-spin" />
      </div>
    </>
  );
}
