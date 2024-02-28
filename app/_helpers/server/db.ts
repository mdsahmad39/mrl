import mongoose from 'mongoose';
import { partyModel, userModel, counterModel, partyCollectionModel, partyBalanceModel } from './models';

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Party: partyModel(),
    Counter: counterModel(),
    PartyCollectionModel: partyCollectionModel(),
    PartyBalance: partyBalanceModel(),
};