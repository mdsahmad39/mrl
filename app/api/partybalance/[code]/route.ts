import { apiHandler } from '_helpers/server/api';
import { partyBalance as partyBalanceRepo } from '_helpers/server/repos';

module.exports = apiHandler({
    GET: getByCode,
});

async function getByCode(req: Request, { params: { code } }: any) {
    return await partyBalanceRepo.getByCode(code);
}