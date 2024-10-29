'use client'
import propTypes from 'prop-types'
import { useState } from 'react';
import { PlusCircleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, List, ListItem, ListItemSuffix, Tooltip, Card, Typography } from "@/app/MTailwind";
import { AddMedicationForm } from '@/components/molecules/forms/AddMedicationForm';
import { useMedications } from '@/hooks/useMedications';
import { formatDate } from '@/utils/utils';

export const ActiveMedications = ({ idPaciente, medicamentos }) => {
  const {
    medications,
    medication,
    handleChange,
    handleSubmit,
    handleDelete
  } = useMedications({ idPaciente, medicamentos })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Card className='rounded-none border shadow-none overflow-hidden'>
        <div className='flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px]'>
          <Typography variant="h3" className='font-bold uppercase text-sm'> {`Médicamentos activos`}</Typography>
          {medications.length > 0 && <IconButton variant="text" onClick={handleOpen}>
            <PlusCircleIcon className="h-6 w-6 stroke-2" />
          </IconButton>}
        </div>

        {medications.length > 0 ?
          <List className='w-full p-2 rounded-none'>
            {medications?.map(({ id_medicamento, nombre_medicamento, dosis_medicamento, via_administracion_medicamento, intervalo_medicamento, fecha_inicio_medicamento, fecha_fin_medicamento }, index) => {
              const isFechaFinExpired = new Date(fecha_fin_medicamento).getTime() < new Date().getTime();
              return (
                <Tooltip key={index} className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                  placement="bottom" content={
                    <div className="w-80 flex flex-col">
                      <span>Nombre: {nombre_medicamento}</span>
                      <span>Dosis: {dosis_medicamento}</span>
                      <span>Vía: {via_administracion_medicamento}</span>
                      <span>Inicio: {formatDate(fecha_inicio_medicamento)}</span>
                      {fecha_fin_medicamento && <span className={`${isFechaFinExpired && 'text-red-500'}`}>Fin: {formatDate(fecha_fin_medicamento)}</span>}
                      <span>Intervalo: {intervalo_medicamento}</span>
                    </div>
                  }>
                  <ListItem ripple={false} className="w-full py-2 px-4 rounded-none">
                    <div className="flex justify-between w-full">
                      <span>{nombre_medicamento}</span>
                    </div>
                    <IconButton onClick={() => handleDelete(id_medicamento)} size="sm" variant="text">
                      <ListItemSuffix>
                        <TrashIcon className="h-5 w-5 stroke-1" color="red" />
                      </ListItemSuffix>
                    </IconButton>
                  </ListItem>
                </Tooltip>

              )
            })}
          </List>
          :
          <Button color="green" variant="text" fullWidth className='flex items-center gap-2 rounded-none' onClick={handleOpen}>
            <PlusIcon className="text-green-500 h-10 w-10 stroke-2 border border-dashed border-green-500 rounded-lg" />
            <span>Agregar medicamentos</span>
          </Button >
        }
      </Card>
      <Dialog open={open} handler={handleOpen} >
        <DialogHeader>{`Agregar medicamento`}</DialogHeader>
        <DialogBody>
          <AddMedicationForm medicationState={medication} handleChange={handleChange} />
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
};

ActiveMedications.propTypes = {
  idPaciente: propTypes.string,
  medicamentos: propTypes.array
}