'use client'
import propTypes from 'prop-types'
import { useState } from 'react'
import {
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Tooltip,
  Card,
  Typography,
} from '@/app/MTailwind'
import { AddMedicationForm } from '@/components/organisms/forms/AddMedicationForm'
import { useMedications } from '@/hooks/useMedications'
import { format } from '@formkit/tempo'
import { DefaultSkeleton } from '../atoms/DefaultSkeleton'

export const ActiveMedications = ({ cedulaPaciente }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const {
    medications,
    handleDelete,
    medication,
    handleChange,
    handleSubmit,
    isLoading,
  } = useMedications({ cedulaPaciente, handleOpenModal: handleOpen })

  return (
    <>
      <Card className="rounded shadow overflow-hidden">
        <div className="flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px]">
          <Typography
            variant="h3"
            className="font-bold uppercase text-sm  text-pink-900"
          >
            {`Medicamentos activos`}
          </Typography>
          {medications?.length > 0 && (
            <IconButton variant="text" onClick={handleOpen}>
              <PlusCircleIcon className="h-6 w-6 stroke-3 text-blush-500" />
            </IconButton>
          )}
        </div>

        {isLoading || medications === null ? (
          <DefaultSkeleton className="p-4" times={4} />
        ) : medications?.length > 0 ? (
          <List className="w-full p-0 gap-0 rounded-none">
            {medications?.map(
              (
                {
                  id_medicamento,
                  nombre_medicamento,
                  dosis_medicamento,
                  via_administracion_medicamento,
                  intervalo_medicamento,
                  fecha_inicio_medicamento,
                  fecha_fin_medicamento,
                },
                index
              ) => {
                const isFechaFinExpired =
                  new Date(fecha_fin_medicamento).getTime() <
                  new Date().getTime()
                return (
                  <Tooltip
                    key={index}
                    className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                    placement="bottom"
                    content={
                      <div className="w-80 flex flex-col">
                        <span>Nombre: {nombre_medicamento}</span>
                        <span>Dosis: {dosis_medicamento}</span>
                        <span>Vía: {via_administracion_medicamento}</span>
                        <span>
                          Inicio:{' '}
                          {format(
                            fecha_inicio_medicamento,
                            'MMM D, YYYY',
                            'es'
                          )}
                        </span>
                        {fecha_fin_medicamento && (
                          <span
                            className={`${isFechaFinExpired && 'text-red-500'}`}
                          >
                            Fin:{' '}
                            {format(fecha_fin_medicamento, 'MMM D, YYYY', 'es')}
                          </span>
                        )}
                        <span>Intervalo: {intervalo_medicamento}</span>
                      </div>
                    }
                  >
                    <ListItem
                      ripple={false}
                      className="w-full py-2 px-4 rounded-none"
                    >
                      <div className="flex justify-between w-full">
                        <span>{nombre_medicamento}</span>
                      </div>
                      <IconButton
                        onClick={() => handleDelete(id_medicamento)}
                        size="sm"
                        variant="text"
                      >
                        <ListItemSuffix>
                          <TrashIcon className="h-5 w-5 stroke-1" color="red" />
                        </ListItemSuffix>
                      </IconButton>
                    </ListItem>
                  </Tooltip>
                )
              }
            )}
          </List>
        ) : (
          <Button
            color="green"
            variant="text"
            fullWidth
            className="flex items-center gap-2 rounded-none"
            onClick={handleOpen}
          >
            <PlusIcon className="text-green-500 h-10 w-10 stroke-2 border border-dashed border-green-500 rounded-lg" />
            <span>Agregar medicamentos</span>
          </Button>
        )}
      </Card>

      {/* Modal to add medication */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{`Agregar medicamento`}</DialogHeader>
        <DialogBody>
          <AddMedicationForm
            medication={medication}
            handleChange={handleChange}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
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

ActiveMedications.propTypes = {
  cedulaPaciente: propTypes.number,
}
