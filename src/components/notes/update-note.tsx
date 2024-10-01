import { updateNote } from "@/actions/update-note";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useQueryClient } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface UpdateNoteProps {
  id: string;
  title: string;
  content: string;
}

const updateNoteSchema = z.object({
  newTitle: z.string().nonempty("O campo título não pode ser vazio").max(32),
  newContent: z
    .string()
    .nonempty("O campo conteúdo não pode ser vazio")
    .max(228, "Excedeu o limite de caracteres"),
});

type UpdateNote = z.infer<typeof updateNoteSchema>;

const UpdateNote = ({ id, title, content }: UpdateNoteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  // const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateNote>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      newTitle: title ?? "",
      newContent: content ?? "",
    },
  });

  const handleUpdateNote = async ({ newTitle, newContent }: UpdateNote) => {
    setIsLoading(true);

    try {
      toast("Atualizando nota...");

      await updateNote({ id, title: newTitle, content: newContent });

      toast.success("Nota atualizada com sucesso");
      reset();
      setIsDialogOpen(false);
      // queryClient.invalidateQueries({ queryKey: ["notes"] });
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao atualizar nota");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="hover:bg-blue-500 hover:text-zinc-50 bg-transparent dark:text-zinc-50 text-black"
          onClick={() => handleSubmit(handleUpdateNote)}
        >
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar {title}</DialogTitle>
          <DialogDescription>
            Insira o conteúdo da nota que deseja atualizar.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleUpdateNote)}
        >
          <div className="flex flex-col gap-2">
            <Label>Título</Label>
            <Input
              maxLength={32}
              {...register("newTitle")}
              className="flex-1"
            />
            {errors.newTitle && (
              <span className="text-red-500">{errors.newTitle.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Conteúdo</Label>
            <Textarea
              rows={5}
              maxLength={228}
              {...register("newContent")}
              className="flex-1"
            />
            {errors.newContent && (
              <span className="text-red-500">{errors.newContent.message}</span>
            )}
          </div>

          <div className="flex gap-2 self-end">
            <DialogClose asChild>
              <Button disabled={isLoading} type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              Atualizar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { UpdateNote };
