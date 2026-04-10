import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home" />
            <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
            {auth.user ? (
                <p className="text-lg">Hello, {auth.user.name}!</p>
            ) : (
                <p className="text-lg">Please log in to continue.</p>
            )}
            
        </>
    );
}
