import { db } from '..';
import CounterService from '../services/counter.service';
import { PARTY_COLLECTION, PARTY_COLLECTION_CODE, PARTY_COLLECTION_PADDING, PARTY_COLLECTION_PREFIX } from '../helpers/constats';
import { partyBalance } from '.';
import { resolveDates } from '../helpers/date.helper';

const PartyCollectionModel = db.PartyCollectionModel;

export const partyCollection = {
    getAll,
    getCount,
    getAllByCode,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(searchParams: URLSearchParams) {
    const term: string = searchParams.get('term') ?? '';
    const { startDate, endDate } = resolveDates(searchParams);

    return await PartyCollectionModel.find({
        billingDate: {
            $gte: new Date(startDate.setHours(0, 0, 0)),
            $lt: new Date(endDate.setHours(23, 59, 59))
        },
        $or: [
            {
                invoiceNumber: { $regex: term, $options: 'i' }
            },
            {
                truckNumber: { $regex: term, $options: 'i' }
            },
            {
                'paymentParty.name': { $regex: term, $options: 'i' }
            },
        ]
    }).sort({ billingDate: 'desc' });
}
async function getCount(term: string = '', limit: number) {
    const count = await PartyCollectionModel.find({
        $or: [
            {
                invoice: { $regex: term }
            },
            {
                truckNumber: { $regex: term }
            },
            {
                'paymentParty.name': { $regex: term }
            },
        ]
    });
    const totalPages = Math.ceil(Number(count) / limit);
    return totalPages;
}

async function getAllByCode(code: string, searchParams: URLSearchParams) {

    const { startDate, endDate } = resolveDates(searchParams);
    return await PartyCollectionModel.find({
        $and: [
            {
                paymentPartyCode: code
            },
            {
                billingDate: {
                    $gte: new Date(startDate.setHours(0, 0, 0)),
                    $lt: new Date(endDate.setHours(23, 59, 59))
                },
            }
        ]
    }).sort({ billingDate: 'desc' });
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
    await partyBalance.updatePartyBalance(params?.paymentPartyCode, params?.balanceAmount);
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