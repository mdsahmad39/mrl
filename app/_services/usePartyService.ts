import { create } from 'zustand';

import { useAlertService } from '.';
import { useFetch } from '../_helpers/client/useFetch';

export { usePartyService };

const initialState = {
    parties: undefined,
    party: undefined,
};
const partyStore = create<IPartyStore>(() => initialState);

function usePartyService(): IPartyService {
    const alertService = useAlertService();
    const fetch = useFetch();
    const { parties, party } = partyStore();

    return {
        parties,
        party,
        getAll: async () => {
            partyStore.setState({ parties: await fetch.get('/api/party') });
        },
        getById: async (id) => {
            partyStore.setState({ party: undefined });
            try {
                partyStore.setState({ party: await fetch.get(`/api/party/${id}`) });
            } catch (error: any) {
                alertService.error(error);
            }
        },
        create: async (user) => {
            await fetch.post('/api/party', user);
        },
        update: async (id, params) => {
            await fetch.put(`/api/party/${id}`, params);
        },
        delete: async (id) => {
            partyStore.setState({
                parties: parties!.map(x => {
                    if (x.id === id) { x.isDeleting = true; }
                    return x;
                })
            });

            await fetch.delete(`/api/party/${id}`);

            partyStore.setState({ parties: parties!.filter(x => x.id !== id) });
        }
    }
};

// interfaces

interface IParty {
    id: string,
    partyCode: String,
    ownerName: String,
    accountantName: String,
    company: String,
    gstNumber: String,
    ownerContact: Number,
    accountantContact: Number,
    subjectedTo: String,
    address: String,
    isDeleting?: boolean
}

interface IPartyStore {
    parties?: IParty[],
    party?: IParty,
}

interface IPartyService extends IPartyStore {
    getAll: () => Promise<void>,
    getById: (id: string) => Promise<void>,
    create: (party: IParty) => Promise<void>,
    update: (id: string, params: Partial<IParty>) => Promise<void>,
    delete: (id: string) => Promise<void>
}