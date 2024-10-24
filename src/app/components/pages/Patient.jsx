import propTypes from 'prop-types'
import { getPatient } from '@/services/patients'
import { Section } from '@/components/atoms/Section'
import { Card } from '@/components/molecules/cards/Card'
import { Button, List, ListItem, ListItemPrefix, Typography } from '@/app/MTailwind'
import { HeartIcon } from '@heroicons/react/24/outline'
import { formatDate, formatNumber } from '@/utils/utils'
import { ActiveMedications } from '../molecules/cards/ActiveMedicationsCard'

const signosVitales = [
  { label: 'Altura', unitMeasurement: 'm', key: 'alturas' },
  { label: 'Peso', unitMeasurement: 'kg', key: 'pesos' },
  { label: 'Temperatura', unitMeasurement: '°C', key: 'temperaturas' },
  { label: 'Frec. Respiratoria', unitMeasurement: 'rpm', key: 'frecuencias_respiratorias' },
  { label: 'Presión Arterial', unitMeasurement: 'mmHg', key: 'presiones_arteriales' },
  { label: 'Frec. Cardiaca', unitMeasurement: 'bpm', key: 'frecuencias_cardiacas' },
];

const getLatestValue = (dataArray) => {
  if (!dataArray || dataArray.length === 0) return null;
  return dataArray[dataArray.length - 1].valor || `${dataArray[dataArray.length - 1].sistolica}/${dataArray[dataArray.length - 1].diastolica}`;
};

export default async function Patient({ cedula }) {
  const { data: paciente = {} } = await getPatient({ cedula })

  return (
    <Section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left */}
      <div className='flex flex-col gap-4'>
        <Card className='p-4'>
          <h2 className='font-bold uppercase text-lg flex flex-col'>
            <span>{paciente?.nombres_paciente}</span>
            <span>{paciente?.apellidos_paciente}</span>
          </h2>
          <p className=''>{formatNumber(paciente?.cedula_paciente)} | {formatDate(paciente?.fecha_nacimiento_paciente)}</p>
        </Card>

        <Card>
          <Card.CardHeader icon={
            // <IconButton variant="text" onClick={() => console.log("click")} >
            //   <PlusCircleIcon className="h-6 w-6 stroke-2" />
            // </IconButton>
            'x'
          }>
            {'Signos vitales'}
          </Card.CardHeader>
          <List className=''>
            {signosVitales.map(({ label, unitMeasurement, key }, index) => {
              const isLast = index === signosVitales.length - 1;
              const classes = isLast
                ? "w-full  p-4 rounded-none"
                : "w-full  p-4 rounded-none border-b";
              return (
                <ListItem key={label} className={`${classes}`}>
                  <ListItemPrefix>
                    <HeartIcon className="h-6 w-6 stroke-2" color="red" />
                  </ListItemPrefix>
                  <div className="flex justify-between w-full">
                    <span>
                      {label}
                    </span>
                    <span>
                      <span className="font-bold">{getLatestValue(paciente ? paciente[key] : [])}{` `}</span>
                      <span className="text-sm">{unitMeasurement}</span>
                    </span>
                  </div>
                </ListItem>
              )
            })}
          </List>
        </Card>
      </div>


      {/* Center */}
      {/* Antecedentes */}
      <div className='flex flex-col gap-4'>

        <ActiveMedications medicamentos={paciente?.medicamentos} />



        <Card >
          <Card.CardHeader icon={
            // <IconButton variant="text" onClick={() => console.log("click")} >
            //   <PlusCircleIcon className="h-6 w-6 stroke-2" />
            // </IconButton>
            'x'
          }>
            {`Antecedentes`}
          </Card.CardHeader>
          <div className='flex flex-col gap-4 p-2'>
            <div>
              <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-cerise-700'>{'Antecedentes patólogicos'}</Typography>
              <ul className='flex flex-col'>
                <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
              </ul>
            </div>
            <div>
              <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-cerise-700'>{'Antecedentes heredofamiliares'}</Typography>
              <ul className='flex flex-col'>
                <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
                <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
              </ul>
            </div>
            <div>
              <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-cerise-700'>{'Antecedentes no patológicos'}</Typography>
              <ul className='flex flex-col'>
                <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
                <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
                <li className='p-2'>Traumatismo: Equis cosa</li>
              </ul>
            </div>
            <div>
              <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-cerise-700'>{'Alergías'}</Typography>
              <ul className='flex flex-col'>
                <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
                <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
                <li className='p-2'>Traumatismo: Equis cosa</li>
              </ul>
            </div>
          </div>
        </Card>

      </div>


      {/* Right */}
      <div className='flex flex-col gap-4'>
        <Button size='lg'>{`Agendar nueva consulta`}</Button>
        <Typography variant="h3" className='font-bold uppercase text-sm'>{`Citas agendadas`}</Typography>
      </div>
    </Section >
  )
};

Patient.propTypes = {
  cedula: propTypes.string
}