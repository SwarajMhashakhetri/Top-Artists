'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { SpotifyLogo } from "../utils/Logo"
import { HelpCircle  } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Appbar() {
    const { data: session } = useSession()

    return (
        <div className="font-sans">
            <div className="flex justify-between items-center w-full h-16 bg-zinc-900 px-4 py-2 shadow-md">
                <Link href="/" className="flex items-center space-x-2 text-white">
                    <SpotifyLogo/>
                    <span className="text-xl font-bold">Spotify Insights</span>
                </Link>
                <div className="flex items-center space-x-4">
                    {session?.user && (
                        <>
                            <Link href="/top-artists" className="text-white hover:text-green-500 transition-colors">
                                Top Artists
                            </Link>
                            <Link href="/top-songs" className="text-white hover:text-green-500 transition-colors">
                                Top Songs
                            </Link>
                        </>
                    )}
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
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:text-green-500">
                                    <HelpCircle className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs bg-zinc-800 text-white border-zinc-700">
                                <p>To play music, you need a Spotify Premium account and an open Spotify application on your device.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}