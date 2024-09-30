"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const deleteNote = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Usuário não autenticado");
    }

    const note = await prisma.note.delete({
      where: {
        id,
      },
    });

    if (!note) {
      throw new Error("Nota não encontrada");
    }

    return { note };
  } catch (err) {
    throw new Error(`Erro ao deletar nota: ${err}`);
  }
};

export { deleteNote };
