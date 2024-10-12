'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"
import Link from 'next/link'

export function Appbar() {
    const { data: session } = useSession()

    return (
        <div className="font-sans">
            <div className="flex justify-between items-center w-full h-16 bg-zinc-900 px-4 py-2 shadow-md">
                <Link href="/" className="flex items-center space-x-2 text-white">
                    <Music className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-bold">Spotify Insights</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/top-artists" className="text-white hover:text-green-500 transition-colors">
                        Top Artists
                    </Link>
                    <Link href="/top-songs" className="text-white hover:text-green-500 transition-colors">
                        Top Songs
                    </Link>
                    {session?.user ? (
                        <Button 
                            variant="outline" 
                            className="bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button 
                            variant="outline"
                            className="bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                            onClick={() => signIn()}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}