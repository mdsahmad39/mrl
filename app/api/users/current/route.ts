import { users as usersRepo } from '_helpers/server/repos';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getCurrent
});

async function getCurrent() {
    return await usersRepo.getCurrent();
}