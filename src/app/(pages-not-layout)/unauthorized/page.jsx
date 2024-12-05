'use client'
import Image from 'next/image'
import { Section } from '@/components/atoms/Section'
import { Button } from '@/app/MTailwind'
import { signOut } from 'next-auth/react'

// export const metadata = {
//   title: 'Acceso denegado',
// }

export default function UnauthorizedPage() {
  return (
    <>
      <Section className="text-center flex flex-col gap-4 items-center justify-center h-screen max-w-[800px] mx-auto">
        <h1 className="font-bold text-5xl uppercase">#403</h1>
        <h2 className="font-bold text-3xl">{`Acceso denegado`}</h2>
        <h4 className="text-xl text-wrap">{`Comuníquese con un administrador del sistema para que le otorgue los permisos necesarios.`}</h4>
        <Image
          src="/unauthorized.svg"
          alt="No autorizado"
          width={300}
          height={300}
        />
        <Button
          variant="outlined"
          size="lg"
          className="mt-8 border-blush-300 text-blush-500 flex items-center"
          onClick={() => signOut()}
        >
          Cerrar sesión
        </Button>
      </Section>
    </>
  )
}
