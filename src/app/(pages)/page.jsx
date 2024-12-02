import Link from 'next/link'
import { Section } from '@/components/atoms/Section'
import { Button, Card, CardBody, CardFooter, Typography } from '@/app/MTailwind'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { UserIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Panel de control',
  description: 'Página del panel de control',
}

const DashboardCard = ({ title, amount, subtitle, buttonText, icon, toLink }) => {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <div className='flex justify-between items-center'>
          {icon}
          <Typography className='text-4xl font-bold text-blush-950'>{amount}</Typography>
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {subtitle}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={toLink} className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2 hover:bg-blush-500 hover:text-blush-50">
            {buttonText}
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function HomePage() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Usuarios"
          subtitle="Gestionar los usuarios del sistema"
          buttonText="Ver"
          icon={<UserIcon strokeWidth={2} className="h-16 w-16 mb-4 text-blush-900" />}
          amount={588}
          toLink="/users"
        />
        <DashboardCard
          title="Pacientes"
          subtitle="Gestionar los pacientes del sistema"
          buttonText="Ver"
          icon={<UserIcon strokeWidth={2} className="h-16 w-16 mb-4 text-blush-900" />}
          amount={588}
          toLink="/patients"
        />
      </div>
    </Section>
  )
}
