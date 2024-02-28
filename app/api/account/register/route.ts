import joi from 'joi';

import { apiHandler } from '_helpers/server/api';
import { users as usersRepo } from '_helpers/server/repos';

module.exports = apiHandler({
    POST: register
});

async function register(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

register.schema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(6).required(),
    name: joi.string().required(),
    role: joi.string().required(),
    email: joi.string().required(),
    isActive: joi.string().optional(),
});