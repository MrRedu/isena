'use client'
import { SidebarWithBurgerMenu } from '@/components/organisms/ui/Sidebar'
import { Avatar } from '@/components/organisms/ui/Avatar'

export const Header = () => {
  return (
    <header className="flex items-center bg-white justify-between px-4 py-2 sticky z-10 top-0 shadow ">
      <SidebarWithBurgerMenu />
      <Avatar />
    </header>
  )
}
