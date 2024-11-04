import { Button } from "@/app/MTailwind"
import Link from "next/link"
import { Section } from "@/components/atoms/Section"

export const metadata = {
  title: 'Página no encontrada',
}

export default function NotFound() {
  return (
    <Section className="text-center flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="font-bold text-5xl uppercase">#404</h1>
      <h2 className="font-bold text-3xl">{`Página no encontrada`}</h2>
      <h3 className="text-2xl">{`No se pudo encontrar la página solicitada`}</h3>
      <h4 className="text-xl">{`Puede volver a la página principal haciendo click en el botón`}</h4>
      <Link href="/login">
        <Button variant="outlined" size="lg" className="mt-12 border-blush-300 text-blush-500 flex items-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
          {" "}Volver a la página principal
        </Button>
      </Link>
    </Section>
  )
}
