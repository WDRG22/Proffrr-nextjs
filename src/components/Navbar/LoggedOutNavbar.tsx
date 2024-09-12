import React from 'react';
import Link from "next/link";
import { ModeToggle } from '@/components/ui/toggle-mode';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from '../ui/button';

const LoggedOutNavbar: React.FC = () => {
  return (
    <NavigationMenu className='flex justify-between bg-grey-lighter dark:bg-grey-darker px-8 py-2 fixed top-0 left-0 right-0 z-10'>
      <Link href="/" className="flex text-2xl transition duration-150 ease-in-out">
        <p className="font-bold text-grey-dark dark:text-white">pro</p>
        <p className="font-bold text-green">ffrr</p>
      </Link>
      <div className='flex items-center justify-center space-x-8'>
        <Link href="/login" className={buttonVariants({ variant: "outline", className: "px-6 text-lg font-medium rounded-xl text-green bg-transparent border-green hover:bg-green hover:text-black transition duration-150 ease-in-out" })}>
          Login
        </Link>
        <ModeToggle />
      </div>
    </NavigationMenu>
  );
};

export default LoggedOutNavbar;