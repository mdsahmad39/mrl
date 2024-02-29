import { create } from 'zustand';

import { useAlertService } from '.';
import { useFetch } from '../_helpers/client/useFetch';

export { usePartyBalanceService };

const initialState = {
    partyBalance: undefined,
};
const partyStore = create<IPartyBalanceStore>(() => initialState);

function usePartyBalanceService(): IPartyBalanceService {
    const alertService = useAlertService();
    const fetch = useFetch();
    const { partyBalance } = partyStore();

    return {
        partyBalance,
        getByCode: async (code) => {
            partyStore.setState({ partyBalance: undefined });
            try {
                partyStore.setState({ partyBalance: await fetch.get(`/api/partybalance/${code}`) });
            } catch (error: any) {
                alertService.error(error);
            }
        },
    }
};

// interfaces

interface IPartyBalance {
    id: string,
    partyCode: String,
    dueAmount: Number
}

interface IPartyBalanceStore {
    partyBalance?: IPartyBalance,
}

interface IPartyBalanceService extends IPartyBalanceStore {
    getByCode: (code: String) => Promise<void>,
}