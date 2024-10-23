'use client'
import { Menu, MenuHandler, MenuItem, MenuList, Avatar as MTAvatar, Typography } from "@/app/MTailwind";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";

const avatars = {
  1: 'admin',
  2: 'dev',
  3: 'med',
  4: 'visualizator',
}

export const Avatar = () => {
  const { data: session } = useSession()
  const avatar = avatars[session?.user?.id_rol] || avatars[4]
  const name = session?.user ? `${session.user.name} ${session.user.lastName[0]}.` : 'Nombres A.'
  const email = session?.user?.email.slice(0, 16) || 'email@ejemplo.com'

  return (
    <Menu>
      <div className="flex items-center gap-4">
        <div>
          <Typography variant="h6 leading-none">{name}</Typography>
          <Typography variant="small" color="gray" className="font-normal text-sm leading-none">
            {email}
          </Typography>
        </div>
        <MenuHandler>
          <MTAvatar src={`/avatar-${avatar}.webp`} alt={`{#TODO} avatar`} variant="rounded" size="sm" className="cursor-pointer" />
        </MenuHandler>
        <MenuList>
          <MenuItem className="flex items-center gap-2" onClick={() => signOut()}>
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
            <Typography variant="small" className="font-medium">
              {`Cerrar sesión`}
            </Typography>
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
};
