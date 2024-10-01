"use server"

import { getUser } from "@/actions/get-user";
import { prisma } from "@/lib/prisma";

interface UpdateNoteProps {
  id: string;
  title: string;
  content: string;
}

const updateNote = async ({ id, content, title }: UpdateNoteProps) => {
  try {
    const sessionUser = await getUser();

    if (!sessionUser) {
      throw new Error("Usuário não encontrado");
    }

    const user = await prisma.user.findUnique({
      where: {
        // @ts-expect-error - type
        email: sessionUser.email,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!note) {
      throw new Error("Nota não encontrada");
    }

    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    if (!updatedNote) {
      throw new Error("Erro ao atualizar a nota");
    }

    return { updatedNote };
  }
  catch (err) {
    throw new Error(`Erro ao atualizar a nota: ${err}`);
  }
};

export { updateNote };
