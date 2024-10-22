'use client';
import React from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/toggle-mode';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export const Navbar = () => {
  const { status } = useSession()

  return (
    <NavigationMenu className='min-h-16 max-h-16 shrink-0 bg-theme sticky justify-between items-center overflow-hidden top-0 z-10 px-8'>
      <Link
        href='/'
        className='flex text-2xl transition duration-150 ease-in-out'
      >
        <p className='text-grey-dark font-bold dark:text-white'>pro</p>
        <p className='font-bold text-green'>ffrr</p>
      </Link>
      <div className='flex items-center justify-center space-x-8'>
        {status == 'authenticated' ? (
          <Button
            onClick={() => signOut()}
            variant='outline'
            className= 'rounded-xl border-red-500 bg-transparent text-md font-medium text-red transition duration-150 ease-in-out hover:bg-red-500 hover:text-white dark:hover:text-black'
          >
            Sign Out
          </Button>
        ) : (
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
        )}
        <ModeToggle />
      </div>
    </NavigationMenu>
  );
};
