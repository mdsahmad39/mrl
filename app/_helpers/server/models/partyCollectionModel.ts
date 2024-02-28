import mongoose, { Schema } from "mongoose";

export { partyCollectionModel };

function partyCollectionModel() {
    const schema = new Schema({
        collectionCode: { type: String, unique: true, required: true },
        billingDate: { type: Date, required: true },
        truckNumber: { type: String, required: true },
        sourceDestination: { type: String, required: true },
        senderParty: {
            type: {
                code: { type: String, required: true },
                name: { type: String, required: true },
                contact: { type: Number, required: true },
            }, required: true
        },
        receiverParty: {
            type: {
                code: { type: String, required: true },
                name: { type: String, required: true },
                contact: { type: Number, required: true },
            }, required: true
        },
        paymentParty: {
            type: {
                code: { type: String, required: true },
                name: { type: String, required: true },
                contact: { type: Number, required: true },
            }, required: true
        },
        invoiceNumber: { type: String, required: true },
        commodities: { type: String, required: true },
        weight: { type: Number, required: true },
        freight: { type: Number, required: true },
        partyDeductions: {
            type: [{
                description: { type: String, required: true },
                amount: { type: Number, required: true },
            }], required: false
        },
        receivedAmount: { type: Number, required: true },
        balanceAmount: { type: Number, required: true },
        paymentDate: { type: Date, required: true },
        modeOfPayment: { type: String, required: true },
        reference: { type: String, required: true },
        remarks: { type: String, required: false },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        }
    });

    return mongoose.models.PartyCollection || mongoose.model('PartyCollection', schema);
}