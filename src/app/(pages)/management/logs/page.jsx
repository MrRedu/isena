import { Section } from '@/components/atoms/Section'

export default function LogsPage() {
  return (
    <Section>
      <h2 className="font-bold">{`Página de bitácora`}</h2>
      <hr className="my-4" />
      <ul className="list-disc list-inside">
        <li>Solo accedido desde administrador/desarrollador</li>
        <li>{`Tabla de los movimientos hechos por los usuarios (solo visualización)`}</li>
      </ul>
    </Section>
  )
}
