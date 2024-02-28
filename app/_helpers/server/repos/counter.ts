import { db } from "..";

const Counter = db.Counter;

export const counter = {
    next,
    current,
    save,
};




async function next(cModel: string, addField: string) {
    let entityCounter = await Counter.findOne({
        cModel, addField
    });

    if (entityCounter) {
        let counter = entityCounter?.counter + 1
        entityCounter.counter = counter;
        await entityCounter.save();
        return counter;
    }
    entityCounter = await Counter.create({
        cModel: cModel,
        addField: addField,
        counter: 1
    });
    return entityCounter.counter;

};

async function current(collection: string, field: string) {
    let entityCounter = await Counter.findOne({
        cModel: collection,
        addField: field
    });

    if (!entityCounter) {
        entityCounter = await Counter.create({
            cModel: collection,
            addField: field,
            counter: 0
        });
    }

    const { cModel, addField, counter } = entityCounter;

    return { cModel, addField, counter };

};

async function save(cModel: string, addField: string, counter: number) {
    await Counter.findOneAndUpdate(
        { cModel, addField },
        { counter: counter }
    );
};