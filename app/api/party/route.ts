import joi from 'joi';

import { party as partyRepo } from '_helpers/server/repos';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return await partyRepo.getAll();
}

async function create(req: Request) {
    const body = await req.json();
    await partyRepo.create(body);
}

create.schema = joi.object({
    partyCode: joi.string().allow('').optional(),
    ownerName: joi.string().required(),
    accountantName: joi.string().required(),
    company: joi.string().allow('').optional(),
    email: joi.string().allow('').optional(),
    gstNumber: joi.string().allow('').optional(),
    ownerContact: joi.number().required(),
    accountantContact: joi.number().allow('').optional(),
    subjectedTo: joi.string().allow('').optional(),
    address: joi.string().required(),
});