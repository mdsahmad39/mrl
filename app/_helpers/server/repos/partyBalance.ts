import { db } from '..';

const PartyBalance = db.PartyBalance;

export const partyBalance = {
    getAll,
    getById,
    getByCode,
    create,
    update,
    updateByCode,
    delete: _delete
};

async function getAll() {
    return await PartyBalance.find();
}

async function getById(id: string) {
    try {
        return await PartyBalance.findById(id);
    } catch {
        throw 'Party Not Found';
    }
}

async function getByCode(code: string) {
    try {
        return await PartyBalance.findOne({ partyCode: code });
    } catch {
        throw 'Party Not Found';
    }
}

async function create(params: any) {
    // validate
    if (await PartyBalance.findOne({ partyCode: params.partyCode })) {
        throw 'Party Code "' + params.partyCode + '" is already taken';
    }
    const partyBalance = new PartyBalance(params);

    // save party
    await partyBalance.save();
}

async function update(id: string, params: any) {
    const partyBalance = await PartyBalance.findById(id);

    // validate
    if (!partyBalance) throw 'Party not found';
    if (partyBalance.partyCode !== params.partyCode) {
        throw 'Party Code "' + params.partyCode + '" is already taken';
    }

    // copy params properties to user
    Object.assign(partyBalance, params);

    await partyBalance.save();
}

async function updateByCode(code: string, params: any) {
    const partyBalance = await PartyBalance.findOne({ partyCode: code });

    // validate
    if (!partyBalance) throw 'Party balance not found';

    // copy params properties to user
    Object.assign(partyBalance, params);

    await partyBalance.save();
}

async function _delete(id: string) {
    await PartyBalance.findByIdAndDelete(id);
}