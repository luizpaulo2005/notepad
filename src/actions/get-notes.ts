"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const getNotes = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Usuário não autenticado");
    }

    const user = await prisma.user.findUnique({
      where: {
        // @ts-expect-error - type issue
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const notes = await prisma.note.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    if (!notes) {
      throw new Error("Nenhuma nota encontrada");
    }

    if (notes.length === 0) {
      console.log("Nenhuma nota encontrada");
    }

    return { notes }
  } catch (err) {
    throw new Error(`Erro ao buscar notas: ${err}`);
  }
};

export { getNotes };
