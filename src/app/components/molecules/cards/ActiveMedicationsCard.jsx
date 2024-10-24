'use client'
import propTypes from 'prop-types'
import { useState } from 'react';
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Card } from "./Card";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, List, ListItem, ListItemSuffix, Tooltip, Typography } from "@/app/MTailwind";
import { AddMedicationForm } from '@/components/molecules/forms/AddMedicationForm';
import { useMedication } from '@/hooks/useMedication';
import { formatDate } from '@/utils/utils';

export const ActiveMedications = ({ medicamentos }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const { medicamentoState, handleChange,
    handleSubmit
  } = useMedication()

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
        {medicamentos ?
          <List className='w-full p-2 rounded-none'>
            {medicamentos?.map(({ nombre_medicamento, dosis_medicamento, via_administracion_medicamento, intervalo_medicamento, fecha_inicio_medicamento, fecha_fin_medicamento }) => (
              <Tooltip key={nombre_medicamento} className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                placement="bottom" content={
                  <div className="w-80 flex flex-col">
                    <span>Dosis: {dosis_medicamento}</span>
                    <span>Vía: {via_administracion_medicamento}</span>
                    <span>Inicio: {formatDate(fecha_inicio_medicamento)}</span>
                    {fecha_fin_medicamento && <span>Fin: {formatDate(fecha_fin_medicamento)}</span>}
                    <span>Intervalo: {intervalo_medicamento}</span>
                  </div>
                }>
                <ListItem ripple={false} className="w-full py-2 px-4 rounded-none">
                  <div className="flex justify-between w-full">
                    <span>{nombre_medicamento}</span>
                  </div>
                  <IconButton size="sm" variant="text">
                    <ListItemSuffix>
                      <TrashIcon className="h-5 w-5 stroke-1" color="red" />
                    </ListItemSuffix>
                  </IconButton>
                </ListItem>
              </Tooltip>
            ))}
          </List>
          :
          <Typography variant="h3" className="text-base p-4">{`#TODO: `}No tiene medicamentos activos</Typography >
        }
      </Card>
      <Dialog open={open} handler={handleOpen} >
        <DialogHeader>{`Agregar medicamento`}</DialogHeader>
        <DialogBody>
          <AddMedicationForm medicamentoState={medicamentoState} handleChange={handleChange} />
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
  medicamentos: propTypes.array
}