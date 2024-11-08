'use client'
import propTypes from 'prop-types'
import { IconButton, Typography, Card } from '@/app/MTailwind'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useMedicalHistory } from '../../hooks/useMedicalHistory'

export const MedicalHistory = ({ cedulaPaciente }) => {
  const { medicalHistory, isLoading } = useMedicalHistory({ cedulaPaciente })

  const groupedAntecedentes = medicalHistory.reduce((acc, antecedente) => {
    const tipo = antecedente.tipo_antecedente;

    if (!acc[tipo]) {
      acc[tipo] = [];
    }

    acc[tipo].push(antecedente);

    return acc;
  }, {});

  console.log(groupedAntecedentes)

  return (
    <Card className="rounded-none border shadow-none overflow-hidden">
      <div className="flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px] ">
        <Typography
          variant="h3"
          className="font-bold uppercase text-sm"
        >{`Antecedentes`}</Typography>
        <IconButton variant="text" onClick={() => console.log('click')}>
          <PlusCircleIcon className="h-6 w-6 stroke-2" />
        </IconButton>
      </div>

      <div>
        {Object.keys(groupedAntecedentes).map(tipo => (
          <div key={tipo}>
            <h2>{tipo}</h2>
            <ul>
              {groupedAntecedentes[tipo].map(item => (
                <li key={item.id_antecedente}>
                  <strong>{item.título}:</strong> {item.descripción}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Mensajes si no hay antecedentes */}
        {Object.keys(groupedAntecedentes).length === 0 && (
          <p>No hay antecedentes disponibles.</p>
        )}
      </div>
    </Card>
  )
}

MedicalHistory.propTypes = {
  cedulaPaciente: propTypes.string,
}
