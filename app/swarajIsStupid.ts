import  { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: 'user-top-read user-read-email playlist-modify-public user-modify-playback-state user-read-currently-playing streaming',
                },
            },
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account && account.access_token) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            return session
        },
    },
}
