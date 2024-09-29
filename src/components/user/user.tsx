"use client";
import { getUser } from "@/actions/get-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import { UserAvatar } from "@/components/user/user-avatar";
import { ToggleThemeButton } from "@/components/user/toggle-theme-dropdown";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const User = () => {
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Button onClick={() => signIn("google")}>Entrar</Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={user.name} image={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          disabled
          className="flex items-center gap-1 max-w-40 truncate"
        >
          <UserIcon className="size-4 shrink-0" />
          {user?.name}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ToggleThemeButton />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2"
        >
          <LogOut className="size-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { User };
