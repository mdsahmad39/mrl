'use client';

import { Spinner } from "_components";
import DateFilter from "_components/ui/dateFilter";
import Search from "_components/ui/search";
import dateFormatter from "_components/utils/globalutils";
import { IPartyCollection, usePartyCollectionService } from "_services";
import Link from "next/link";
import React, { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintableCollectionsTable } from "./print/CollectionsTable";

export { CollectionsTable };

interface Props {
    searchParams?: {
        query?: string;
        startDate?: string;
        endDate?: string;
    },
    partyCode?: string,
}

function CollectionsTable({ searchParams, partyCode }: Props) {
    const query = searchParams?.query || '';
    const startDate = searchParams?.startDate || '';
    const endDate = searchParams?.endDate || '';
    const partyCollectionService = usePartyCollectionService();
    const partyCollections = partyCollectionService.partyCollections;

    useEffect(() => {
        if (partyCode) {
            partyCollectionService.getByCode(partyCode, startDate, endDate);
        } else {
            partyCollectionService.getAll(query, startDate, endDate);
        }
    }, [partyCode, query, startDate, endDate]);

    const printRef = React.useRef<any>();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        pageStyle: () => "@page { size: landscape; }"
    });

    return (
        <>
            <Search placeholder="Search with invoices, truck, party..." />
            <DateFilter />
            <h4 className="text-center text-bold text-4xl my-4">Results <i className="fa fa-download cursor-pointer" onClick={handlePrint}></i></h4>
            <div className="hidden">
                <div ref={printRef} >
                    <PrintableCollectionsTable partyCollections={partyCollections} />
                </div>
            </div>
            <div className='overflow-auto bg-white-900 text-black rounded-lg bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-100 shadow border'>
                <table id="collections" className="w-full text-white table-auto">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1">S.No</th>
                            <th className="border px-2 py-1">Truck No.</th>
                            <th className="border px-2 py-1">Invoice</th>
                            <th className="border px-2 py-1">Payment Party</th>
                            <th className="border px-2 py-1">Freight</th>
                            <th className="border px-2 py-1">Received Amount</th>
                            <th className="border px-2 py-1">Billing Date</th>
                            <th className="border px-2 py-1">Payment Date</th>
                            <th className="border px-2 py-1">Balance Amount</th>
                            <th className="border px-2 py-1">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CollectionsTableBody partyCollections={partyCollections} />
                    </tbody>
                </table>
            </div>
        </>
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
                <td className="border px-2 py-1">{dateFormatter(coll?.billingDate)}</td>
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