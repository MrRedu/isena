import propTypes from 'prop-types'
import { getPatient } from '@/services/patients'
import { Section } from '@/components/atoms/Section'
import { Card, List, ListItem, ListItemPrefix } from '@/app/MTailwind'
import { HeartIcon } from '@heroicons/react/24/outline'

const signosVitales = [{
  signo: 'Altura',
  value: '178'
}, {
  signo: 'Peso',
  value: '72.5'
},
{
  signo: 'Temperatura',
  value: '36.5'
}, {
  signo: 'Frec. Respiratoria',
  value: '17'
}, {
  signo: 'Presión Arterial',
  value: '120/80'
}, {
  signo: 'Frec. Cardiaca',
  value: '62'
}
]


export default async function Patient({ cedula }) {
  const { data: paciente } = await getPatient({ cedula })
  const classCard = `rounded-none border shadow-none`
  return (
    <Section className="grid grid-cols-3 gap-6">
      {/* Left */}
      <div className='flex flex-col gap-4'>
        <Card className={`${classCard} p-4`}>
          <h3>{paciente?.nombres_paciente}</h3>
          <h3>{paciente?.apellidos_paciente}</h3>
          <h3>FECHA | GÉNERO</h3>
        </Card>


        <Card className={`${classCard}`}>
          <div className='bg-gray-200 px-4 py-2 '>
            <h3>ÚLTIMOS SIGNOS VITALES</h3>
          </div>
          <ul className='p-4'>
            {signosVitales.map((signo) => (
              <li key={signo.id}>
                <h3>{signo.signo}</h3>
                <h3>{signo.value}</h3>
              </li>
            ))}
          </ul>
          <List>
            <ListItem className="py-2 pr-1 pl-4">
              <ListItemPrefix>
                {/* <TrashIcon className="h-6 w-6 stroke-2" /> */}
                x
              </ListItemPrefix>
              Item One
            </ListItem>
            <ListItem className="py-2 pr-1 pl-4">
              <ListItemPrefix>
                {/* <TrashIcon className="h-6 w-6 stroke-2" /> */}
                x
              </ListItemPrefix>
              Item One
            </ListItem>
            <ListItem className="py-2 pr-1 pl-4">
              <ListItemPrefix>
                <HeartIcon className="h-6 w-6 stroke-2" color="red" />
              </ListItemPrefix>
              {`Frec. Cardiaca`}
            </ListItem>
          </List>
        </Card>
        <Card className={`${classCard}`}>
          <pre>{JSON.stringify(paciente, null, 2)}</pre>
        </Card>
      </div>


      {/* Center */}
      <div className='flex flex-col gap-4'>
        <Card className={`${classCard}`}>
          <h3>ANTECEDENTES</h3>
        </Card>
        <Card className={`${classCard}`}>
          <h2>{`</Page> ${cedula}`}</h2>
        </Card>
        <Card className={`${classCard}`}>
          <pre>{JSON.stringify(paciente, null, 2)}</pre>
        </Card>
      </div>


      {/* Right */}
      <div className='flex flex-col gap-4'>
        <Card className={`${classCard}`}>
          <h3>Epa</h3>
        </Card>
        <Card className={`${classCard}`}>
          <h2>{`</Page> ${cedula}`}</h2>
        </Card>
        <Card className={`${classCard}`}>
          <pre>{JSON.stringify(paciente, null, 2)}</pre>
        </Card>
      </div>
    </Section>
  )
};

Patient.propTypes = {
  cedula: propTypes.string
}