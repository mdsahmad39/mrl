'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Spinner } from '_components';
import { usePartyService } from '_services';

export default Users;

function Users() {
    const partyService = usePartyService();
    const parties = partyService.parties;

    useEffect(() => {
        partyService.getAll();
    }, []);

    return (
        <>
            <h1 className='text-center text-3xl font-bold'>Parties</h1>
            <div className='m-5'>
                <Link href="/party/add" className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Add Party</Link>
            </div>
            <div className='overflow-auto rounded-lg bg-opacity-20 backdrop-filter backdrop-blur-md bg-slate-300 shadow border'>
                <table id="collections" className="w-full text-white table-auto">
                    <thead>
                        <tr className='text-left'>
                            <th className='px-2 py-1'>S.No</th>
                            <th className='px-2 py-1'>Party Code</th>
                            <th className='px-2 py-1'>Company</th>
                            <th className='px-2 py-1'>Owner Name</th>
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
        if (parties?.length) {
            return (parties.map((party, i) =>
                <tr key={party.id}>
                    <td className='px-2 py-1'>{i + 1}</td>
                    <td className='px-2 py-1'>{party.partyCode}</td>
                    <td className='px-2 py-1'>{party.company}</td>
                    <td className='px-2 py-1'>{party.ownerName}</td>
                    <td className='px-2 py-1' style={{ whiteSpace: 'nowrap' }}>
                        <Link href={`/party/edit/${party.id}`} className="btn btn-sm btn-primary me-1"><i className="fa-solid fa-pen-to-square"></i></Link>
                        <Link href={`/party/view/${party.id}`} className="btn btn-sm btn-primary me-1"><i className="fa-solid fa-eye"></i></Link>
                    </td>
                </tr>
            ));
        }

        if (!parties) {
            return (
                <tr>
                    <td colSpan={4}>
                        <Spinner />
                    </td>
                </tr>
            );
        }

        if (parties?.length === 0) {
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