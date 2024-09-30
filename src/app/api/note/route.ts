import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

export { getNotes as GET };
 