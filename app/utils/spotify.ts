//@typescript-eslint/no-explicit-any
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface Track {
  name: string
  album: {
    images: { url: string }[]
  }
  artists: { name: string }[]
}


export function useSpotifyPlayer() {
  const { data: session, status } = useSession()
  const [player, setPlayer] = useState<any>(null)
  const [isPaused, setIsPaused] = useState(true)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [_, setDeviceId] = useState<string | null>(null)

  useEffect(() => {
    if (window.Spotify && session?.accessToken) {
      initializePlayer()
    } else {
      window.onSpotifyWebPlaybackSDKReady = initializePlayer
    }
  }, [session])

  const initializePlayer = () => {
    if (!window.Spotify) {
      const scriptTag = document.createElement('script')
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js'
      document.head.appendChild(scriptTag)
    }

    const player = new window.Spotify.Player({
      name: 'My Spotify Web Player',
      getOAuthToken: (cb: any) => {
        cb(session?.accessToken)
      },
      volume: 0.5,
    })

    player.addListener('ready', ({ device_id }: any) => {
      setDeviceId(device_id)
      console.log('Player is ready with Device ID:', device_id)
    })

    player.addListener('not_ready', ({ device_id }: any) => {
      console.log('Player is not ready with Device ID:', device_id)
    })

    player.addListener('player_state_changed', (state: any) => {
      if (state) {
        setCurrentTrack(state.track_window.current_track)
        setIsPaused(state.paused)
      }
    })

    player.connect()
    setPlayer(player)
  }

  const playTrack = async (uri: string) => {
    try {
      const response = await fetch('/api/playSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri }),
      })

      if (!response.ok) {
        throw new Error('Failed to start playback')
      }

      console.log('Playback started successfully')
    } catch (error) {
      console.error('Error playing track:', error)
    }
  }

  const togglePlay = () => {
    if (player) {
      player.togglePlay()
    }
  }

  return {
    playerState: { session },
    isPaused,
    currentTrack,
    togglePlay,
    playTrack,
    status,
  }
}
