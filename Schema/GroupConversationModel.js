import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const GroupConversationSchema = new Schema({
  adminId: {
    required: true,
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId

  },
  name: 'String',
  avatar: 'String'

}, { timestamps: true });
const GroupConversationModel = mongoose.model('GroupConversation', GroupConversationSchema)
export default GroupConversationModel