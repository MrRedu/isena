'use client'
import { useLogin } from "@/hooks/useAuthentication";
import { Button, Input, Typography } from "@/app/MTailwind";
import Link from "next/link";
export const LoginForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    // handleReset,
    isLoading,
    // error
  } = useLogin()

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">
      {/* <!-- Card --> */}
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-lg border">
        <Typography variant="h1" className="text-2xl font-bold text-blush-900 dark:text-white my-6">
          {`Iniciar sesión`}
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-8">
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
          </div>
          <Button
            type="submit"
            loading={isLoading}
            onClick={handleSubmit}
            className="
              
              bg-blush-500 hover:bg-blush-600 hover:shadow-none
               px-12 py-4 text-blush-50 
               w-fit
              "
          >
            {`Iniciar sesión`}
          </Button>

          <div className="flex flex-col gap-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blush-300 " required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="font-medium text-gray-900 ">{`Recuérdame`}</label>
              </div>
              <Link href="#" className="disabled ml-auto text-sm text-blush-700 hover:underline ">{`Olvidaste la contraseña?`}</Link>
            </div>
            <div className="text-sm font-medium text-gray-700">
              ¿No te has registrado? <Link href="/register" className="text-blush-700 hover:underline">Creáte una cuenta</Link>
            </div>
          </div>

        </form>
      </div>
    </div >
  )
};
