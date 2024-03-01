import { apiHandler } from '_helpers/server/api';
import { partyCollection as partyCollectionRepo } from '_helpers/server/repos';

module.exports = apiHandler({
    GET: getById,
});

async function getById(req: Request, { params: { id } }: any) {
    return await partyCollectionRepo.getById(id);
}
