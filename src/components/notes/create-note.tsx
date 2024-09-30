"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { createNote } from "@/actions/create-note";
import { useQueryClient } from "@tanstack/react-query";

const createNoteSchema = z.object({
  title: z.string().nonempty("O campo título não pode ser vazio").max(32),
  content: z
    .string()
    .nonempty("O campo conteúdo não pode ser vazio")
    .max(228, "Excedeu o limite de caracteres"),
});

type CreateNote = z.infer<typeof createNoteSchema>;

const CreateNoteDialog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateNote>({
    resolver: zodResolver(createNoteSchema),
  });

  const handleCreateNote = async ({ title, content }: CreateNote) => {
    setIsLoading(true);

    try {
      toast("Adicionando nota...");

      await createNote({ title, content });

      toast.success("Nota adicionada com sucesso");
      reset();
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (error) {
      toast.error("Erro ao adicionar nota");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="fixed right-4 bottom-4">
        <Button className="flex items-center gap-2">
          <Plus className="size-4" />
          Adicionar nota
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nota</DialogTitle>
          <DialogDescription>
            Insira o conteúdo da nota que deseja adicionar.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleCreateNote)}
        >
          <div className="flex flex-col gap-2">
            <Label>Título</Label>
            <Input maxLength={32} {...register("title")} className="flex-1" />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Conteúdo</Label>
            <Textarea
              rows={5}
              maxLength={228}
              {...register("content")}
              className="flex-1"
            />
            {errors.content && (
              <span className="text-red-500">{errors.content.message}</span>
            )}
          </div>

          <div className="flex gap-2 self-end">
            <DialogClose asChild>
              <Button disabled={isLoading} type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateNoteDialog };
