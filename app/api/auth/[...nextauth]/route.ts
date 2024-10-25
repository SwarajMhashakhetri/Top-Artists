import { authOptions } from "@/app/swarajIsStupid"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
