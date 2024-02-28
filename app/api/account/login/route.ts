import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '_helpers/server/api';
import { users as usersRepo } from '_helpers/server/repos';

module.exports = apiHandler({
    POST: login
});

async function login(req: Request) {
    const body = await req.json();
    const { user, token } = await usersRepo.authenticate(body);

    // return jwt token in http only cookie
    cookies().set('authorization', token, { httpOnly: true });

    return user;
}

login.schema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});