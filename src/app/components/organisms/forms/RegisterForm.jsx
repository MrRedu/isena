'use client'
import { useRegister } from '@/hooks/useAuthentication'
import { Button, Checkbox, Input, Typography } from '@/app/MTailwind'
import Link from 'next/link'

export const RegisterForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    // handleReset,
    isLoading,
    // error
  } = useRegister()

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-8">
            <div className="flex gap-8 flex-col lg:flex-row">
              <Input
                id="name"
                name="name"
                type="text"
                variant="static"
                onChange={handleChange}
                value={formData.name}
                label="Nombres"
                required
                className="w-full "
              />
              <Input
                id="lastName"
                name="lastName"
                type="text"
                variant="static"
                onChange={handleChange}
                value={formData.lastName}
                label="Apellidos"
                required
                className="w-full"
              />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              variant="static"
              onChange={handleChange}
              value={formData.email}
              label="Correo electrónico"
              placeholder="ejemplo@gmail.com"
            />
            <Input
              id="password"
              name="password"
              type="password"
              variant="static"
              onChange={handleChange}
              value={formData.password}
              label="Contraseña"
              placeholder="********"
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              variant="static"
              onChange={handleChange}
              value={formData.confirmPassword}
              label="Confirmar contraseña"
              placeholder="********"
            />
          </div>

          <Checkbox
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
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
          <Button
            type="submit"
            loading={isLoading}
            onClick={handleSubmit}
            className="bg-blush-500 hover:bg-blush-600 hover:shadow-none px-12 py-4 text-blush-50 w-fit"
          >
            {`Crear cuenta`}
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
