import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const MessageSchema = new Schema({
   userid: {
       type: mongoose.Schema.Types.ObjectId,
       required: true
   },
   conversationid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Conversation'
   },
   avatar: 'String',
   firstname: 'String',
   content: 'String'
}, { timestamps: true });
const MessageModel = mongoose.model('Message', MessageSchema)
export default MessageModel