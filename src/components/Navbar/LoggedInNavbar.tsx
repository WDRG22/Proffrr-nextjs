import AdminNavItems from "./navItems/AdminNavItems";
import CustomerNavItems from "./navItems/CustomerNavItems";
import MerchantNavItems from "./navItems/MerchantNavItems";

export default function LoggedInNavbar({ userRole }) {
    return (
      <nav>
        {/* Common logged-in user content */}
        {userRole === 'admin' && <AdminNavItems />}
        {userRole === 'merchant' && <MerchantNavItems />}
        {userRole === 'consumer' && <CustomerNavItems />}
      </nav>
    );
  }