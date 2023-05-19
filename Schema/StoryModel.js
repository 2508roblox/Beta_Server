import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const StorySchema = new Schema({
    userid: {
        type: String,
        required: true,
        ref: 'User'
    },
    content: String,
    media: [],
    likes: [],
    theme: 'String'
}, { timestamps: true });
const StoryModel = mongoose.model('Story', StorySchema);
export default StoryModel