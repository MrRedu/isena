'use client'
import propTypes from 'prop-types'
import { Button, Input, Typography } from '@/app/MTailwind'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

export const EditPasswordForm = ({ emailUser }) => {
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm()

  const onSubmit = handleSubmit(async data => {
    // console.log({ data, emailUser })
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${emailUser}/change-password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      const result = await response.json()
      if (!response.ok) {
        if (result.message === 'Incorrect old password')
          return setError('La contraseña actual es incorrecta')
        else if (
          result.message ===
          'New password cannot be the same as the old password'
        )
          return setError(
            'La nueva contraseña no puede ser la misma que la actual'
          )
        else if (result.message === 'Passwords do not match')
          return setError('Las contraseñas no coinciden')
        else return setError(result.message)
      }
      reset()
      setError(null)
      signOut()
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Error changing password')
    }
  })

  return (
    <form className="mt-12 flex flex-col gap-8" onSubmit={onSubmit}>
      <div>
        <Input
          type="password"
          placeholder="********"
          variant="static"
          label="Contraseña actual"
          required
          className="w-full"
          {...register('oldPassword', {
            required: 'La contraseña actual es requerida',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
          })}
          error={errors?.oldPassword}
        />
        {errors.oldPassword && (
          <Typography
            color="red"
            className="mt-3 flex items-center gap-2 text-xs font-normal"
          >
            {errors.oldPassword.message}
          </Typography>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="********"
          variant="static"
          label="Nueva contraseña"
          required
          className="w-full"
          {...register('newPassword', {
            required: 'La nueva contraseña es requerida',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
          })}
          error={errors?.newPassword}
        />
        {errors.newPassword && (
          <Typography
            color="red"
            className="mt-3 flex items-center gap-2 text-xs font-normal"
          >
            {errors.newPassword.message}
          </Typography>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder="********"
          variant="static"
          label="Confirmar nueva contraseña"
          required
          className="w-full"
          {...register('confirmPassword', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
            validate: value =>
              value === watch('newPassword') || 'Las contraseñas no coinciden',
          })}
          error={errors?.confirmPassword}
        />
        {errors.confirmPassword && (
          <Typography
            color="red"
            className="mt-3 flex items-center gap-2 text-xs font-normal"
          >
            {errors.confirmPassword.message}
          </Typography>
        )}
      </div>
      {error && (
        <div>
          <Typography
            color="red"
            className="mt-3 flex items-center gap-2 text-xs font-normal"
          >
            {error}
          </Typography>
        </div>
      )}
      <div className="text-slate-500">
        <Typography className="font-bold">{`Requisitos de contraseña`}</Typography>
        <Typography className="py-2">{`La se recomienda que la contraseña debe contener`}</Typography>
        <ul className="list-disc list-inside text-sm text-gray-600">
          <li>{`Un carácter especial ( ! @ # $ % ^ & * ( ) - _ = + . )`}</li>
          <li>{`Al menos una mayúscula`}</li>
          <li>{`Mínimo 8 caracteres`}</li>
          <li>{`Al menos un número`}</li>
          <li>{`Cambiarla a menudo`}</li>
        </ul>
        <Typography className="py-2 text-red-500">{`Al actualizar su contraseña, se cerrará la sesión actual.`}</Typography>
      </div>
      <Button
        color="blush"
        fullWidth
        className="mt-4"
        type="submit"
        onClick={onSubmit}
        // disabled={!isDirty}

        // enabled cuando hayan cambios, si no, no.
      >
        Guardar cambios
      </Button>
    </form>
  )
}

EditPasswordForm.propTypes = {
  emailUser: propTypes.string,
}
