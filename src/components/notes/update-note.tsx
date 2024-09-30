import { Pen } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";

const UpdateNote = () => {
  const handleUpdateNote = async () => {
    toast("Ainda não implementado");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="hover:bg-blue-500 hover:text-zinc-50 bg-transparent dark:text-zinc-50 text-black"
          onClick={() => handleUpdateNote()}
        >
          <Pen />
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export { UpdateNote };
