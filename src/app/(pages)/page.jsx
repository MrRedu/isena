'use client'
import { signOut, useSession } from "next-auth/react"
import { Button } from '@/app/MTailwind'
import { Section } from "@/components/atoms/Section"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <Section>
      <h2>{`</HomePage>`}</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button variant="outlined" onClick={() => signOut()}>Cerrar sesión</Button>
    </Section>
  )
};
