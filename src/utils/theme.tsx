import { useState, useEffect } from 'react';
import localforage from 'localforage';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localforage.getItem('theme').then((theme) => {
      return theme || 'light';
    });
    return storedTheme;
  });

  useEffect(() => {
    localforage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useTheme;