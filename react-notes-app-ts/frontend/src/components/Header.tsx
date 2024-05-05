import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenuItem, NavigationMenuTrigger } from '@radix-ui/react-navigation-menu';
import { NavLink } from 'react-router-dom';

interface Icon {
  className: string;
}

const pages: Record<string, unknown>[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Notes',
    path: '/notes',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];
export default function Component() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      {/* SIDE BAR */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="lg:hidden">
          <NavLink to="#">
            <LogoIcon className="h-12 mr-3" />
            <span className="sr-only">Acme Inc</span>
          </NavLink>
          <div className="grid gap-2 py-6">
            {pages.map((page, i) => (
              <NavLink
                key={i}
                className="flex w-full items-center py-2 text-lg font-medium"
                to={`${page.path}`}
              >
                {`${page.name}`}
              </NavLink>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      {/* SIDE BAR */}
      {/* NAVIGATION MENU */}
      <NavLink className="mr-6 hidden lg:flex" to="#">
        <LogoIcon className="h-12 mr-3" />
        <span className="sr-only">Acme Inc</span>
      </NavLink>
      <div className="flex w-full justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {pages.map((page, i) => (
              <NavigationMenuLink asChild key={i}>
                <NavLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  to={`${page.path}`}
                >
                  {`${page.name}`}
                </NavLink>
              </NavigationMenuLink>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3 p-1 rounded hover:bg-gray-100">
                    <NavigationMenuLink asChild>
                      <NavLink className="text-sm" to="/">
                        Notes on the go
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-3 p-1 rounded hover:bg-gray-100">
                    <NavigationMenuLink asChild>
                      <NavLink className="text-sm" to="/">
                        Cool Notes
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="ml-auto">
        <Button className="rounded-2xl">Connect</Button>
      </div>
      {/* NAVIGATION MENU */}
    </header>
  );
}

function MenuIcon(props: Icon) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function LogoIcon(props: Icon) {
  return <img src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" {...props} alt="Logo" />;
}
