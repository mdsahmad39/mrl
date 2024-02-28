'use client';

import { useUserService } from '_services';
import Link from 'next/link';
import { useForm } from 'react-hook-form';


export default Register;

function Register() {
    const userService = useUserService();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const fields = {
        name: register('name', { required: 'Name is required' }),
        username: register('username', { required: 'Username is required' }),
        password: register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
        }),
        role: register('role', { required: 'User Role is required' }),
        email: register('email', { required: 'Email is required' }),
    }

    async function onSubmit(user: any) {
        await userService.register(user);
    }

    return (
        <div className='w-96 shadow-2xl shadow-slate-900 mx-auto text-white bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md mt-20 py-10 px-8 rounded-md'>
            <h4 className="text-center text-2xl">Register</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="form-label">Full Name</label>
                    <input {...fields.name} type="text" className={`form-control ${errors.name ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} />
                    <div className="invalid-feedback">{errors.name?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Username</label>
                    <input {...fields.username} type="text" className={`form-control ${errors.username ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} />
                    <div className="invalid-feedback">{errors.username?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Role</label>
                    <input {...fields.role} type="text" className={`form-control ${errors.role ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} />
                    <div className="invalid-feedback">{errors.role?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input {...fields.email} type="text" className={`form-control ${errors.email ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} />
                    <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
                </div>
                <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''} bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full`} />
                    <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                </div>
                <button disabled={formState.isSubmitting} className="mt-1 bg-white bg-opacity-30 hover:bg-opacity-40 transition duration-500 rounded-md shadow-md shadow-slate-600/70 p-3 w-full font-semibold">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Register
                </button>
                <Link href="/account/login" className="text-center pt-4 text-sm">Already have an account?</Link>
            </form>
        </div>
    );
}