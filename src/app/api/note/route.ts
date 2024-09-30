import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNotes = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        // @ts-expect-error - type issue
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const select = await prisma.note.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!select) {
      return NextResponse.json({ error: "No notes found" }, { status: 404 });
    }

    if (select.length === 0) {
      return NextResponse.json({ error: "No notes found" }, { status: 404 });
    }

    return NextResponse.json(select, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `"Internal Server Error": ${err}` },
      { status: 500 }
    );
  }
};

const createNoteSchema = z.object({
  title: z.string().nonempty("O campo título não pode ser vazio").max(32),
  content: z
    .string()
    .nonempty("O campo conteúdo não pode ser vazio")
    .max(228, "Excedeu o limite de caracteres"),
});

const createNote = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        // @ts-expect-error - type issue
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = createNoteSchema.parse(await req.json());

    const create = await prisma.note.create({
      data: {
        title,
        content,
        userId: user.id,
      },
    });

    if (!create) {
      return NextResponse.json({ error: "Note not created" }, { status: 500 });
    }

    return NextResponse.json(create, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: `"Internal Server Error": ${err}` },
      { status: 500 }
    );
  }
};

export { getNotes as GET, createNote as POST };
