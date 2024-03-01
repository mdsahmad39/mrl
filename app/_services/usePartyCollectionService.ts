import { create } from 'zustand';

import { useAlertService } from '.';
import { useFetch } from '../_helpers/client/useFetch';

export { usePartyCollectionService };
export type { IPartyCollection };

const initialState = {
    partyCollections: undefined,
};
const partyCollectionStore = create<IPartyCollectionStore>(() => initialState);

function usePartyCollectionService(): IPartyCollectionService {
    const alertService = useAlertService();
    const fetch = useFetch();
    const { partyCollections } = partyCollectionStore();

    return {
        partyCollections,
        getByCode: async (id) => {
            partyCollectionStore.setState({ partyCollections: undefined });
            try {
                partyCollectionStore.setState({ partyCollections: await fetch.get(`/api/partycollections/${id}`) });
            } catch (error: any) {
                alertService.error(error);
            }
        },
        update: async (id, params) => {
            await fetch.put(`/api/partycollection/${id}`, params);
        },
        create: async (partyCollection) => {
            await fetch.post(`/api/partycollection`, partyCollection);
        },
        getAll: async () => {
            partyCollectionStore.setState({ partyCollections: await fetch.get('/api/partycollection') });
        },
    }
};

// interfaces

interface IPartyCollection {
    id: string,
    collectionCode: String,
    billingDate: Date,
    truckNumber: String,
    sourceDestination: String,
    senderParty: {
        code: String,
        name: String,
        contact: Number,
    },
    receiverParty: {
        code: String,
        name: String,
        contact: Number,
    },
    paymentPartyCode: String,
    paymentParty: {
        code: String,
        name: String,
        contact: Number,
    },
    invoiceNumber: String,
    commodities: String,
    weight: Number,
    freight: Number,
    // partyDeductions: {
    //     description: String,
    //     amount: Number,
    // },
    receivedAmount: Number,
    balanceAmount: Number,
    paymentDate: Date,
    modeOfPayment: String,
    reference: String,
    remarks: String,
}

interface IPartyCollectionStore {
    partyCollections?: IPartyCollection[],
}

interface IPartyCollectionService extends IPartyCollectionStore {
    getByCode: (code: String) => Promise<void>,
    getAll: () => Promise<void>,
    update: (id: string, params: Partial<IPartyCollection>) => Promise<void>,
    create: (partyCollection: Partial<IPartyCollection>) => Promise<void>,
}