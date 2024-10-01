"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma"; // ou qualquer outro banco de dados que você esteja usando
import { getUser } from "@/actions/get-user";

const createNoteSchema = z.object({
  title: z.string().nonempty("O campo título não pode ser vazio").max(32),
  content: z
    .string()
    .nonempty("O campo conteúdo não pode ser vazio")
    .max(228, "Excedeu o limite de caracteres"),
});

type CreateNote = z.infer<typeof createNoteSchema>;

const createNote = async (data: CreateNote) => {
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

  const { title, content } = createNoteSchema.parse(data);

  const newNote = await prisma.note.create({
    data: {
      title,
      content,
      userId: user.id,
    },
  });

  return { newNote };
};

export { createNote };
