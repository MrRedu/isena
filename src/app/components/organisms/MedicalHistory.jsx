'use client'
import propTypes from 'prop-types'
import { IconButton, Typography, Card, Button } from '@/app/MTailwind'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useMedicalHistory } from '../../hooks/useMedicalHistory'

export const MedicalHistory = ({ cedulaPaciente }) => {
  const { medicalHistory, isLoading } = useMedicalHistory({ cedulaPaciente })

  const groupedAntecedentes = medicalHistory?.reduce((acc, antecedente) => {
    const tipo = antecedente.tipo_antecedente;
    if (!acc[tipo]) {
      acc[tipo] = [];
    }
    acc[tipo].push(antecedente);
    return acc;
  }, {});

  return (
    <Card className="rounded shadow overflow-hidden">
      <div className="flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px] ">
        <Typography
          variant="h3"
          className="font-bold uppercase text-sm"
        >
          {`Antecedentes`}
        </Typography>
        {groupedAntecedentes && Object.keys(groupedAntecedentes).length > 0 && !isLoading && (
          <IconButton variant="text" onClick={() => console.log('click')}>
            <PlusCircleIcon className="h-6 w-6 stroke-3 text-blush-500" />
          </IconButton>
        )}
      </div>

      <div >
        {groupedAntecedentes && Object.keys(groupedAntecedentes).length > 0 && !isLoading ? (
          Object.keys(groupedAntecedentes).map(tipo => (
            <div key={tipo} className="px-6 pt-4 last:pb-4">
              <Typography
                variant="h4"
                className="font-bold uppercase text-sm"
              >
                {tipo}
              </Typography>
              <ul className='text-sm'>
                {groupedAntecedentes[tipo].map(item => (
                  <li key={item.id_antecedente}>
                    <strong>{item.título}:</strong> {item.descripción}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <Button
            color="green"
            variant="text"
            fullWidth
            className="flex items-center gap-2 rounded-none"
          // onClick={handleOpen}
          >
            <PlusIcon className="text-green-500 h-10 w-10 stroke-2 border border-dashed border-green-500 rounded-lg" />
            <span>Agregar antecedentes</span>
          </Button>
        )}

      </div>
    </Card >
  )
}

MedicalHistory.propTypes = {
  cedulaPaciente: propTypes.string,
}
