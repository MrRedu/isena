'use client'
import { Button, Input, Typography } from "@/app/MTailwind";

export const EditPasswordForm = () => {
  return (
    <form action="" className='mt-12'>
      <div className="flex flex-col gap-8">
        <Input type="password" placeholder="********" variant="static" label="Contraseña actual" required />
        <Input type="password" placeholder="********" variant="static" label="Nueva contraseña" required />
        <Input type="password" placeholder="********" variant="static" label="Confirmar nueva contraseña" required />
        <div className="text-slate-500">
          <Typography className="font-bold">{`Requisitos de contraseña`}</Typography>
          <Typography className="py-2">{`La contraseña debe contener`}</Typography>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>{`Un carácter especial ( ! @ # $ % ^ & * ( ) - _ = + . )`}</li>
            <li>{`Al menos una mayúscula`}</li>
            <li>{`Mínimo 8 caracteres`}</li>
            <li>{`Al menos un número`}</li>
            <li>{`Cambiarla a menudo`}</li>
          </ul>
        </div>
        <Button
          color="blush"
          fullWidth
          className='mt-4'
        // enabled cuando hayan cambios, si no, no.
        >
          Guardar cambios
        </Button>
      </div>
    </form>
  )
};
