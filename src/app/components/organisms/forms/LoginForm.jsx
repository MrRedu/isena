import { Input } from "@/components/atoms/ui/forms/Input";
import { Label } from "@/components/atoms/ui/forms/Label";
import { Hyperlink } from "@/components/atoms/ui/Hyperlink";
import { Button } from "../../molecules/ui/Button";

export const LoginForm = () => {
  return (
    <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 w-96 rounded-lg my-6">
      <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
        <h3 className="text-2xl">{`Iniciar sesión`}</h3>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="w-full max-w-sm min-w-[200px]">
          <Label htmlFor="email">{`Correo electrónico`}</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@gmail.com"
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <Label htmlFor="password">
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
        </div>

        <div className="inline-flex items-center mt-2">
          <label
            className="flex items-center cursor-pointer relative"
            htmlFor="check-2"
          >
            <input
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
              id="check-2"
            />
            <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <label
            className="cursor-pointer ml-2 text-slate-600 text-sm"
            htmlFor="check-2"
          >
            {`Recuérdame`}
          </label>
        </div>

      </div>

      <div className="p-6 pt-0">
        <Button>{`Iniciar sesión`}</Button>

        <p className="flex justify-center mt-6 text-sm text-slate-600">
          {`¿No tienes una cuenta?`}
          <Hyperlink
            href="/register"
            className="ml-1 text-sm font-semibold text-slate-700 underline"
          >
            {`Crear cuenta`}
          </Hyperlink>
        </p>

      </div>
    </div>
  )
};
