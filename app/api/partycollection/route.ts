import joi from 'joi';

import { partyCollection as partyCollectionRepo } from '_helpers/server/repos';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await partyCollectionRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await partyCollectionRepo.create(body);
}

create.schema = joi.object({
    collectionCode: joi.string().allow('').optional(),
    billingDate: joi.string().required(),
    truckNumber: joi.string().required(),
    sourceDestination: joi.string().required(),
    senderParty: {
        code: joi.string().required(),
        name: joi.string().required(),
        contact: joi.number().required(),
    },
    receiverParty: {
        code: joi.string().required(),
        name: joi.string().required(),
        contact: joi.number().required(),
    },
    paymentPartyCode: joi.string().required(),
    paymentParty: {
        code: joi.string().required(),
        name: joi.string().required(),
        contact: joi.number().required(),
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