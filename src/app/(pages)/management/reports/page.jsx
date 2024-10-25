import { Section } from "@/components/atoms/Section";

export default function ReportsPage() {
  return (
    <Section>
      <h2 className="font-bold">{`Página de reportes`}</h2>
      <hr className="my-4" />
      <ul className="list-disc list-inside">
        <li>Solo accedido desde administrador/desarrollador</li>
        <li>Botones para generar los distintos tipos de reportes</li>
      </ul>
    </Section>
  )
};
