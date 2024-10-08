'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export function Appbar() {
    const session = useSession()
    return (
        <div className="font-sans">
            <div className="flex justify-between items-center w-full h-16 bg-green-200 px-4 py-2 shadow-md">
                <div>
                    Top-Artist
                </div>
                <div>
                    {session.data?.user && <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>
                        Logout
                    </button>}
                    {!session.data?.user &&  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>
                        Sign In
                    </button>}
                </div>
            </div>
        </div>
    )
}