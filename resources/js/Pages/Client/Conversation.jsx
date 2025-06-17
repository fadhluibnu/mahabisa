import { useEffect } from 'react';
import { router } from '@inertiajs/react';

// Component ini sekarang hanya akan melakukan redirect ke halaman messages dengan parameter query yang tepat
export default function Conversation({ otherUser }) {
    useEffect(() => {
        // Redirect ke halaman messages yang dinamis
        router.visit(`/client/messages?with=${otherUser.id}`);
    }, [otherUser]);

    // Return placeholder loading state sementara redirect berlangsung
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Mengalihkan ke percakapan...</p>
            </div>
        </div>
    );
}
