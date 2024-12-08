'use client'
import { SidebarWithBurgerMenu } from '@/components/organisms/ui/Sidebar'
import { Avatar } from '@/components/organisms/ui/Avatar'
import Image from 'next/image'

export const Header = () => {
  return (
    <header className="flex items-center bg-white justify-between px-4 py-2 sticky z-10 top-0 shadow ">
      <SidebarWithBurgerMenu />
      <Image
        src="/isotipo.webp"
        alt="brand"
        width={60}
        height={60}
        className="hidden lg:block w-10 h-10"
      />
      <Avatar />
    </header>
  )
}
