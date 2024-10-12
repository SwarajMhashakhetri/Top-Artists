'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  uri: string;
}

export default function TopArtists() {
  const { data: session, status } = useSession()
  const [topArtists, setTopArtists] = useState<Artist[]>([])

  useEffect(() => {
    if (session) {
      fetchTopArtists()
    }
  }, [session])

  const fetchTopArtists = async () => {
    try {
      const response = await fetch('/api/getTopArtists')
      if (!response.ok) {
        throw new Error('Failed to fetch top artists')
      }
      const data: Artist[] = await response.json()
      setTopArtists(data)
    } catch (error) {
      console.error('Error fetching top artists:', error)
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

  if (status === 'loading') return <p className="text-white">Loading...</p>
  if (!session) return <p className="text-white">Please sign in to view your top artists.</p>

  return (
    <div className="container mx-auto px-4 bg-black min-h-screen py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Top Artists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topArtists.map((artist) => (
          <Card key={artist.id} className="bg-zinc-900 border-none overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-grow">
              <div className="w-full aspect-square overflow-hidden">
                <img 
                  src={artist.imageUrl || '/placeholder.svg?height=300&width=300'} 
                  alt={`${artist.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 bg-zinc-800">
              <h3 className="text-lg font-semibold mb-2 text-white">{artist.name}</h3>
              <Button 
                onClick={() => handlePlay(artist.uri)}
                className="w-full bg-green-500 hover:bg-green-600 text-black"
              >
                <Play className="mr-2 h-4 w-4" /> Play Top Track
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}