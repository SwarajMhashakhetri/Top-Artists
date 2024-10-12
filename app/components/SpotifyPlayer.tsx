'use client'

import { Play, Pause } from 'lucide-react'
import { useSpotifyPlayer } from '../utils/spotify'

export default function SpotifyPlayer() {
  const { playerState, playTrack, togglePlay, isPaused, currentTrack, status } = useSpotifyPlayer()

  if (status === 'loading') return <p>Loading...</p>
  if (!playerState?.session) return <p>Please sign in to use the player.</p>

  return (
    <div className="text-white">
      <h2 className="text-lg font-bold">Spotify Web Player</h2>
      {currentTrack && (
        <div className="flex items-center gap-4">
          <img src={currentTrack.album.images[0].url} alt={currentTrack.name} className="w-16 h-16" />
          <div>
            <h3 className="text-xl">{currentTrack.name}</h3>
            <p className="text-sm">{currentTrack.artists[0].name}</p>
          </div>
        </div>
      )}
      <button
        className="mt-4 p-2 bg-green-500 text-black rounded"
        onClick={togglePlay}
      >
        {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
        {isPaused ? 'Play' : 'Pause'}
      </button>
      <button
        className="mt-4 p-2 bg-blue-500 text-black rounded"
        onClick={() => playTrack('spotify:track:your_track_uri')}
      >
        Play Specific Song
      </button>
    </div>
  )
}
