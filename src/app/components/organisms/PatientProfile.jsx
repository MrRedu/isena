'use client'
import propTypes from 'prop-types'
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
} from '@/app/MTailwind'
import { usePatient } from '@/hooks/usePatients'
import { format } from '@formkit/tempo'
import { formatNumber, formatNumberToPhone } from '@/utils/utils'
import { DefaultSkeleton } from '@/components/atoms/DefaultSkeleton'
import { PencilIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { EditPatientForm } from './forms/EditPatientForm'
export const PatientProfile = ({ cedulaPaciente }) => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)
  const { patient, isLoading, register, onSubmit, errors } = usePatient({
    cedulaPaciente,
    handleCloseModal: handleOpenModal,
  })

  return (
    <>
      <Card className="rounded-none border shadow-none overflow-hidden p-4 min-h-32">
        {isLoading || !patient ? (
          <DefaultSkeleton times={4} />
        ) : (
          <div className="flex flex-col relative">
            <IconButton
              className="!absolute -top-2 -right-2"
              variant="text"
              onClick={handleOpenModal}
            >
              <PencilIcon className="h-6 w-6 stroke-3 text-blush-500" />
            </IconButton>

            <h2 className="font-bold uppercase text-lg flex flex-col">
              <span>{patient?.name}</span>
              <span>{patient?.lastName}</span>
            </h2>
            <p className="">
              {patient?.dni && formatNumber(patient?.dni)}
              {patient?.dni && patient?.birthDate && ' / '}{' '}
              {/* Separator if both are present */}
              {patient?.birthDate &&
                format(patient?.birthDate, 'MMM D, YYYY', 'es')}
            </p>
            <p>
              {patient?.phone && formatNumberToPhone(patient?.phone)}{' '}
              {/* Phone number if available */}
              {patient?.phone && patient.email && ' / '}
              {/* Separator if both are present */}
              {patient?.email} {/* Email if available */}
            </p>
          </div>
        )}
      </Card>

      {/* Modal to edit patient */}
      <Dialog open={openModal} handler={handleOpenModal}>
        <DialogHeader>{`Editar paciente`}</DialogHeader>
        <DialogBody>
          <EditPatientForm
            patient={patient}
            register={register}
            handleSubmit={onSubmit}
            errors={errors}
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

PatientProfile.propTypes = {
  cedulaPaciente: propTypes.string,
}
