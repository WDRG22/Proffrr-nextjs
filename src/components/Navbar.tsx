'use client';
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/toggle-mode';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { buttonVariants } from '@/components/ui/button';

export default function Navbar() {
  return (
    <NavigationMenu className='bg-theme fixed left-0 right-0 top-0 z-10 flex justify-between px-8 py-2'>
      <Link
        href='/'
        className='flex text-2xl transition duration-150 ease-in-out'
      >
        <p className='text-grey-dark font-bold dark:text-white'>pro</p>
        <p className='font-bold text-green'>ffrr</p>
      </Link>
      <div className='flex items-center justify-center space-x-8'>
        <Link
          href='/login'
          className={buttonVariants({
            variant: 'outline',
            className:
              'rounded-xl border-green bg-transparent px-6 text-lg font-medium text-green transition duration-150 ease-in-out hover:bg-green hover:text-white dark:hover:text-black',
          })}
        >
          Login
        </Link>
        <ModeToggle />
      </div>
    </NavigationMenu>
  );
}
