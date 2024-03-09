'use client';

import dateFormatter from "_components/utils/globalutils";
import { IPartyCollection } from "_services";

export { PrintableCollectionsTable };


function PrintableCollectionsTable({ partyCollections }: any) {
    return (
        <div>
            <h4 className="text-center text-bold text-4xl my-4">Party Collections</h4>
            <div className='bg-white text-black rounded-lg shadow border'>
                <table id="collections" className="w-full table-auto text-sm">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1">S.No</th>
                            <th className="border px-2 py-1">Billing Date</th>
                            <th className="border px-2 py-1">Truck No.</th>
                            <th className="border px-2 py-1">From - To</th>
                            <th className="border px-2 py-1">Sender Party</th>
                            <th className="border px-2 py-1">Receiver Party</th>
                            <th className="border px-2 py-1">Payment Party</th>
                            <th className="border px-2 py-1">Invoice No.</th>
                            <th className="border px-2 py-1">Commodities</th>
                            <th className="border px-2 py-1">Weight</th>
                            <th className="border px-2 py-1">Freight</th>
                            <th className="border px-2 py-1">Received Amount</th>
                            <th className="border px-2 py-1">Payment Date</th>
                            <th className="border px-2 py-1">Balance Amount</th>
                            <th className="border px-2 py-1">Mode of Payment</th>
                            <th className="border px-2 py-1">Payment Reference</th>
                            <th className="border px-2 py-1">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CollectionsTableBody partyCollections={partyCollections} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}


function CollectionsTableBody({ partyCollections }: any) {
    if (partyCollections?.length) {
        return (partyCollections.map((coll: IPartyCollection, i: number) =>
            <tr className="border" key={coll?.id?.toString()}>
                <td className="border px-2 py-1">{i + 1}</td>
                <td className="border px-2 py-1">{dateFormatter(coll?.billingDate)}</td>
                <td className="border px-2 py-1">{coll?.truckNumber}</td>
                <td className="border px-2 py-1">{coll?.sourceDestination}</td>
                <td className="border px-2 py-1">{coll?.senderParty?.name}</td>
                <td className="border px-2 py-1">{coll?.receiverParty?.name}</td>
                <td className="border px-2 py-1">{coll?.paymentParty?.name}</td>
                <td className="border px-2 py-1">{coll?.invoiceNumber}</td>
                <td className="border px-2 py-1">{coll?.commodities}</td>
                <td className="border px-2 py-1">{coll?.weight?.toString()}</td>
                <td className="border px-2 py-1">{coll?.freight?.toString()}</td>
                <td className="border px-2 py-1">{coll?.receivedAmount?.toString()}</td>
                <td className="border px-2 py-1">{dateFormatter(coll?.paymentDate)}</td>
                <td className="border px-2 py-1">{coll?.balanceAmount?.toString()}</td>
                <td className="border px-2 py-1">{coll?.modeOfPayment}</td>
                <td className="border px-2 py-1">{coll?.reference}</td>
                <td className="border px-2 py-1">{coll?.remarks}</td>
            </tr>
        ));
    }

    if (partyCollections?.length === 0) {
        return (
            <tr>
                <td colSpan={4} className="text-center">
                    <div className="p-2">No Collections Data To Display</div>
                </td>
            </tr>
        );
    }
}