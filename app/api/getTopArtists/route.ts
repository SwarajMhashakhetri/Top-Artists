import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/swarajIsStupid"
import { Artist } from "@/types/spotify"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  const data = await response.json()
  const artists: Artist[] = data.items.map((item: {id:string,name:string,uri:string,images:{url:string}[]}) => ({
    id: item.id,
    name: item.name,
    uri: item.uri,
    imageUrl: item.images[0]?.url || '' 
  }))

  return NextResponse.json(artists)
}
