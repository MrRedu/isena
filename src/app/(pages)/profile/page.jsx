import { Section } from '@/components/atoms/Section'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@/app/MTailwind";
import {
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { ProfileInformationForm } from '../../components/organisms/forms/ProfileInformationForm';


export const metadata = {
  title: 'Perfil',
  description: 'Página de perfil',
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <Section className='flex flex-col gap-4'>
      <h2 className="font-bold text-xl antialiased text-center">{`Configuración de perfil`}</h2>
      <Tabs value="information" className="max-w-[700px] w-full mx-auto">
        <TabsHeader className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b border-blush-500 shadow-none rounded-none",
          }}>
          <Tab value={'information'}>
            <div className="flex items-center gap-2 py-2">
              <Square3Stack3DIcon className='w-5 h-5' />
              {`Información`}
            </div>
          </Tab>
          <Tab value={'password'}>
            <div className="flex items-center gap-2 py-2">
              <Square3Stack3DIcon className='w-5 h-5' />
              {`Contraseña`}
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}>
          <TabPanel value={'information'}>
            <ProfileInformationForm name={session?.user?.name} lastName={session?.user?.lastName} email={session?.user?.email} />
          </TabPanel>
          <TabPanel value={'password'}>
            {`password`}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </Section>
  )
}


