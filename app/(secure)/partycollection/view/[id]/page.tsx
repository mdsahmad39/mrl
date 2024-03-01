'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { usePartyCollectionService } from '_services';
import { useEffect } from 'react';
import dateFormatter from '_components/utils/globalutils';

export default View;

function View({ params: { id } }: any) {
    const router = useRouter();
    const partyCollectionService = usePartyCollectionService();
    const partyCollection = partyCollectionService.partyCollection;

    useEffect(() => {
        if (!id) return;
        partyCollectionService.getById(id)
    }, [router, id]);


    return (
        <div className='w-full rounded-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md mt-20 py-10 px-8 justify-center rounded-md'>
            <h4 className="text-center text-bold text-4xl my-4">{partyCollection?.collectionCode}</h4>
            <div className='flex flex-wrap gap-10 justify-evenly'>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Party Collection Code</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.collectionCode}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Billing Date</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {dateFormatter(partyCollection?.billingDate!)}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Truck Number</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.truckNumber}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Source Destination</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.sourceDestination}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="block mb-2 text-sm font-medium">Sender Party</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.senderParty?.name}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="block mb-2 text-sm font-medium">Receiver Party</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.receiverParty?.name}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="block mb-2 text-sm font-medium">Payment Party</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.paymentParty?.name}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Invoice Number</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.invoiceNumber}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Commodities</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.commodities}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Weight</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.weight?.toString()}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Freight</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.freight?.toString()}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Received Amount</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.receivedAmount?.toString()}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Balance Amount</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.balanceAmount?.toString()}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Payment Date</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {dateFormatter(partyCollection?.paymentDate!)}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Mode of Payment</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.modeOfPayment}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Reference</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.reference}
                    </p>
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                    <label className="form-label">Remarks</label>
                    <p className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`}>
                        {partyCollection?.remarks}
                    </p>
                </div>
                <div className="w-full grid grid-cols-9 gap-4 justify-evenly">
                    <div><Link href="/partycollection" className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Go Back</Link></div>
                </div>
            </div>
        </div>
    );
}