import React from 'react';
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const LoggedOutNavbar: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" className="flex text-2xl transition duration-150 ease-in-out">
            <p className="font-bold text-grey-dark">pro</p>
            <p className="font-bold text-green">ffrr</p>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem  className='flex-end'>
          <Link href="/login" className="px-4 py-2 border border-green text-sm font-medium rounded-md text-green hover:bg-green hover:text-grey-darkest transition duration-150 ease-in-out">
            Login
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default LoggedOutNavbar;