'use client'
// import { Hyperlink } from "@/components/atoms/ui/Hyperlink";
import useFormLogin from "@/hooks/useFormLogin";
import {
  Input,
  // Checkbox, 
  Button,
  // Typography 
} from "@/app/MTailwind";
import Link from "next/link";
import Image from "next/image";

export const LoginForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    // handleReset,
    isLoading,
    // error
  } = useFormLogin()

  return (
    <div className="relative flex flex-col bg-blush-50 shadow-sm border border-blush-300 w-96 rounded-lg my-16">

      <div className="relative p-8 items-center flex flex-col gap-4">
        <h1 className="text-2xl">{`Bienvenido`}</h1>
        <Image src="/avatar-dev.webp" alt="Logo" width={200} height={200} className="w-20 h-20" />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="w-full max-w-sm min-w-[200px]">
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
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
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

        {/* <div className="inline-flex items-center mt-2">
          <Checkbox
            label={
              <div>
                <Typography color="blue-gray" className="font-medium">
                  Remember Me
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  You&apos;ll be able to login without password for 24 hours.
                </Typography>
              </div>
            }
            containerProps={{
              className: "-mt-5",
            }}
          />
        </div> */}

      </div>

      <div className="p-6 pt-0">
        <Button
          type="submit"
          loading={isLoading}
          onClick={handleSubmit}
          fullWidth
          className="bg-blush-500"
        >
          {`Iniciar sesión`}</Button>


        <p className="flex justify-center mt-6 text-sm text-slate-600">
          {`¿No tienes una cuenta?`}
          <Link
            href="/register"
            className="ml-1 text-sm font-semibold text-slate-700 underline"
          >
            {`Crear cuenta`}
          </Link>
        </p>

      </div>
    </div>
  )
};
