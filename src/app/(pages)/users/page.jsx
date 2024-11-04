import { Section } from "@/components/atoms/Section";
import { UsersTable } from "@/components/organisms/tables/UsersTable";
import { getAllUsers } from "@/services/users";

export const metadata = {
  title: 'Usuarios',
  description: 'Página de usuarios',
}

const TABLE_HEADER_USERS = ["Correo", "Apellidos", "Nombres", "Status", "Rol", "Acciones"];
const TITLE_USERS = "Usuarios";
const SUBTITLE_USERS = "Tabla con todos los usuarios del sistema";

export default async function UsersPage() {
  const { data: users } = await getAllUsers();
  const mappedUsers = users.map((user) => ({
    correo: user.correo_usuario,
    apellidos: user.apellidos_usuario,
    nombres: user.nombres_usuario,
    status: user.nombre_status,
    rol: user.nombre_rol
  }))

  return (
    <Section>
      <UsersTable title={TITLE_USERS} subtitle={SUBTITLE_USERS} tableHeader={TABLE_HEADER_USERS} tableRows={mappedUsers} />
    </Section>
  )
};
