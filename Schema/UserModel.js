import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: 'String',
        required: true,

    },
    password: {
        type: 'String',
        required: true
    },

    firstname: {
        type: 'String',
        required: true
    },
    lastname: {
        type: 'String',
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: 'String',
    relationship: 'String',
    address: 'String',
    phone: 'String',
    hometown: 'String',
    coverimage: 'String',
    avatar: 'String',
    desc: 'String',
    worksat: 'String',
    skills: [],

}, { timestamps: true });
const UserModel = mongoose.model('User', UserSchema)
export default UserModel