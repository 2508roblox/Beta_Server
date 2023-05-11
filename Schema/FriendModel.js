import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const FriendSchema = new Schema({
    userid: {
        // who is requesting
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    friendid: {
        // who was requested
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: String

}, { timestamps: true });
const FriendModel = mongoose.model('Friend', FriendSchema)
export default FriendModel