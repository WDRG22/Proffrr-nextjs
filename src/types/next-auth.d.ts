import 'next-auth';

// Augment nextauth Session interface
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            partnerId: string;
            isActive: boolean;
            isAdmin: boolean;
            isMerchant: boolean;
            isCustomer: boolean;
            isInternal: boolean;
        }
    }
}