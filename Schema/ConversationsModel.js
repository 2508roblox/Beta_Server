import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const ConversationSchema = new Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

}, { timestamps: true });
const ConversationModel = mongoose.model('Conversation', ConversationSchema)
export default ConversationModel