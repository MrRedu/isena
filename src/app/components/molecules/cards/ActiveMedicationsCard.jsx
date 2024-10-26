'use client'
import propTypes from 'prop-types'
import { useState } from 'react';
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Card } from "./Card";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, List, ListItem, ListItemSuffix, Tooltip, Typography } from "@/app/MTailwind";
import { AddMedicationForm } from '@/components/molecules/forms/AddMedicationForm';
import { useMedication } from '@/hooks/useMedication';
import { formatDate } from '@/utils/utils';

export const ActiveMedications = ({ idPaciente, medicamentos }) => {
  const {
    medications,
    medication,
    handleChange,
    handleSubmit,
    handleDelete
  } = useMedication({ idPaciente, medicamentos })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Card >
        <Card.CardHeader icon={
          <IconButton variant="text" onClick={handleOpen} >
            <PlusCircleIcon className="h-6 w-6 stroke-2" />
          </IconButton>
        }>
          {`Médicamentos activos`}
        </Card.CardHeader>
        {medications ?
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
          <Typography variant="h3" className="text-base p-4">{`#TODO: `}No tiene medicamentos activos</Typography >
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