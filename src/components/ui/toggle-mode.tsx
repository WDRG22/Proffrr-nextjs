'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      size='icon'
      className='rounded-xl bg-transparent shadow-none hover:bg-grey-200 dark:hover:bg-grey-700'
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <MoonIcon className='h-[1.5rem] w-[1.5rem]' />
      ) : (
        <SunIcon className='h-[1.5rem] w-[1.5rem]' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
