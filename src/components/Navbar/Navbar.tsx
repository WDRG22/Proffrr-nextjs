// import { useAuth } from '@/hooks/useAuth';
import LoggedOutNavbar from './LoggedOutNavbar';
import LoggedInNavbar from './LoggedInNavbar';

export default function Navbar() {
  return <LoggedOutNavbar />;
  // const { isLoggedIn, userRole } = useAuth();

  // if (!isLoggedIn) {
  //   return <LoggedOutNavbar />;
  // }
  // return <LoggedInNavbar userRole={userRole} />;
}