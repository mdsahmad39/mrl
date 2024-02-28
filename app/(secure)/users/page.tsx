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
            <table className="table-fixed w-full bg-opacity-20 backdrop-filter backdrop-blur-md bg-slate-300 rounded-lg shadow">
                <thead>
                    <tr className='text-left'>
                        <th>S.No</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TableBody />
                </tbody>
            </table>
        </>
    );

    function TableBody() {
        if (users?.length) {
            return (users.map((user, i) =>
                <tr key={user.id}>
                    <td>{i + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                        <button onClick={() => userService.delete(user.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={user.isDeleting}>
                            {user.isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
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