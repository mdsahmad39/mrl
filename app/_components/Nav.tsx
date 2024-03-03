'use client';

import { useState } from 'react';
import { useUserService } from '../_services';
import { NavLink } from './NavLink';


export { Nav };

function Nav() {
    const [loggingOut, setLoggingOut] = useState<boolean>(false);
    const [nav, setNav] = useState(false);
    const userService = useUserService();

    const navItems = [
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Users', path: '/users' },
        { id: 3, title: 'Party', path: '/party' },
        { id: 4, title: 'Party Collections', path: '/partycollection' },
    ];

    async function logout() {
        setLoggingOut(true);
        await userService.logout();
    }
    const handleNav = () => {
        setNav(!nav);
    };

    const LogoutButton = () => {
        return (
            <button onClick={logout} className="btn btn-link nav-item nav-link" style={{ width: '67px' }} disabled={loggingOut}>
                {loggingOut
                    ? <span className="spinner-border spinner-border-sm"></span>
                    : <span>Logout</span>
                }
            </button>
        );
    }

    return (
        <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4">
                <div className='flex items-center justify-between h-16'>
                    <span className="w-full text-3xl font-bold">MRL</span>
                    <div className="flex space-x-4 hidden md:flex">
                        <ul className='hidden md:flex'>
                            {navItems.map(item => (
                                <li
                                    key={item.id}
                                    className='p-4 hover:bg-[#13274F] rounded-xl m-2 cursor-pointer duration-300'
                                >
                                    <NavLink key={item?.id} href={item?.path} exact className="nav-item nav-link">{item?.title}</NavLink>
                                </li>
                            ))}
                            <li className='p-4 hover:bg-[#13274F] rounded-xl m-2 cursor-pointer duration-300'>
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                    <div onClick={handleNav} className='block md:hidden'>
                        {nav ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
                    </div>

                    {/* Mobile Navigation Menu */}
                    <ul
                        className={
                            nav
                                ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                        }
                    >
                        <h1 className='w-full text-3xl font-bold m-4'>MRL</h1>
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className='p-4 rounded-xl duration-300 cursor-pointer bg-[#13274F] rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 border border-gray-100'
                                onClick={handleNav}
                            >
                                <NavLink key={item?.id} href={item?.path} exact className="nav-item nav-link">{item?.title}</NavLink>
                            </li>
                        ))}
                        <li className='p-4 rounded-xl duration-300 cursor-pointer bg-[#13274F] rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100 border border-gray-100'>
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}