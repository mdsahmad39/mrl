import { apiHandler } from '_helpers/server/api';
import { partyCollection as partyCollectionRepo } from '_helpers/server/repos';

module.exports = apiHandler({
    GET: getByCode,
});

async function getByCode(req: Request, { params: { code } }: any) {
    return await partyCollectionRepo.getAllByCode(code);
}