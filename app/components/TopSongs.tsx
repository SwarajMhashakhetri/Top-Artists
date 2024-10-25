'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { Appbar } from './Appbar'

interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  uri: string;
}

export default function TopSongs() {
  const session = useSession()
  const [topSongs, setTopSongs] = useState<Song[]>([])

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetchTopSongs()
    }
  }, [session.status])

  const fetchTopSongs = async () => {
    try {
      const response = await fetch('/api/getTopSongs')
      if (!response.ok) {
        throw new Error('Failed to fetch top songs')
      }
      const data: Song[] = await response.json()
      setTopSongs(data)
    } catch (error) {
      console.error('Error fetching top songs:', error)
    }
  }

  const handlePlay = async (uri: string) => {
    try {
      const response = await fetch('/api/playSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri }),
      })
      if (!response.ok) {
        throw new Error('Failed to play song')
      }
    } catch (error) {
      console.error('Error playing song:', error)
    }
  }

  if (session.status === 'loading') return <p className="text-white text-center text-xl">Loading...</p>
  if (session.status === 'unauthenticated') return <p className="text-white text-center text-xl">Please sign in to view your top songs.</p>

  return (
    <>
    <Appbar />
    <div className="container mx-auto px-4 bg-gradient-to-b from-black to-zinc-900 min-h-screen py-12">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Your Top Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {topSongs.map((song) => (
          <Card key={song.id} className="bg-transparent border-none overflow-hidden flex flex-col transition-all duration-300 group hover:bg-zinc-800/30 hover:shadow-lg hover:shadow-green-500/10">
            <CardContent className="p-0 flex-grow relative">
              <div className="w-full aspect-square overflow-hidden">
                <img 
                  src={song.imageUrl || '/placeholder.svg?height=300&width=300'} 
                  alt={`${song.name} by ${song.artist}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 bg-transparent">
              <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-green-400 transition-colors duration-300">{song.name}</h3>
              <p className="text-sm text-zinc-400">{song.artist}</p>
              <Button 
                onClick={() => handlePlay(song.uri)}
                className="w-full bg-green-500 hover:bg-green-600 text-black mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </>
  )
}