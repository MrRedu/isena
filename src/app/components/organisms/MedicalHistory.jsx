'use client'
import { IconButton, Typography, Card } from "@/app/MTailwind";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

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
            <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
          </ul>
        </div>
        <div>
          <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-blush-700'>{'Antecedentes heredofamiliares'}</Typography>
          <ul className='flex flex-col'>
            <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
            <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
          </ul>
        </div>
        <div>
          <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-blush-700'>{'Antecedentes no patológicos'}</Typography>
          <ul className='flex flex-col'>
            <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
            <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
            <li className='p-2'>Traumatismo: Equis cosa</li>
          </ul>
        </div>
        <div>
          <Typography variant="h4" className='font-bold uppercase text-sm px-2 py-4 text-blush-700'>{'Alergías'}</Typography>
          <ul className='flex flex-col'>
            <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
            <li className='p-2 border-b'>Traumatismo: Equis cosa</li>
            <li className='p-2'>Traumatismo: Equis cosa</li>
          </ul>
        </div>
      </div>
    </Card>
  )
};
