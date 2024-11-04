'use client'
import { IconButton, Typography, Card } from "@/app/MTailwind";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

// const antecedentes = {
//   patologicos: [
//     {
//       titulo: 'Traumatismo',
//       descripcion: 'El 21/06/2018 se pegó en la cabeza. Contusión de tercer grado.'
//     },
//     {
//       titulo: 'Cirugías previas',
//       descripcion: 'Exanguineotransfusión al nacer. IMSS SOL a los 4 años.'
//     }
//   ],
//   heredofamiliares: [
//     {
//       titulo: 'Diabetes',
//       descripcion: 'Abuelo paterno. Abuelo materno.'
//     },
//     {
//       titulo: 'Hipertensión arterial',
//       descripcion: 'Padre. Madre.'
//     }
//   ],
//   noPatologicos: [],
//   alergias: []
// }

export const MedicalHistory = () => {
  return (
    <Card className="rounded-none border shadow-none overflow-hidden" >
      <div className='flex justify-between items-center bg-blush-50 px-4 py-2 h-[52px] '>
        <Typography variant="h3" className='font-bold uppercase text-sm'>{`Antecedentes`}</Typography>
        <IconButton variant="text" onClick={() => console.log("click")} >
          <PlusCircleIcon className="h-6 w-6 stroke-2" />
        </IconButton>
      </div>

      <div className='flex flex-col gap-4 p-2'>
        <div>
          <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-blush-700'>{'Antecedentes patólogicos'}</Typography>
          <ul className='flex flex-col'>
            <li className='p-2 border-b'>Cirugías previas: Apendicectomia en 06/2018</li>
            <li className='p-2 border-b'>Diabetes: Tipo II</li>
            <li className='p-2 border-b'>Cardiopatias: Presión arterial alta</li>
            <li className='p-2 border-b'>Otros: Problemas respiratorios, *otro*</li>
          </ul>
        </div>
        <div>
          <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-blush-700'>{'Antecedentes heredofamiliares'}</Typography>
          <ul className='flex flex-col'>
            <li className='p-2 border-b'>Psiquiatrícos: No</li>
            <li className='p-2 border-b'>Diabetes: Abuelo y abuela paterno, padre.</li>
            <li className='p-2 border-b'>Hipertensión arterial: Abuelo y abuela materno.</li>
          </ul>
        </div>
        <div>
          <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-blush-700'>{'Antecedentes no patológicos'}</Typography>
          <ul className='flex flex-col'>
            <li className='p-2 border-b'>Alcoholismo</li>
            <li className='p-2 border-b'>Tabaquismo</li>
            <li className='p-2 border-b'>Actividad física nula</li>
          </ul>
        </div>
        <div>
          <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-blush-700'>{'Alergías'}</Typography>
          <ul className='flex flex-col'>
            <li className='p-2 border-b'>Medicamentos: AINEs</li>
            <li className='p-2'>Otors: Camarones</li>
          </ul>
        </div>
      </div>
    </Card>
  )
};
