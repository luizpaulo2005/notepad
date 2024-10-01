"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/actions/get-user";

const getNotes = async () => {
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

    const notes = await prisma.note.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!notes) {
      throw new Error("Nenhuma nota encontrada");
    }

    if (notes.length === 0) {
      console.log("Nenhuma nota encontrada");
    }

    return { notes };
  } catch (err) {
    throw new Error(`Erro ao buscar notas: ${err}`);
  }
};

export { getNotes };
