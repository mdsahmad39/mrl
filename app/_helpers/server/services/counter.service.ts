import { counter as counterRepo } from "../repos";


class CounterService {
    constructor() { }

    static nextCount = async (collection: string, field: string, prefix: string, len: number) => {

        const counter = await counterRepo.next(collection, field);
        const counterString = `${(counter).toString().padStart(len, '0')}`;

        return `${prefix}${counterString}`;
    }

    static currentCounter = async (collection: string, field: string) => await counterRepo.current(collection, field);

    static saveCounter = async (collection: string, field: string, counter: number) => await counterRepo.save(collection, field, counter);

}

export default CounterService;