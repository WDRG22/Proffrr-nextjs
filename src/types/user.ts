interface User {
    id: string;
    userId: string;
    firstName: string;
    email: string;
    partnerId?: string; // Make optional if not always present
    isActive: boolean;
    isAdmin: boolean;
    isMerchant: boolean;
    isCustomer: boolean;
    isInternal: boolean;
  }

  export default User