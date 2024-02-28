import { db } from '..';
import CounterService from '../services/counter.service';
import { PARTY_COLLECTION, PARTY_COLLECTION_CODE, PARTY_COLLECTION_PADDING, PARTY_COLLECTION_PREFIX } from '../helpers/constats';

const PartyCollectionModel = db.PartyCollectionModel;

export const partyCollection = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await PartyCollectionModel.find();
}

async function getById(id: string) {
    try {
        return await PartyCollectionModel.findById(id);
    } catch {
        throw 'Party collection Not Found';
    }
}

async function create(params: any) {
    const code = await CounterService.nextCount(PARTY_COLLECTION, PARTY_COLLECTION_CODE, PARTY_COLLECTION_PREFIX, PARTY_COLLECTION_PADDING);
    const partyCollection = new PartyCollectionModel({
        collectionCode: code,
        ...params
    });

    await partyCollection.save();
}

async function update(id: string, params: any) {
    const partyCollection = await PartyCollectionModel.findById(id);

    // validate
    if (!partyCollection) throw 'Party collection not found';
    if (partyCollection.collectionCode !== params.collectionCode) {
        throw 'Party Code "' + params.collectionCode + '" is not matching';
    }

    Object.assign(partyCollection, params);

    await partyCollection.save();
}

async function _delete(id: string) {
    await PartyCollectionModel.findByIdAndDelete(id);
}