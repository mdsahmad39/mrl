import mongoose, { Schema } from "mongoose";

export { partyModel };

function partyModel() {
    const schema = new Schema({
        partyCode: { type: String, unique: true, required: true },
        ownerName: { type: String, required: true },
        accountantName: { type: String, required: true },
        email: { type: String, required: false },
        company: { type: String, required: false },
        gstNumber: { type: String, required: false },
        ownerContact: { type: Number, required: true },
        accountantContact: { type: Number, required: false },
        subjectedTo: { type: String, required: false },
        address: { type: String, required: true },
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

    return mongoose.models.Party || mongoose.model('Party', schema);
}