'use client'
import propTypes from 'prop-types'
import { useState } from 'react'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  IconButton,
  Typography,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@/app/MTailwind'
import { Chart } from '@/components/molecules/Chart'
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useVitalSigns } from '@/hooks/useVitalSigns'
import { AddVitalSignsForm } from './forms/AddVitalSignsForm'
import { format } from '@formkit/tempo'
import {
  HeightIcon,
  LungsIcon,
  TemperatureIcon,
  WeightIcon,
  BloodPressureIcon,
  HeartRateIcon,
} from '@/components/atoms/icons'
import { PlusIcon } from '@heroicons/react/24/solid'

// Función para transformar los datos
const transformData = (data, type) => {
  return data[type]?.map(item => {
    const name =
      item.fecha_presion ||
      item.fecha_frecuencia_respiratoria ||
      item.fecha_frecuencia_cardiaca ||
      item.fecha_temperatura ||
      item.fecha_peso ||
      item.fecha_altura
    let value

    if (type === 'presiones_arteriales') {
      value = `${item.sistolica}/${item.diastolica}` // O calcular un promedio si deseas
    } else {
      value = item.valor // Para otros tipos de datos
    }

    return { name: format(name, 'MMM D, YYYY', 'es'), value }
  })
}

const getLatestValue = dataArray => {
  if (!dataArray || dataArray.length === 0) return null
  return (
    dataArray[dataArray.length - 1].valor ||
    `${dataArray[dataArray.length - 1].sistolica}/${dataArray[dataArray.length - 1].diastolica}`
  )
}

const signosVitales = [
  {
    key: 'alturas',
    label: 'Altura',
    unitMeasurement: 'm',
    icon: <HeightIcon className="w-6 h-6 text-orange-500" />,
  },
  {
    key: 'pesos',
    label: 'Peso',
    unitMeasurement: 'kg',
    icon: <WeightIcon className="w-6 h-6 text-green-500" />,
  },
  {
    key: 'temperaturas',
    label: 'Temperatura',
    unitMeasurement: '°C',
    icon: <TemperatureIcon className="w-6 h-6 text-red-300" />,
  },
  {
    key: 'frecuencias_respiratorias',
    label: 'Frec. Respiratoria',
    unitMeasurement: 'rpm',
    icon: <LungsIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    key: 'presiones_arteriales',
    label: 'Presión Arterial',
    unitMeasurement: 'mmHg',
    icon: <BloodPressureIcon className="w-6 h-6 text-red-500" />,
  },
  {
    key: 'frecuencias_cardiacas',
    label: 'Frec. Cardiaca',
    unitMeasurement: 'bpm',
    icon: <HeartRateIcon className="w-6 h-6 text-red-500" />,
  },
]

export const VitalSigns = ({ cedulaPaciente }) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)

  const { vitalSigns, vitalSign, handleChange, handleSubmit, isLoading } =
    useVitalSigns({ cedulaPaciente, handleOpenModal })

  const [openAccordion, setOpenAccordion] = useState(0)
  const handleOpen = value => setOpenAccordion(openAccordion === value ? 0 : value)

  return (
    <>
      <Card className="rounded shadow overflow-hidden">
        <div className="flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px]">
          <Typography variant="h3" className="font-bold uppercase text-sm">
            {'Últimos signos vitales'}
          </Typography>
          {vitalSigns.pesos !== null && <IconButton variant="text" onClick={handleOpenModal}>
            <PlusCircleIcon className="h-6 w-6 stroke-3 text-blush-500" />
          </IconButton>}
        </div>


        {vitalSigns.pesos !== null ? (
          signosVitales.map(({ key, label, unitMeasurement, icon }, index) => (
            <Accordion key={index} open={openAccordion === index + 1} className="h-full">
              <AccordionHeader className="w-full border-none border-gray-200" onClick={() => handleOpen(index + 1)}>
                <div className="flex justify-between w-full px-4 text-base font-normal">
                  <span className="flex items-center gap-4">
                    {icon}
                    {label}
                  </span>
                  <span>
                    <span className="font-bold text-blush-950">
                      {getLatestValue(vitalSigns ? vitalSigns[key] : [])}
                      {` `}
                    </span>
                    <span className="text-sm">{unitMeasurement}</span>
                  </span>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${openAccordion === index + 1 ? 'rotate-180' : ''}`}
                />
              </AccordionHeader>
              <AccordionBody className="w-full">
                <Chart
                  data={transformData(vitalSigns ? vitalSigns : {}, key)}
                  type={key}
                />
              </AccordionBody>
            </Accordion>
          )
          )) : (
          <Button
            color="green"
            variant="text"
            fullWidth
            className="flex items-center gap-2 rounded-none"
            onClick={handleOpenModal}
          >
            <PlusIcon className="text-green-500 h-10 w-10 stroke-2 border border-dashed border-green-500 rounded-lg" />
            <span>Agregar signos vitales</span>
          </Button>
        )
        }

      </Card>
      <Dialog open={openModal} handler={handleOpenModal}>
        <DialogHeader>{`Registrar signos vitales`}</DialogHeader>
        <DialogBody>
          <AddVitalSignsForm
            vitalSign={vitalSign}
            handleChange={handleChange}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenModal}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Agregar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
VitalSigns.propTypes = {
  cedulaPaciente: propTypes.string,
}
