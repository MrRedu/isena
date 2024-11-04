import { Section } from "@/components/atoms/Section";

export const metadata = {
  title: 'Usuarios',
  description: 'Página de usuarios',
}

const TABLE_HEADER_USERS = ["Correo", "Apellidos", "Nombres", "Status", "Rol", "Acciones"];
const TITLE_USERS = "Usuarios";
const SUBTITLE_USERS = "Tabla con todos los usuarios del sistema";

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
