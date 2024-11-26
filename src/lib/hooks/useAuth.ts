import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type RouteType = 'admin' | 'merchant' | 'customer' | 'public'

export const useProtectedRoute = (routeType: RouteType) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        // Early return if still loading
        if (status === 'loading') return;

        // Handle public routes
        if (routeType === 'public') return;

        // Handle unauthenticated users
        if (!session) {
            router.push('/auth/signin');
            return;
        }

        // Use object lookup to check route authorization
        if (session?.user) {
            const { isAdmin, isMerchant, isCustomer } = session.user
            
            const hasAccess = {
                admin: isAdmin,
                merchant: isMerchant,
                customer: isCustomer
            }[routeType]

            if (!hasAccess) {
                router.push('/unauthorized')
            }
        }
    }, [session, status, routeType, router]);

    return { session, status }
}