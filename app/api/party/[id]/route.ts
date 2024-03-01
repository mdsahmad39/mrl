import joi from 'joi';

import { apiHandler } from '_helpers/server/api';
import { party as partyRepo } from '_helpers/server/repos';

module.exports = apiHandler({
    GET: getById,
    PUT: update,
    DELETE: _delete
});

async function getById(req: Request, { params: { id } }: any) {
    return await partyRepo.getById(id);
}

async function update(req: Request, { params: { id } }: any) {
    const body = await req.json();
    await partyRepo.update(id, body);
}

update.schema = joi.object({
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

async function _delete(req: Request, { params: { id } }: any) {
    await partyRepo.delete(id);
}