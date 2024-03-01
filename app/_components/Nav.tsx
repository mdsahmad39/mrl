'use client';

import { useState } from 'react';
import { useUserService } from '../_services';
import { NavLink } from './NavLink';


export { Nav };

function Nav() {
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const userService = useUserService();

    async function logout() {
        setLoggingOut(true);
        await userService.logout();
    }

    return (
        <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4">
                <div className='flex items-center justify-between h-16'>
                    <span className="text-2xl font-semibold">MRL</span>
                    <div className="flex space-x-4">
                        <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                        <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                        <NavLink href="/party" className="nav-item nav-link">Party</NavLink>
                        <NavLink href="/partycollection" className="nav-item nav-link">Party Collection</NavLink>
                        <button onClick={logout} className="btn btn-link nav-item nav-link" style={{ width: '67px' }} disabled={loggingOut}>
                            {loggingOut
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Logout</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}