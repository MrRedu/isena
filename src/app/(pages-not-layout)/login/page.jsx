'use client'
import { LoginForm } from '@/components/organisms/forms/LoginForm'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const {
    // data: session,
    status,
  } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Si hay una sesión activa, redirige a la página principal
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    <div
      className={`
      flex items-center 
      h-screen
    bg-gradient-to-l from-blush-200 to-transparent
    `}
    >
      <div
        className={`
        absolute
        w-full h-full
        inset-0
        z-[-1]
        bg-[url('/bg-login.webp')]
        bg-cover bg-right bg-no-repeat opacity-80
        transform scale-x-[-1]
        `}
      />
      <div className="w-full lg:w-6/12 lg:ml-32">
        <LoginForm />
      </div>
      <Image
        src="/logo.webp"
        alt="Logo ISENA"
        width={320}
        height={200}
        className="
          absolute
          w-52 lg:w-64 h-auto
          top-12 right-[50%] left-[50%] bottom-auto transform translate-x-[-50%]
          lg:top-auto lg:right-16 lg:bottom-12 lg:left-auto lg:translate-x-0
        "
      />
    </div>
  )
}
