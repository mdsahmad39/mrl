import mongoose, { Schema } from "mongoose";

export { partyBalanceModel };

function partyBalanceModel() {
    const schema = new Schema({
        partyCode: { type: String, required: true, unique: true, },
        dueAmount: { type: Number, required: true, },
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

    return mongoose.models.PartyBalance || mongoose.model('PartyBalance', schema);
}