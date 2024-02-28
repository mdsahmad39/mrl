import mongoose, { Schema } from "mongoose";

export { userModel };

function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String, required: true },
        isActive: { type: Boolean, required: false, default: true },
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}