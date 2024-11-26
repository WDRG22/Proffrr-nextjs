import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (    
    <div className='flex flex-col h-full'>    
      <Navbar/>
        <main className='flex flex-grow flex-col justify-center items-center mx-auto'>
          <h1 className="text-4xl font-bold mb-6">Unauthorized Access</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You don't have permission to access this page.
          </p>
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </main>
      </div>
  );
}