'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useAlertService, usePartyCollectionService, usePartyService } from '_services';
import { useEffect, useState } from 'react';

export { AddEdit };

function AddEdit({ title, partyCollection }: { title: string, partyCollection?: any }) {
    const router = useRouter();
    const alertService = useAlertService();
    const partyCollectionService = usePartyCollectionService();
    const partyService = usePartyService();
    const parties = partyService.parties;
    const [senderPartyCode, setSenderPartyCode] = useState('');
    const [receiverPartyCode, setReceiverPartyCode] = useState('');
    const [paymentPartyCode, setPaymentPartyCode] = useState('');

    useEffect(() => {
        partyService.getAll();
    }, []);


    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm({ defaultValues: partyCollection });
    const { errors } = formState;

    const fields = {
        collectionCode: register('collectionCode', { required: 'Collection code is required' }),
        billingDate: register('billingDate', { required: 'Billing Date is required' }),
        truckNumber: register('truckNumber', { required: 'Truck Number is required' }),
        sourceDestination: register('sourceDestination', { required: 'Source Destination is required' }),
        senderPartyCode: register('senderPartyCode', { required: 'Sender Party code is required' }),
        receiverPartyCode: register('receiverPartyCode', { required: 'Receiver Party code is required' }),
        paymentPartyCode: register('paymentPartyCode', { required: 'Payment Party code is required' }),
        invoiceNumber: register('invoiceNumber', { required: 'Invoice number is required' }),
        commodities: register('commodities', { required: 'Commodities is required' }),
        weight: register('weight', { required: 'Weight is required' }),
        freight: register('freight', { required: 'Freight is required' }),
        partyDeductions: {
            description: register('partyDeductions.description', { required: 'Owner Name is required' }),
            amount: register('partyDeductions.amount', { required: 'Owner Name is required' }),
        },
        receivedAmount: register('receivedAmount', { required: 'Received amount is required' }),
        balanceAmount: register('balanceAmount', { required: 'Balance amount is required' }),
        paymentDate: register('paymentDate', { required: 'Payment date is required' }),
        modeOfPayment: register('modeOfPayment', { required: 'Mode of payment is required' }),
        reference: register('reference', { required: 'Reference is required' }),
        remarks: register('remarks'),
    };

    async function onSubmit(data: any) {
        alertService.clear();
        try {
            let message;
            const senderParty = parties?.find(p => p.partyCode === senderPartyCode);
            const receiverParty = parties?.find(p => p.partyCode === receiverPartyCode);
            const paymentParty = parties?.find(p => p.partyCode === paymentPartyCode);
            const finalData = {
                ...data,
                senderParty: {
                    code: senderParty?.partyCode,
                    name: senderParty?.company,
                    contact: senderParty?.accountantContact,
                },
                receiverParty: {
                    code: receiverParty?.partyCode,
                    name: receiverParty?.company,
                    contact: receiverParty?.accountantContact,
                },
                paymentParty: {
                    code: paymentParty?.partyCode,
                    name: paymentParty?.company,
                    contact: paymentParty?.accountantContact,
                },
            }
            if (partyCollection) {
                await partyCollectionService.update(partyCollection.id, finalData);
                message = 'Party collection updated';
            } else {
                await partyCollectionService.create(finalData);
                message = 'Party collection added';
            }

            router.push('/partycollection');
            alertService.success(message, true);
        } catch (error: any) {
            alertService.error(error);
        }
    }

    return (
        <div className='shadow-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md mt-20 py-10 px-8 rounded-md'>
            <h4 className="text-center text-2xl">{title}</h4>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap gap-4 content-around'>
                <div className="mb-4">
                    <label className="form-label">Party Collection Code</label>
                    <input {...fields.collectionCode} type="text" className={`form-control bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Will be generated after creation' disabled />
                </div>
                <div className="mb-4">
                    <label className="form-label">Billing Date</label>
                    <input {...fields.billingDate} type="date" className={`form-control ${errors.billingDate ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} />
                    <div className="invalid-feedback">{errors.billingDate?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Truck Number</label>
                    <input {...fields.truckNumber} type="text" className={`form-control ${errors.truckNumber ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Truck Number' />
                    <div className="invalid-feedback">{errors.truckNumber?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Source Destination</label>
                    <input {...fields.sourceDestination} type="text" className={`form-control ${errors.sourceDestination ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Source Destination' />
                    <div className="invalid-feedback">{errors.sourceDestination?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Sender Party</label>
                    <select {...fields.senderPartyCode} className={`form-select ${errors.senderPartyCode ? 'is-invalid' : ''}`} name="senderPartyCode" required onChange={(e) => {
                        setSenderPartyCode(e.target.value)
                    }} tabIndex={6}>
                        <option value="">Select Sender Party</option>
                        {parties
                            ?.sort((a, b) => a?.company?.toString().localeCompare(b?.company?.toString()))
                            .map((party) => (
                                <option key={party.id} value={party?.partyCode?.toString()}>{`${party.company}`}</option>
                            ))}
                    </select>
                    <div className="invalid-feedback">{errors.senderPartyCode?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Receiver Party</label>
                    <select {...fields.receiverPartyCode} className={`form-select ${errors.receiverPartyCode ? 'is-invalid' : ''}`} name="receiverPartyCode" required onChange={(e) => {
                        setReceiverPartyCode(e.target.value)
                    }} tabIndex={6}>
                        <option value="">Select Receiver Party</option>
                        {parties
                            ?.sort((a, b) => a?.company?.toString().localeCompare(b?.company?.toString()))
                            .map((party) => (
                                <option key={party.id} value={party?.partyCode?.toString()}>{`${party.company}`}</option>
                            ))}
                    </select>
                    <div className="invalid-feedback">{errors.receiverPartyCode?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Payment Party</label>
                    <select {...fields.paymentPartyCode} className={`form-select ${errors.paymentPartyCode ? 'is-invalid' : ''}`} name="paymentPartyCode" required onChange={(e) => {
                        setPaymentPartyCode(e.target.value)
                    }} tabIndex={6}>
                        <option value="">Select Payment Party</option>
                        {parties
                            ?.sort((a, b) => a?.company?.toString().localeCompare(b?.company?.toString()))
                            .map((party) => (
                                <option key={party.id} value={party?.partyCode?.toString()}>{`${party.company}`}</option>
                            ))}
                    </select>
                    <div className="invalid-feedback">{errors.paymentPartyCode?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Invoice Number</label>
                    <input {...fields.invoiceNumber} type="text" className={`form-control ${errors.invoiceNumber ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Invoice Number' />
                    <div className="invalid-feedback">{errors.invoiceNumber?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Commodities</label>
                    <input {...fields.commodities} type="text" className={`form-control ${errors.commodities ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='commodities' />
                    <div className="invalid-feedback">{errors.commodities?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Weight</label>
                    <input {...fields.weight} type="number" className={`form-control ${errors.weight ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='weight' />
                    <div className="invalid-feedback">{errors.weight?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Freight</label>
                    <input {...fields.freight} type="number" className={`form-control ${errors.freight ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Freight' />
                    <div className="invalid-feedback">{errors.freight?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Received Amount</label>
                    <input {...fields.receivedAmount} type="text" className={`form-control ${errors.receivedAmount ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Received Amount' />
                    <div className="invalid-feedback">{errors.receivedAmount?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Balance Amount</label>
                    <input {...fields.balanceAmount} type="number" className={`form-control ${errors.balanceAmount ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Balance Amount' />
                    <div className="invalid-feedback">{errors.balanceAmount?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Payment Date</label>
                    <input {...fields.paymentDate} type="date" className={`form-control ${errors.paymentDate ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} />
                    <div className="invalid-feedback">{errors.paymentDate?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Mode of Payment</label>
                    <input {...fields.modeOfPayment} type="text" className={`form-control ${errors.modeOfPayment ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Mode of Payment' />
                    <div className="invalid-feedback">{errors.modeOfPayment?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Reference</label>
                    <input {...fields.reference} type="text" className={`form-control ${errors.reference ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Reference' />
                    <div className="invalid-feedback">{errors.reference?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Remarks</label>
                    <input {...fields.remarks} type="text" className={`form-control ${errors.remarks ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Remarks' />
                    <div className="invalid-feedback">{errors.remarks?.message?.toString()}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 content-around">
                    <div><button type="submit" disabled={formState.isSubmitting} className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Save
                    </button></div>
                    <div><button onClick={() => reset()} type="button" disabled={formState.isSubmitting} className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Reset</button></div>
                    <div><Link href="/partycollections" className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Cancel</Link></div>
                </div>
            </form>
        </div>
    );
}