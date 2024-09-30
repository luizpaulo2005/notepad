"use client";

import { getNotes } from "@/actions/get-notes";
import { LoginModal } from "@/components/login-modal";
import { CreateNoteDialog } from "@/components/notes/create-note";
import { Note } from "@/components/notes/note";
import { useQuery } from "@tanstack/react-query";
import { CircleX, Wind } from "lucide-react";
import { useSession } from "next-auth/react";

const Page = () => {
  const { status } = useSession();

  const { data } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => getNotes(),
    staleTime: 1000 * 60 * 5,
  });

  if (status === "unauthenticated") {
    return <LoginModal />;
  }

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-5rem)]">
        <div className="flex items-center gap-2">
          <CircleX className="size-6" />
          <span>Erro ao carregar as notas</span>
        </div>
      </div>
    );
  }

  if (data.notes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-5rem)]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Wind className="size-6" />
            <span>Nenhuma nota encontrada</span>
          </div>
          <CreateNoteDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {data.notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
      <CreateNoteDialog />
    </div>
  );
};

export default Page;
