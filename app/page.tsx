import { Appbar } from "./components/Appbar";
import Dashboard from "./components/Dashboard";


export default function Home() {
  return (
    <main className="font-sans">
      <Appbar />
      <Dashboard />
      <div className="container mx-auto px-4 py-8">
      </div>
    </main>
  )
}