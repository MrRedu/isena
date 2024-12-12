import { Section } from '@/components/atoms/Section'
import { UserIcon } from '@heroicons/react/24/outline'
import { CardDashboard } from '@/components/molecules/CardDashboard'
import { numberOfUsers } from '@/services/users'
import { numberOfPatients } from '@/services/patients'
import { Typography } from '@/app/MTailwind'

export const metadata = {
  title: 'Panel de control',
  description: 'Página del panel de control',
}

export default async function HomePage() {
  const usersNumber = await numberOfUsers()
  const patientsNumber = await numberOfPatients()

  return (
    <Section>
      <Typography variant="h2" className="font-bold text-2xl mb-8">
        {`Panel de control`}
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardDashboard
          title="Usuarios"
          subtitle="Gestionar los usuarios del sistema"
          buttonText="Ver"
          icon={
            <UserIcon
              strokeWidth={2}
              className="h-16 w-16 mb-4 text-blush-900"
            />
          }
          amount={usersNumber}
          toLink="/users"
        />
        <CardDashboard
          title="Pacientes"
          subtitle="Gestionar los pacientes del sistema"
          buttonText="Ver"
          icon={
            <UserIcon
              strokeWidth={2}
              className="h-16 w-16 mb-4 text-blush-900"
            />
          }
          amount={patientsNumber}
          toLink="/patients"
        />
      </div>
    </Section>
  )
}
