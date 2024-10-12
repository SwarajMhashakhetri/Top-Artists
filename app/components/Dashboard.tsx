'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Headphones } from "lucide-react"
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <Card className="bg-zinc-900 border-none text-white mb-8 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Welcome to Spotify Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6 text-center">
              Sign in to view your personalized Spotify insights.
            </p>
            <Button 
              onClick={() => signIn()}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold"
            >
              Sign In with Spotify
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Card className="bg-zinc-900 border-none text-white mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to Your Spotify Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Hello, {session.user?.name || 'music lover'}! Explore your personalized Spotify data.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-800 border-none text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Top Artists</CardTitle>
            <Music className="h-6 w-6 text-green-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400 mb-4">Discover your most listened to artists</p>
            <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-black font-bold">
              <Link href="/top-artists">View Top Artists</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-zinc-800 border-none text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Your Top Songs</CardTitle>
            <Headphones className="h-6 w-6 text-green-400" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400 mb-4">Explore your favorite tracks</p>
            <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-black font-bold">
              <Link href="/top-songs">View Top Songs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}