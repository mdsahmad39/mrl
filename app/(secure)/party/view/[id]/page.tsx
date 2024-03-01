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
    const partyCollections = partyCollectionService.partyCollections;

    useEffect(() => {
        if (!id) return;

        // fetch user for add/edit form
        partyService.getById(id)
    }, [router]);

    useEffect(() => {
        if (!party?.partyCode) return;
        partyBalanceService.getByCode(party?.partyCode);
        partyCollectionService.getByCode(party?.partyCode);
    }, [party]);

    return (
        <div className="font-sans bg-grey-lighter flex flex-col min-h-screen w-full">
            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">

                <div className="mt-16">
                    <h1 className="font-bold text-center text-3xl text-gray-900">{party?.company}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium">{party?.partyCode} :: {party?.ownerName}</p>
                    <div className="my-5 px-6">
                        <a href={`mailto:${party?.email}`} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Email :: <span className="font-bold"> {party?.email}</span></a>
                    </div>
                    <div className="w-full">
                        <h3 className="font-medium text-gray-900 text-left px-6">Party Information</h3>
                        <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">Accountant:</span> {party?.accountantName}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">Accountant Contact:</span> {party?.accountantContact?.toString()}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">Owner Contact:</span> {party?.ownerContact?.toString()}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <span className="font-bold">GST Number:</span> {party?.gstNumber ?? 'GST is not provided'}
                            </a>
                            <a href="#" className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                                <span className="font-bold">Address:</span> {party?.address}
                            </a>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="bg-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6">
                    <div className="border-b px-6">
                        <div className="flex justify-between -mb-px">
                            <div className="text-blue-dark py-4 text-lg">
                                Balance Collection Amount
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center p-6">
                        <div className="text-grey-darker mb-2">
                            <span className="text-3xl align-top">INR₹</span>
                            <span className="text-5xl">{partyBalance?.dueAmount?.toString() ?? 0}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-4">
                    <CollectionsTable partyCollection={partyCollections} />
                </div>
            </div>
        </div>
    );
}