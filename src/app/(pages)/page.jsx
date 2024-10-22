'use client'
import { signOut, useSession } from "next-auth/react"
import { Button } from '@/app/MTailwind'
import { SidebarWithBurgerMenu } from "#/src/app/components/organisms/ui/Sidebar"

export default function HomePage() {
  const { data: session } = useSession()
  console.log(session)

  return (
    <>
      <h2>{`</HomePage>`}</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button variant="outlined" onClick={() => signOut()}>Cerrar sesión</Button>
      <SidebarWithBurgerMenu />
    </>
  )
};
