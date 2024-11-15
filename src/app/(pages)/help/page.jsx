import { Section } from '@/components/atoms/Section'

export const metadata = {
  title: 'Manual de usuario',
  description: 'Página del manual de usuario',
}

export default function HelpPage() {
  return (
    <Section>
      <h2 className="font-bold">{`Página de ayuda`}</h2>
      <hr className="my-4" />
      <ul className="list-disc list-inside">
        <li>Manual de usuario</li>
      </ul>
    </Section>
  )
}
