'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  uri: string;
}

export default function TopSongs() {
  const { data: session, status } = useSession();
  const [topSongs, setTopSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (session) {
      fetchTopSongs();
    }
  }, [session]);

  const fetchTopSongs = async () => {
    try {
      const response = await fetch('/api/getTopSongs');
      if (!response.ok) {
        throw new Error('Failed to fetch top songs');
      }
      const data: Song[] = await response.json();
      setTopSongs(data);
    } catch (error) {
      console.error('Error fetching top songs:', error);
    }
  };

  const handlePlay = async (uri: string) => {
    try {
      const response = await fetch('/api/playSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri }),
      });
      if (!response.ok) {
        throw new Error('Failed to play song');
      }
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  if (status === 'loading') return <p className="text-white">Loading...</p>;
  if (!session) return <p className="text-white">Please sign in to view your top songs.</p>;

  return (
    <div className="container mx-auto px-4 bg-black min-h-screen py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Top Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topSongs.map((song) => (
          <Card key={song.id} className="bg-zinc-900 border-none overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-grow">
              <div className="w-full aspect-square overflow-hidden">
                <img 
                  src={song.imageUrl || '/placeholder.svg?height=300&width=300'} 
                  alt={`${song.name} by ${song.artist}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 bg-zinc-800">
              <h3 className="text-lg font-semibold mb-2 text-white">{song.name}</h3>
              <p className="text-sm text-gray-400">{song.artist}</p>
              <Button 
                onClick={() => handlePlay(song.uri)}
                className="w-full bg-green-500 hover:bg-green-600 text-black mt-2"
              >
                <Play className="mr-2 h-4 w-4" /> Play
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
