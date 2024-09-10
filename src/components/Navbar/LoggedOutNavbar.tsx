import React from 'react';
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const LoggedOutNavbar: React.FC = () => {
  return (
    <nav className="w-screen bg-white shadow-md">
        <NavigationMenu className="h-16">
          <NavigationMenuList className="flex justify-between items-center h-full">
            <div>
              <NavigationMenuItem>
                <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  proffrr
                </Link>
              </NavigationMenuItem>
            </div>
            <div className="flex items-center space-x-4">
              <NavigationMenuItem>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">
                  Login
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/registration" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                  Register
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
    </nav>
  );
};

export default LoggedOutNavbar;