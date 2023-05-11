import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const PostSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    content: String,
    media: [],
    likes: []
}, { timestamps: true });

const PostModel = mongoose.model('Post', PostSchema);
export default PostModel