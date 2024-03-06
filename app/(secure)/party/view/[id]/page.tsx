'use client';

import { useEffect } from 'react';
import { usePartyBalanceService, usePartyCollectionService, usePartyService } from '_services';
import { useRouter } from 'next/navigation';
import { CollectionsTable } from '_components/partycollection';

export default View;

function View({ params: { id } }: any) {
    const router = useRouter();
    const partyService = usePartyService();
    const partyBalanceService = usePartyBalanceService();
    const partyCollectionService = usePartyCollectionService();
    const party = partyService.party;
    const partyBalance = partyBalanceService.partyBalance;

    useEffect(() => {
        if (!id) return;

        partyService.getById(id);
    }, [router]);

    useEffect(() => {
        if (!party?.partyCode) return;
        partyBalanceService.getByCode(party?.partyCode);
    }, [party?.partyCode]);

    return (
        <div className="font-sans flex flex-col min-h-screen w-full">
            <div className="rounded-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md rounded-md relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">

                <div className="mt-16">
                    <h1 className="font-bold text-center text-3xl">{party?.company}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium">{party?.partyCode} :: {party?.ownerName}</p>
                    <div className="my-5 px-6">
                        <a href={`mailto:${party?.email}`} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Email :: <span className="font-bold"> {party?.email}</span></a>
                    </div>
                    <div className="w-full">
                        <h3 className="font-medium text-left px-6">Party Information</h3>
                        <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a href="#" className="w-full border-t border-gray-100 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">Accountant:</span> {party?.accountantName}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">Accountant Contact:</span> {party?.accountantContact?.toString()}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">Owner Contact:</span> {party?.ownerContact?.toString()}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">GST Number:</span> {party?.gstNumber ?? 'GST is not provided'}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                                <span className="font-bold">Address:</span> {party?.address}
                            </a>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="rounded-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md rounded-md relative shadow rounded-lg border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                    <div className="border-b px-6">
                        <div className="flex justify-between -mb-px">
                            <div className="text-blue-dark py-4 text-lg">
                                Balance Collection Amount
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center p-6">
                        <div className="mb-2">
                            <span className="text-3xl align-top">INR₹</span>
                            <span className="text-5xl">{partyBalance?.dueAmount?.toString() ?? 0}</span>
                        </div>
                    </div>
                </div>
                <h4 className="text-center text-bold text-4xl my-4">Party Collections</h4>
                <CollectionsTable partyCode={party?.partyCode + ''} />
            </div>
        </div>
    );
}