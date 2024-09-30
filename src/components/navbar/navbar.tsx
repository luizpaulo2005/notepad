import { User } from "@/components/user/user";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Image src="/icon.png" alt="Logo" width={32} height={32} />
        note.pad
      </div>
      <User />
    </div>
  );
};

export { Navbar };
