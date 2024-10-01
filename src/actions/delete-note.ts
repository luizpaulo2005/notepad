"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./get-user";

const deleteNote = async (id: string) => {
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

    const deletedNote = await prisma.note.delete({
      where: {
        id: note.id,
      },
    });

    if (!deletedNote) {
      throw new Error("Nota não encontrada");
    }

    return { deletedNote };
  } catch (err) {
    throw new Error(`Erro ao deletar nota: ${err}`);
  }
};

export { deleteNote };
