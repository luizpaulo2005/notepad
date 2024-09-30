"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma"; // ou qualquer outro banco de dados que você esteja usando
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const createNoteSchema = z.object({
  title: z.string().nonempty("O campo título não pode ser vazio").max(32),
  content: z
    .string()
    .nonempty("O campo conteúdo não pode ser vazio")
    .max(228, "Excedeu o limite de caracteres"),
});

type CreateNote = z.infer<typeof createNoteSchema>;

const createNote = async (data: CreateNote) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const user = await prisma.user.findUnique({
    where: {
      // @ts-expect-error - typescript não reconhece o campo email
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const { title, content } = createNoteSchema.parse(data);

  const newNote = await prisma.note.create({
    data: {
      title,
      content,
      userId: user.id,
    },
  });

  return newNote;
};

export { createNote };
