import joi from 'joi';

import { apiHandler } from '_helpers/server/api';
import { partyCollection as partyCollectionRepo } from '_helpers/server/repos';

module.exports = apiHandler({
    GET: getByCode,
    PUT: update,
    DELETE: _delete
});

async function getByCode(req: Request, { params: { code } }: any) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    return await partyCollectionRepo.getAllByCode(code, searchParams);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    await partyCollectionRepo.update(id, body);
}

update.schema = joi.object({
    collectionCode: joi.string().required(),
    billingDate: joi.string().required(),
    truckNumber: joi.string().required(),
    sourceDestination: joi.string().required(),
    senderParty: {
        code: joi.string().required(),
        name: joi.string().required(),
        contact: joi.string().required(),
    },
    receiverParty: {
        code: joi.string().required(),
        name: joi.string().required(),
        contact: joi.string().required(),
    },
    paymentPartyCode: joi.string().allow('').optional(),
    paymentParty: {
        code: joi.string().required(),
        name: joi.string().required(),
        contact: joi.string().required(),
    },
    invoiceNumber: joi.string().required(),
    commodities: joi.string().required(),
    weight: joi.string().required(),
    freight: joi.string().required(),
    // partyDeductions: {
    //     description: joi.string().required(),
    //     amount: joi.string().required(),
    // },
    receivedAmount: joi.string().required(),
    balanceAmount: joi.string().required(),
    paymentDate: joi.string().required(),
    modeOfPayment: joi.string().required(),
    reference: joi.string().required(),
    remarks: joi.string().allow('').optional(),
});

async function _delete(req: Request, { params: { id } }: any) {
    await partyCollectionRepo.delete(id);
}