import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Registration() {
  const session = await auth();
  if (!session) {
    return (
      <>
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <Button
            type="submit"
            variant={"secondary"}
            className="rounded-none font-bold font-bungee"
          >
            Login
          </Button>
        </form>
      </>
    );
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="outline-none hover:cursor-pointer"
          asChild
        >
          <Avatar className="size-9 border">
            <AvatarImage src={`${session?.user?.image}`} alt="" />
            <AvatarFallback>
              {session?.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0 rounded-none" align="center">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              variant={"destructive"}
              className="rounded-none font-bold w-full font-bungee"
            >
              SIGN OUT
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
