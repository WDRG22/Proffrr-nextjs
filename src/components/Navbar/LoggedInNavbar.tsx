import AdminNavItems from "./NavItems/AdminNavItems";
import CustomerNavItems from "./NavItems/CustomerNavItems";
import MerchantNavItems from "./NavItems/MerchantNavItems";

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