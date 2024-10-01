"use server"

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getUser = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return null
    }

    const user = session.user

    return user
}

export { getUser }