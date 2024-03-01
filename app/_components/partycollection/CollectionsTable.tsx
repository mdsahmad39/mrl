import { Spinner } from "_components";
import dateFormatter from "_components/utils/globalutils";
import { IPartyCollection } from "_services";
import Link from "next/link";

export { CollectionsTable };

function CollectionsTable({ partyCollections }: any) {
    console.log(partyCollections);
    return (
        <table id="collections" className="w-full rounded-2xl shadow-slate-900 text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md py-10 rounded-md table-auto">
            <thead className="border">
                <tr>
                    <th className="border px-2 py-1">S.No</th>
                    <th className="border px-2 py-1">Truck No.</th>
                    <th className="border px-2 py-1">Invoice</th>
                    <th className="border px-2 py-1">Payment Party</th>
                    <th className="border px-2 py-1">Freight</th>
                    <th className="border px-2 py-1">Received Amount</th>
                    <th className="border px-2 py-1">Payment Date</th>
                    <th className="border px-2 py-1">Balance Amount</th>
                    <th className="border px-2 py-1">View</th>
                </tr>
            </thead>
            <tbody>
                <CollectionsTableBody partyCollections={partyCollections} />
            </tbody>
        </table>
    );
}


function CollectionsTableBody({ partyCollections }: any) {
    if (partyCollections?.length) {
        return (partyCollections.map((coll: IPartyCollection, i: number) =>
            <tr className="border" key={coll?.id?.toString()}>
                <td className="border px-2 py-1">{i + 1}</td>
                <td className="border px-2 py-1">{coll?.truckNumber}</td>
                <td className="border px-2 py-1">{coll?.invoiceNumber}</td>
                <td className="border px-2 py-1">{coll?.paymentParty?.name}</td>
                <td className="border px-2 py-1">{coll?.freight?.toString()}</td>
                <td className="border px-2 py-1">{coll?.receivedAmount?.toString()}</td>
                <td className="border px-2 py-1">{dateFormatter(coll?.paymentDate)}</td>
                <td className="border px-2 py-1">{coll?.balanceAmount?.toString()}</td>
                <td className="border px-2 py-1 text-center">
                    <Link href={`/partycollection/view/${coll?.id}`} className="btn btn-sm btn-primary me-1"><i className="fa-solid fa-eye"></i></Link>
                </td>
            </tr>
        ));
    }

    if (!partyCollections) {
        return (
            <tr>
                <td colSpan={4}>
                    <Spinner />
                </td>
            </tr>
        );
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