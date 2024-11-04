'use client'
import propTypes from 'prop-types'
import { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, IconButton, Typography, Card, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@/app/MTailwind";
import { Chart } from '@/components/molecules/Chart';
import { HeartIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/utils/utils';
import { useVitalSigns } from '../../hooks/useVitalSigns';
import { AddVitalSignsForm } from './forms/AddVitalSignsForm';

// Función para transformar los datos
const transformData = (data, type) => {
  return data[type]?.map(item => {
    const name = item.fecha_presion || item.fecha_frecuencia_respiratoria || item.fecha_frecuencia_cardiaca || item.fecha_temperatura || item.fecha_peso || item.fecha_altura;
    let value;

    if (type === 'presiones_arteriales') {
      value = `${item.sistolica}/${item.diastolica}`; // O calcular un promedio si deseas
    } else {
      value = item.valor; // Para otros tipos de datos
    }

    return { name: formatDate(name), value }; // Retorna el nuevo formato
  });
};

const getLatestValue = (dataArray) => {
  if (!dataArray || dataArray.length === 0) return null;
  return dataArray[dataArray.length - 1].valor || `${dataArray[dataArray.length - 1].sistolica}/${dataArray[dataArray.length - 1].diastolica}`;
};

const signosVitales = [
  { key: 'alturas', label: 'Altura', unitMeasurement: 'm', icon: <HeartIcon className="w-6 h-6 text-red-500" /> },
  { key: 'pesos', label: 'Peso', unitMeasurement: 'kg', icon: <HeartIcon className="w-6 h-6 text-red-500" /> },
  { key: 'temperaturas', label: 'Temperatura', unitMeasurement: '°C', icon: <HeartIcon className="w-6 h-6 text-red-500" /> },
  { key: 'frecuencias_respiratorias', label: 'Frec. Respiratoria', unitMeasurement: 'rpm', icon: <HeartIcon className="w-6 h-6 text-red-500" /> },
  { key: 'presiones_arteriales', label: 'Presión Arterial', unitMeasurement: 'mmHg', icon: <HeartIcon className="w-6 h-6 text-red-500" /> },
  { key: 'frecuencias_cardiacas', label: 'Frec. Cardiaca', unitMeasurement: 'bpm', icon: <HeartIcon className="w-6 h-6 text-red-500" /> },
];

export const VitalSigns = ({ cedulaPaciente }) => {
  const { vitalSigns, isLoading } = useVitalSigns({ cedulaPaciente })

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(!openModal);

  return (
    <>
      <Card className='rounded-none border shadow-none overflow-hidden'>
        <div className='flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px] '>
          <Typography variant="h3" className='font-bold uppercase text-sm'>{'Signos vitales'}</Typography>
          <IconButton variant="text" onClick={() => handleOpenModal()} >
            <PlusCircleIcon className="h-6 w-6 stroke-2" />
          </IconButton>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Typography variant="h4" className='font-bold uppercase text-sm'>{'Cargando...'}</Typography>
          </div>
        )}
        {vitalSigns && !isLoading &&
          (signosVitales.map(({ key, label, unitMeasurement, icon }, index) => (
            <Accordion key={index}
              open={open === index + 1}
              className='h-full'
            >
              <AccordionHeader onClick={() => handleOpen(index + 1)}>
                <div className="flex justify-between w-full px-4 text-base font-normal">
                  <span className="flex items-center gap-2">
                    {icon}
                    {label}
                  </span>
                  <span>
                    <span className="font-bold">{getLatestValue(vitalSigns ? vitalSigns[key] : [])}{` `}</span>
                    <span className="text-sm">{unitMeasurement}</span>
                  </span>
                </div>
              </AccordionHeader>
              <AccordionBody className="w-full">
                <Chart data={transformData(vitalSigns ? vitalSigns : {}, key)} type={key} />
              </AccordionBody>
            </Accordion>
          ))
          )
        }
      </Card>
      <Dialog open={openModal} handler={handleOpenModal} >
        <DialogHeader>{`Registrar signos vitales`}</DialogHeader>
        <DialogBody>
          <AddVitalSignsForm />
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
          <Button variant="gradient" color="green"
            onClick={handleOpenModal}
          >
            <span>Agregar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
};

VitalSigns.propTypes = {
  cedulaPaciente: propTypes.string
}