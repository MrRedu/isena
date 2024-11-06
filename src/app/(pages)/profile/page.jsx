import { Section } from "@/components/atoms/Section";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { Card } from "@/app/MTailwind";

export const metadata = {
  title: 'Perfil',
  description: 'Página de perfil',
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <Section>
      <h2 className="font-bold">{`Página de perfil`}</h2>
      <hr className="my-4" />
      <h3>Cosas pendientes:</h3>
      <ul className="list-disc list-inside">
        <li>Interfaz para los datos del usuario</li>
        <li>Poder cambiar la contraseña</li>
      </ul>
      <Card className="p-4 max-w-96 overflow-hidden" >
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </Card>
    </Section>
  )
};
