import { Client } from "pg"
import { env } from "@/lib/env"

const client = new Client({
    connectionString: env.DATABASE_URL
})

export { client }