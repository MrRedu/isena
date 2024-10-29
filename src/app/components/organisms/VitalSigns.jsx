'use client'
import propTypes from 'prop-types'
import { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, IconButton, Typography, Card } from "@/app/MTailwind";
import { Chart } from '@/components/molecules/Chart';
import { HeartIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/utils/utils';

// Función para transformar los datos
const transformData = (data, type) => {
  return data[type].map(item => {
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

export const VitalSigns = ({ vitalSigns = [], patient = {} }) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Card className='rounded-none border shadow-none overflow-hidden'>
      <div className='flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px] '>
        <Typography variant="h3" className='font-bold uppercase text-sm'>{'Signos vitales'}</Typography>
        <IconButton variant="text" onClick={() => console.log("click")} >
          <PlusCircleIcon className="h-6 w-6 stroke-2" />
        </IconButton>
      </div>

      {vitalSigns.map(({ label, unitMeasurement, key }, index) => (
        <Accordion key={index}
          open={open === index + 1}
          className='h-full'
        >
          <AccordionHeader onClick={() => handleOpen(index + 1)}>
            <div className="flex justify-between w-full px-4 text-base font-normal">
              <span className="flex items-center gap-2">
                <HeartIcon className="w-6 h-6 text-red-500" />
                {label}
              </span>
              <span>
                <span className="font-bold">{getLatestValue(patient ? patient[key] : [])}{` `}</span>
                <span className="text-sm">{unitMeasurement}</span>
              </span>
            </div>
          </AccordionHeader>
          <AccordionBody className="w-full">
            <Chart data={transformData(patient ? patient : {}, key)} type={key} />
          </AccordionBody>
        </Accordion>
      ))
      }
    </Card>
  )
};

VitalSigns.propTypes = {
  vitalSigns: propTypes.array,
  patient: propTypes.object
}