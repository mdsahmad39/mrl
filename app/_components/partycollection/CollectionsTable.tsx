import { Spinner } from "_components";
import { IPartyCollection } from "_services";
import Link from "next/link";

export { CollectionsTable };

function CollectionsTable(partyCollections: any) {
    return (
        <table id="collections" className="bg-white table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">S.No</th>
                    <th className="px-4 py-2">Billing Date</th>
                    <th className="px-4 py-2">From - To</th>
                    <th className="px-4 py-2">Balance</th>
                    <th className="px-4 py-2">Paid</th>
                    <th className="px-4 py-2">Payment Reference</th>
                </tr>
            </thead>
            <tbody>
                <CollectionsTableBody partyCollections={partyCollections} />
            </tbody>
        </table>
    );
}


function CollectionsTableBody(partyCollections: any) {
    if (partyCollections?.length) {
        return (partyCollections.map((coll: IPartyCollection, i: number) =>
            <tr key={coll?.id?.toString()}>
                <td className="border px-4 py-2">{i + 1}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                    <Link href={`/party`} className="btn btn-sm btn-primary me-1"><i className="fa-solid fa-eye"></i></Link>
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