'use client';

import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DateFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const date = new Date();
    let defaultStartDate = dayjs(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DD');
    let defaultEndDate = dayjs(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('YYYY-MM-DD');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('startDate', defaultStartDate);
        params.set('endDate', defaultEndDate);
        replace(`${pathname}?${params.toString()}`);
    }, [])

    const handleInput = (date: string, key: string) => {
        const params = new URLSearchParams(searchParams);
        if (date) {
            params.set(key, date);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="border rounded-md shadow-inner shadow-slate-600/90">
            <h4 className="text-center text-bold text-2xl mt-4">Filter By Date</h4>
            <div className="flex flex-wrap gap-10 justify-evenly">
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-1 px-5">
                    <label className="block text-white-700 text-sm font-bold mb-2">Start Date</label>
                    <input
                        type="date"
                        defaultValue={defaultStartDate}
                        className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md py-[9px] pl-2 outline-none w-full`}
                        onChange={(e) => {
                            handleInput(e.target.value, 'startDate');
                        }}
                    />
                </div>
                <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 px-5">
                    <label className="block text-white-700 text-sm font-bold mb-2">End Date</label>
                    <input
                        type="date"
                        defaultValue={defaultEndDate}
                        className={`bg-white bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md py-[9px] pl-2 outline-none w-full`}
                        onChange={(e) => {
                            handleInput(e.target.value, 'endDate');
                        }}
                    />
                </div>
            </div>
        </div>
    );
}