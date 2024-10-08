import { Appbar } from "./components/Appbar";
import { TopArtists } from "./components/TopArtists";


export default function Home() {
  return (
    <main className="font-sans">
      <Appbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Your Top Spotify Artists</h1>
        <TopArtists />
      </div>
    </main>
  )
}