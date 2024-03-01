import { db } from '..';
import CounterService from '../services/counter.service';
import { PARTY, PARTY_CODE, PARTY_PADDING, PARTY_PREFIX } from '../helpers/constats';
import { partyBalance } from '.';

const Party = db.Party;

export const party = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Party.find();
}

async function getById(id: string) {
    try {
        return await Party.findById(id);
    } catch {
        throw 'Party Not Found';
    }
}

async function create(params: any) {
    const code = await CounterService.nextCount(PARTY, PARTY_CODE, PARTY_PREFIX, PARTY_PADDING);
    const party = new Party({
        partyCode: code,
        ...params
    });

    // save party & initialize balance amount
    await party.save();
    await partyBalance.create({ partyCode: code, dueAmount: 0 });
}

async function update(id: string, params: any) {
    const party = await Party.findById(id);

    // validate
    if (!party) throw 'Party not found';
    if (party.partyCode !== params.partyCode) {
        throw 'Party Code "' + params.partyCode + '" is already taken';
    }

    // copy params properties to user
    Object.assign(party, params);

    await party.save();
}

async function _delete(id: string) {
    await Party.findByIdAndDelete(id);
}