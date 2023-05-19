import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const PostCommentSchema = new Schema({
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstname: 'String',
    content: String,
    media: [],
    likes: []
}, { timestamps: true });

const CommentModel = mongoose.model('PostComment', PostCommentSchema);
export default CommentModel