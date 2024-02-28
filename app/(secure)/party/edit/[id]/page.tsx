'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AddEdit } from '_components/party';
import { Spinner } from '_components';
import { usePartyService } from '_services';

export default Edit;

function Edit({ params: { id } }: any) {
    const router = useRouter();
    const partyService = usePartyService();
    const party = partyService.party;

    useEffect(() => {
        if (!id) return;

        // fetch user for add/edit form
        partyService.getById(id)
    }, [router]);

    return party
        ? <AddEdit title="Edit Party" party={party} />
        : <Spinner />;
}