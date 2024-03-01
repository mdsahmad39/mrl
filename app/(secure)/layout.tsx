import { SpeedInsights } from "@vercel/speed-insights/next"
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '../_helpers/server';
import { Alert, Nav } from '_components';


export default Layout;

function Layout({ children }: { children: React.ReactNode }) {
    <SpeedInsights />
    if (!auth.isAuthenticated()) {
        const returnUrl = encodeURIComponent(headers().get('x-invoke-path') || '/');
        redirect(`/account/login?returnUrl=${returnUrl}`);
    }

    return (
        <div className="">
            <Nav />
            <Alert />
            <div className="p-4 items-center">
                {children}
            </div>
        </div>
    );
}