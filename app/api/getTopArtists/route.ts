import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
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
  const artists: Artist[] = data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    uri: item.uri
  }))
  
  return NextResponse.json(artists)
}
