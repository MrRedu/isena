import { Section } from "@/components/atoms/Section";

export default function UsersPage() {
  return (
    <Section>
      <h2 className="font-bold">{`Página de usuarios`}</h2>
      <hr className="my-4" />
      <ul className="list-disc list-inside">
        <li>Tabla de usuarios</li>
        <li>Poder habilitar/deshabilitar usuarios</li>
      </ul>
    </Section>
  )
};
