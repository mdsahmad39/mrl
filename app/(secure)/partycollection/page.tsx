'use client';

import { useEffect } from 'react';
import { usePartyCollectionService } from '_services';
import { CollectionsTable } from '_components/partycollection';
import Link from 'next/link';

export default Collections;

function Collections() {
    const partyCollectionService = usePartyCollectionService();
    const partyCollections = partyCollectionService.partyCollections;

    useEffect(() => {
        partyCollectionService.getAll();
    }, []);

    return (
        <div className="font-sans bg-grey-lighter flex flex-col min-h-screen w-full">
            <h1 className='text-center text-3xl font-bold'>Party Collections</h1>
            <div className="w-full sm:px-4 pt-6 pb-8">
                <div className='m-5'>
                    <Link href="/partycollection/add" className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Add Party Collection</Link>
                </div>
                <CollectionsTable partyCollections={partyCollections} />
            </div>
        </div>
    );
}