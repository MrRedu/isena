'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Input, Typography } from '@/app/MTailwind'
import { signIn } from 'next-auth/react'
import { hashPassword } from '@/services/authServices'

async function loadEmail(email) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`
  )
  if (response.status === 200) {
    return true
  } else if (response.status === 404) {
    return false
  } else {
    throw new Error(`Error: #${response.status}`)
  }
}

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    const isEmailRegistered = await loadEmail(data.email)
    if (isEmailRegistered) {
      setError('email', { type: 'manual', message: 'El correo electrónico ya se encuentra registrado' })
      return
    }

    try {
      setIsLoading(true)
      const hashedPassword = await hashPassword(data.password)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Error creating user')
      }

      if (response.status === 201) {
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: '/',
        })
        reset()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
      {/* <!-- Card --> */}
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-lg border">
        <Typography
          variant="h1"
          className="text-2xl font-bold text-blush-900 dark:text-white my-6"
        >
          {`Crear cuenta`}
        </Typography>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
              <div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  variant="static"
                  label="Nombres"
                  required
                  {...register('name', {
                    required: 'El nombre es obligatorio',
                    minLength: {
                      value: 3,
                      message: 'El nombre debe tener al menos 3 caracteres',
                    },
                  })}
                  error={errors.name?.message}
                />
                {errors.name && (
                  <Typography
                    color="red"
                    className="mt-3 flex items-center gap-2 text-xs font-normal"
                  >
                    {errors.name.message}
                  </Typography>
                )}
              </div>
              <div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  variant="static"
                  label="Apellidos"
                  required
                  {...register('lastName', {
                    required: 'El apellido es obligatorio',
                    minLength: {
                      value: 3,
                      message: 'El apellido debe tener al menos 3 caracteres',
                    }
                  })}
                  error={errors.lastName?.message}
                />
                {errors.lastName && (
                  <Typography
                    color="red"
                    className="mt-3 flex items-center gap-2 text-xs font-normal"
                  >
                    {errors.lastName.message}
                  </Typography>
                )}
              </div>
            </div>
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                variant="static"
                label="Correo electrónico"
                placeholder="ejemplo@gmail.com"
                required
                {...register('email', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'El correo no es válido',
                  }
                })}
                error={errors.email?.message}
              />
              {errors.email && (
                <Typography
                  color="red"
                  className="mt-3 flex items-center gap-2 text-xs font-normal"
                >
                  {errors.email.message}
                </Typography>
              )}
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                variant="static"
                label="Contraseña"
                placeholder="********"
                required
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                })}
                error={errors.password?.message}
              />
              {errors.password && (
                <Typography
                  color="red"
                  className="mt-3 flex items-center gap-2 text-xs font-normal"
                >
                  {errors.password.message}
                </Typography>
              )}
            </div>
            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                variant="static"
                label="Confirmar contraseña"
                placeholder="********"
                required
                {...register('confirmPassword', {
                  required: 'La contraseña es obligatoria',
                  validate: (value) => value === watch('password') || 'Las contraseñas no coinciden',
                })}
                error={errors.confirmPassword?.message}
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
          </div>

          <div>
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              {...register('acceptTerms', {
                required: 'Debes aceptar los términos y condiciones',
              })}
              label={
                <Typography
                  color="blue-gray"
                  className="flex items-center text-sm"
                >
                  Acepto los
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-sm transition-colors text-blush-500 hover:text-blush-700"
                  >
                    &nbsp;Términos y condiciones
                  </Link>
                  .
                </Typography>
              }
            />
            {errors.acceptTerms && (
              <Typography
                color="red"
                className="mt-3 flex items-center gap-2 text-xs font-normal"
              >
                {errors.acceptTerms.message}
              </Typography>
            )}
          </div>
          <Button
            loading={isLoading}
            disabled={watch('acceptTerms') !== true || isLoading}
            onClick={onSubmit}
            className="bg-blush-500 hover:bg-blush-600 hover:shadow-none px-12 py-4 text-blush-50 w-fit"
          >
            {isLoading ? 'Registrando...' : 'Registrarme'}
          </Button>

          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-gray-700">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-blush-700 hover:underline">
                {' '}
                Inicia sesión
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
