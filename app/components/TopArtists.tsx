'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Artist } from '../../types/spotify'

export function TopArtists() {
  const { data: session, status } = useSession()
  const [topArtists, setTopArtists] = useState<Artist[]>([])

  useEffect(() => {
    if (session) {
      fetchTopArtists()
    }
  }, [session])

  const fetchTopArtists = async () => {
    const response = await fetch('/api/getTopArtists')
    const data: Artist[] = await response.json()
    setTopArtists(data)
  }

  const handlePlay = async (uri: string) => {
    await fetch('/api/playSong', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uri }),
    })
  }

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Please sign in to view your top artists.</p>

  return (
    <ul className="space-y-6">
      {topArtists.map((artist) => (
        <li key={artist.id} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
          <img 
            src={artist.imageUrl || '/api/placeholder/80/80'} 
            alt={`${artist.name}`}
            className="w-20 h-20 object-cover rounded-full"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{artist.name}</h3>
          </div>
          <button 
            onClick={() => handlePlay(artist.uri)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Play Top Track
          </button>
        </li>
      ))}
    </ul>
  )
}