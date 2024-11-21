'use client'
// import { useLogin } from '@/hooks/useAuthentication'
import { Button, Input, Typography } from '@/app/MTailwind'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
export const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if (result.status === 401) return toast.error('Credenciales incorrectas')

      if (result.error) {
        console.error(result.error)
      } else {
        // Redirigir manualmente si no se hace automáticamente
        reset()
        router.push('/')
      }
    } catch (error) {
      // setError(error)
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
          {`Iniciar sesión`}
        </Typography>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-8">
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
                  required: "El correo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "El correo no es válido",
                  }
                })}
                error={errors.email}
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
                  required: "La contraseña es requerida",
                  minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" }
                })}
                error={errors.password}
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
          </div>
          <Button
            type="submit"
            loading={isLoading}
            onClick={onSubmit}
            className="bg-blush-500 hover:bg-blush-600 hover:shadow-none px-12 py-4 text-blush-50  w-fit"
          >
            {`Iniciar sesión`}
          </Button>

          <div className="flex flex-col gap-2">
            <div className="flex items-start opacity-50 cursor-not-allowed">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  checked
                  required
                  className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blush-300"
                  {...register('remember')}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900 "
                >{`Recuérdame`}</label>
              </div>
              <Link
                href="#"
                className="disabled ml-auto text-sm text-blush-700 hover:underline "
              >{`Olvidaste la contraseña?`}</Link>
            </div>
            <div className="text-sm font-medium text-gray-700">
              ¿No te has registrado?{' '}
              <Link href="/register" className="text-blush-700 hover:underline">
                Creáte una cuenta
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
