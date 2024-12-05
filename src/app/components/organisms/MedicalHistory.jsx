'use client'
import propTypes from 'prop-types'
import {
  IconButton,
  Typography,
  Card,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@/app/MTailwind'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useMedicalHistory } from '@/hooks/useMedicalHistory'
import { useState } from 'react'
import { AddMedicalHistoryForm } from './forms/AddMedicalHistoryForm'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const MedicalHistory = ({ cedulaPaciente }) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)

  // Meter esto en el customHook y que se cambie el estado para reflejar el recién creado
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const { medicalHistory, isLoading } = useMedicalHistory({ cedulaPaciente })
  const groupedAntecedentes = medicalHistory?.reduce((acc, antecedente) => {
    const tipo = antecedente.tipo_antecedente
    if (!acc[tipo]) {
      acc[tipo] = []
    }
    acc[tipo].push(antecedente)
    return acc
  }, {})

  const onSubmit = handleSubmit(async data => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/${cedulaPaciente}/medical-history`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) throw new Error('Error al registrar los signos vitales')

      toast.success('Antecedente registrado exitosamente')
      handleOpenModal()
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error creating medical history')
    } finally {
      // setVitalSign(vitalSignInitialState)
      // setIsLoading(false)
    }
  })

  return (
    <>
      <Card className="rounded shadow overflow-hidden">
        <div className="flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px] ">
          <Typography variant="h3" className="font-bold uppercase text-sm">
            {`Antecedentes`}
          </Typography>
          {groupedAntecedentes &&
            Object.keys(groupedAntecedentes).length > 0 &&
            !isLoading && (
              <IconButton variant="text" onClick={handleOpenModal}>
                <PlusCircleIcon className="h-6 w-6 stroke-3 text-blush-500" />
              </IconButton>
            )}
        </div>

        <div>
          {groupedAntecedentes &&
          Object.keys(groupedAntecedentes).length > 0 &&
          !isLoading ? (
            Object.keys(groupedAntecedentes).map(tipo => (
              <div key={tipo} className="px-6 pt-4 last:pb-4">
                <Typography
                  variant="h4"
                  className="font-bold uppercase text-sm"
                >
                  {tipo}
                </Typography>
                <ul className="text-sm">
                  {groupedAntecedentes[tipo].map(item => (
                    <li key={item.id_antecedente}>
                      <strong>{item.titulo}:</strong> {item.descripcion}
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
              onClick={handleOpenModal}
            >
              <PlusIcon className="text-green-500 h-10 w-10 stroke-2 border border-dashed border-green-500 rounded-lg" />
              <span>Agregar antecedentes</span>
            </Button>
          )}
        </div>
      </Card>
      <Dialog open={openModal} handler={handleOpenModal}>
        <DialogHeader>{`Registrar signos vitales`}</DialogHeader>
        <DialogBody>
          <AddMedicalHistoryForm
            register={register}
            errors={errors}
            handleSubmit={onSubmit}
            control={control}
            // vitalSign={vitalSign}
            // handleChange={handleChange}
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
          <Button variant="gradient" color="green" onClick={onSubmit}>
            <span>Agregar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

MedicalHistory.propTypes = {
  cedulaPaciente: propTypes.string,
}
