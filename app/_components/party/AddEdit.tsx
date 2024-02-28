'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { useAlertService, usePartyService } from '_services';

export { AddEdit };

function AddEdit({ title, party }: { title: string, party?: any }) {
    const router = useRouter();
    const alertService = useAlertService();
    const partyService = usePartyService();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm({ defaultValues: party });
    const { errors } = formState;

    const fields = {
        partyCode: register('partyCode'),
        ownerName: register('ownerName', { required: 'Owner Name is required' }),
        accountantName: register('accountantName', { required: 'Accountant Name is required' }),
        company: register('company'),
        gstNumber: register('gstNumber'),
        ownerContact: register('ownerContact', {
            maxLength: { value: 10, message: 'length should be 10 digits' },
            minLength: { value: 10, message: 'length should be 10 digits' },
            required: 'Owner contact is required'
        }),
        accountantContact: register('accountantContact', {
            maxLength: { value: 10, message: 'length should be 10 digits' },
            minLength: { value: 10, message: 'length should be 10 digits' },
        }),
        subjectedTo: register('subjectedTo'),
        address: register('address', {
            minLength: { value: 10, message: 'Address must be at least 10 characters' },
            maxLength: { value: 80, message: 'Address must be at less than 80 characters' },
            required: 'Address is required',
        }),
    };

    async function onSubmit(data: any) {
        alertService.clear();
        try {
            let message;
            if (party) {
                await partyService.update(party.id, data);
                message = 'Party updated';
            } else {
                await partyService.create(data);
                message = 'Party added';
            }

            router.push('/party');
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
                    <label className="form-label">Party Code</label>
                    <input {...fields.partyCode} type="text" className={`form-control bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Will be generated after creation' disabled />
                </div>
                <div className="mb-4">
                    <label className="form-label">Owner Name</label>
                    <input {...fields.ownerName} type="text" className={`form-control ${errors.ownerName ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Owner Name' />
                    <div className="invalid-feedback">{errors.ownerName?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Accountant Name</label>
                    <input {...fields.accountantName} type="text" className={`form-control ${errors.accountantName ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Accountant Name' />
                    <div className="invalid-feedback">{errors.accountantName?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Company</label>
                    <input {...fields.company} type="text" className={`form-control ${errors.company ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Company' />
                    <div className="invalid-feedback">{errors.company?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">GST Number</label>
                    <input {...fields.gstNumber} type="text" className={`form-control ${errors.gstNumber ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='GST Number' />
                    <div className="invalid-feedback">{errors.gstNumber?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Owner Contact</label>
                    <input {...fields.ownerContact} type="number" className={`form-control ${errors.ownerContact ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Owner Contact Number' />
                    <div className="invalid-feedback">{errors.ownerContact?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Accountant Contact</label>
                    <input {...fields.accountantContact} type="number" className={`form-control ${errors.accountantContact ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Accountant Contact Number' />
                    <div className="invalid-feedback">{errors.accountantContact?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Subjected To</label>
                    <input {...fields.subjectedTo} type="text" className={`form-control ${errors.subjectedTo ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Subjected To Jurisdiction' />
                    <div className="invalid-feedback">{errors.subjectedTo?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Address</label>
                    <input {...fields.address} type="textarea" className={`form-control ${errors.address ? 'is-invalid' : ''}  bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} placeholder='Address' />
                    <div className="invalid-feedback">{errors.address?.message?.toString()}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 content-around">
                    <div><button type="submit" disabled={formState.isSubmitting} className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Save
                    </button></div>
                    <div><button onClick={() => reset()} type="button" disabled={formState.isSubmitting} className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Reset</button></div>
                    <div><Link href="/users" className="backdrop bg-white bg-opacity-0 border border-gray px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-40 hover:bg-opacity-50 text-lg">Cancel</Link></div>
                </div>
            </form>
        </div>
    );
}