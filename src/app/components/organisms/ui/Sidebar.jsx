import React, { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@/app/MTailwind";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UsersIcon,
  IdentificationIcon,
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut } from "next-auth/react";

export function SidebarWithBurgerMenu() {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer} >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} overlay={false}  >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              ISENA
            </Typography>
          </div>
          <List>
            <Link href="/users">
              <ListItem>
                <ListItemPrefix>
                  <UsersIcon className="h-5 w-5" />
                </ListItemPrefix>
                {`Usuarios`}
              </ListItem>
            </Link>
            <Link href="/patients">
              <ListItem>
                <ListItemPrefix>
                  <IdentificationIcon className="h-5 w-5" />
                </ListItemPrefix>
                {`Pacientes`}
              </ListItem>
            </Link>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShieldCheckIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    {`Gestión`}
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link href="/management/reports">
                    <ListItem>
                      <ListItemPrefix>
                        <DocumentTextIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      {`Reportes`}
                    </ListItem>
                  </Link>
                  <Link href="/management/logs">
                    <ListItem>
                      <ListItemPrefix>
                        <ServerStackIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      {`Bitácora`}
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />

            <Link href="/profile">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                {`Perfil`}
              </ListItem>
            </Link>
            <Link href="/help">
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                {`Ayuda`}
              </ListItem>
            </Link>

            <ListItem onClick={() => signOut()}>
              <ListItemPrefix>
                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
              </ListItemPrefix>
              {`Cerrar sesión`}
            </ListItem>

          </List>
        </Card>
      </Drawer>
    </>
  );
}