import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Track } from "@/types/spotify";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data = await response.json();

  const tracks: Track[] = data.items.map((item: {id:string,name:string,artists:{name:string}[],album:{name:string,images:{url:string}[]},uri:string}) => ({
    id: item.id,
    name: item.name,
    artist: item.artists[0]?.name || 'Unknown Artist',
    album: item.album.name,
    imageUrl: item.album.images[0]?.url || '', 
    uri: item.uri,
  }));

  return NextResponse.json(tracks);
}
