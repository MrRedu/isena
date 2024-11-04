import { RegisterForm } from "@/components/organisms/forms/RegisterForm";
import Image from "next/image";

export const metadata = {
  title: 'Crear cuenta',
}

export default function RegisterPage() {
  return (
    <div className={`
      flex items-center justify-end
      h-screen
      bg-gradient-to-r from-blush-200 to-transparent
    `}>
      <div className={
        `
        absolute
        w-full h-full
        inset-0
        z-[-1]
        bg-[url('https://diariocorreo.pe/resizer/aRnGnlZ1PZ-P7JMsiJdP6zjozFU=/1200x682/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/TA5L7OUZGVHTFP7SFCUPLHCXP4.jpg')]
        bg-cover bg-right bg-no-repeat opacity-80
        `
      } />
      <div className="w-full lg:w-6/12 lg:m-32">
        <RegisterForm />
      </div>
      <Image src="/logo.webp" alt="Logo ISENA"
        width={320} height={200}
        className='
          absolute
          w-52 lg:w-64 h-auto
          top-12 right-[50%] left-[50%] bottom-auto transform translate-x-[-50%]
          lg:top-auto lg:right-auto lg:bottom-12 lg:left-16 lg:translate-x-0
        '
      />
    </div>
  )
};
