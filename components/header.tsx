import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, Home, BookUser, XCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Registration from "@/components/registration";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Header() {
  return (
    <>
      <header className="absolute z-10 top-8 left-0 w-full">
        <div className="px-8 lg:px-32 flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Image src={"/logo.jpg"} width={32} height={32} alt="" />
            <Separator orientation="vertical" />
            <p className="text-xl font-bold font-bungee">Eventify</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Suspense fallback={<Spinner className="size-8" />}>
              <Registration />
            </Suspense>

            <nav>
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button
                    variant="secondary"
                    className="rounded-none border hover:outline cursor-pointer"
                  >
                    <Menu strokeWidth={4} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="font-varela-round">
                  <DrawerHeader className="m-1 font-bungee">
                    <DrawerTitle className="text-4xl font-extrabold">
                      <div className="flex justify-between items-center">
                        Eventify
                        <DrawerClose asChild>
                          <Button
                            variant="destructive"
                            className="p-0 m-0 size-8 rounded-full cursor-pointer"
                          >
                            <XCircle className="size-8" />
                          </Button>
                        </DrawerClose>
                      </div>
                    </DrawerTitle>
                    <DrawerDescription className="text-xs">
                      Menu
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="no-scrollbar overflow-y-auto px-4">
                    <Link href={"/"}>
                      <div className="m-1 px-4 py-2 border rounded-md hover:outline text-sm font-semibold">
                        Home <Home className="inline-flex mx-2" size={16} />
                      </div>
                    </Link>
                    <Link href={"/about"}>
                      <div className="m-1 px-4 py-2 border rounded-md hover:outline text-sm font-semibold">
                        About{" "}
                        <BookUser className="inline-flex mx-2" size={16} />
                      </div>
                    </Link>
                  </div>
                  <DrawerFooter className="font-bungee mx-1">
                    <div className="text-muted-foreground text-xs">
                      <p>nkca122@gmail.com</p>
                      <Separator className="my-1" />
                      <p>Nikunj Chauhan</p>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
