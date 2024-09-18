interface User {
  userId: string;
  firstName: string;
  email: string;
  partnerId?: string;
  isActive: boolean;
  isAdmin: boolean;
  isMerchant: boolean;
  isCustomer: boolean;
  isInternal: boolean;
}

export default User;
