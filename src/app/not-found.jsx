
import { Button } from "@/app/MTailwind"
import Link from "next/link"

export const metadata = {
  title: 'Not found page',
}

export default function NotFound() {
  return (
    <>
      <h1>#404</h1>
      <Link href="/login">
        <Button variant="outlined">
          Volver a la página principal
        </Button>
      </Link>
    </>
  )
}
