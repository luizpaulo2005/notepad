import { NotebookText } from "lucide-react";
import { User } from "@/components/user/user";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <NotebookText className="size-6 hidden lg:block" />
        note.pad
      </div>
      <User />
    </div>
  );
};

export { Navbar };
