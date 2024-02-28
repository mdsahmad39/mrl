import mongoose, { Schema } from "mongoose";

export { counterModel };

function counterModel() {
    const schema = new Schema({
        cModel: { type: String, required: true },
        addField: { type: String, required: true },
        counter: { type: Number, required: true }
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

    return mongoose.models.Counter || mongoose.model('Counter', schema);
}
