"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const getNotes = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  if (!session.user?.email) {
    throw new Error("Email não encontrado na sessão");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const notes = await prisma.note.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!notes) {
    throw new Error("Notas não encontradas");
  }

  return { notes };
};

export { getNotes };
