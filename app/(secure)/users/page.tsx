'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useUserService } from '../../_services';
import { Spinner } from '../../_components/Spinner';

export default Users;

function Users() {
    const userService = useUserService();
    const users = userService.users;

    useEffect(() => {
        userService.getAll();
    }, []);

    return (
        <>
            <h1 className='text-center text-3xl font-bold'>Users</h1>
            <div className='m-5'>
                <Link href="/users/add" className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Add User</Link>
            </div>
            <div className='overflow-auto rounded-lg bg-opacity-20 backdrop-filter backdrop-blur-md bg-slate-300 shadow border'>
                <table className="w-full">
                    <thead>
                        <tr className='text-left'>
                            <th className='px-2 py-1'>S.No</th>
                            <th className='px-2 py-1'>User Name</th>
                            <th className='px-2 py-1'>Role</th>
                            <th className='px-2 py-1'>Status</th>
                            <th className='px-2 py-1'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableBody />
                    </tbody>
                </table>
            </div>
        </>
    );

    function TableBody() {
        if (users?.length) {
            return (users.map((user, i) =>
                <tr key={user.id}>
                    <td className='px-2 py-1'>{i + 1}</td>
                    <td className='px-2 py-1'>{user.username}</td>
                    <td className='px-2 py-1'>{user.role}</td>
                    <td className='px-2 py-1'>{user.isActive ? 'Active' : 'Inactive'}</td>
                    <td className='px-2 py-1' style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-1"><i className="fa-solid fa-pen-to-square"></i></Link>
                    </td>
                </tr>
            ));
        }

        if (!users) {
            return (
                <tr>
                    <td colSpan={4}>
                        <Spinner />
                    </td>
                </tr>
            );
        }

        if (users?.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className="text-center">
                        <div className="p-2">No Users To Display</div>
                    </td>
                </tr>
            );
        }
    }
}