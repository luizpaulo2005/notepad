"use server"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getUser = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return null
    }

    return session.user
}

export { getUser }