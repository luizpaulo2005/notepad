"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteNote } from "@/actions/delete-note";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteNoteProps {
  id: string;
}

const DeleteNote = ({ id }: DeleteNoteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDeleteNote = async (id: string) => {
    try {
      setIsLoading(true);
      toast("Apagando nota...");
      await deleteNote(id);
      toast.success("Nota apagada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao apagar nota");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          className="hover:bg-red-500 hover:text-zinc-50 bg-transparent dark:text-zinc-50 text-black"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar nota</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja apagar essa nota?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => handleDeleteNote(id)}
            className="hover:bg-red-500 dark:hover:!text-zinc-50 text-zinc-50 dark:text-black"
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteNote };
