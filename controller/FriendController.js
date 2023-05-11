import UserModel from '../Schema/UserModel.js';
import FriendModel from './../Schema/FriendModel.js';

//request
export const requestFriend = async (req, res, next) => {
    try {
        let friendid = req.params.id
        let { userid } = req.body // chủ động
        let existingReq = await FriendModel.findOne({
            $or: [
                { userid: userid, friendid: friendid },
                { userid: friendid, friendid: userid }
            ]
        })
        if (!existingReq) {
            let friend = new FriendModel({ userid, friendid, status: 'pending' })
            await friend.save()
            res.status(200).json(friend)


        } else {
            res.status(400).json('you or other people have already been requested')
        }
    } catch (error) {

    }
}
// get all request by others user
export const getAllRequestFriend = async (req, res, next) => {
    try {
        let userid = req.params.id
        let friend = await FriendModel.find({ friendid: userid, status: 'pending' }).lean()
        res.status(200).json(friend)
    } catch (error) {

    }
}
// get all request by user
export const getAllRequestFriendByUser = async (req, res, next) => {
    try {
        let userid = req.params.id
        let friend = await FriendModel.find({ userid: userid, status: 'pending' }).lean()
        res.status(200).json(friend)
    } catch (error) {

    }
}
// confirm all request with status 'request' 
export const confirmRequest = async (req, res, next) => {
    // user who was requested is friendid
    // only confirm other requests
    // người đc yêu cầu mới confirm đc
    try {
        let friendid = req.params.id
        //who is requesting
        let { userid } = req.body
        // you
        let existingFriend = await FriendModel.findOne({ userid: friendid, friendid: userid })
        if (existingFriend) {

            let friend = await FriendModel.updateOne(existingFriend, { status: 'confirmed' }, { new: true })
            res.status(200).json(friend)

        } else {
            res.status(400).json('you have already confirmed')

        }

    } catch (error) {

    }
}
//all confirmed friends
export const getAllConfirmedFriends = async (req, res, next) => {
    try {
        let friendid = req.params.id
        // you


        let friend = await FriendModel.find({ friendid: friendid, status: 'confirmed' })
        res.status(200).json(friend)



    } catch (error) {

    }
}
export const removeFriend = async (req, res, next) => {
    let { userid } = req.body
    let friendIdParams = req.params.id
    console.log('check:', userid, friendIdParams)
    try {
        await FriendModel.findOneAndDelete({
            $or: [
                { userid: friendIdParams, friendid: userid },
                { userid: userid, friendid: friendIdParams }
            ]
        })
        res.status(200).json('Deleted')
    } catch (error) {

    }
}
export const getAllUserFriends = async (req, res, next) => {

    try {
        let userid = req.params.id
        const allFriends = await FriendModel.find({
            $or: [
                { userid: { $ne: userid }, friendid: userid, status: 'confirmed' },
                { userid: userid, friendid: { $ne: userid }, status: 'confirmed' }
            ]
        }).lean();
        res.status(200).json(allFriends)

    } catch (error) {
        console.error(error);
    }

}
// include all status are pending or confirmed
export const getAllUserNotInFriends = async (req, res, next) => {

    try {
        let userid = req.params.id
        let page = req.params.page
        let SKIP_DOCS = (page - 1) * 12
        const myFriends = await FriendModel.find({
            $or: [
                { userid: { $ne: userid }, friendid: userid },
                { userid: userid, friendid: { $ne: userid } }
            ]
        }).lean();
        const friendUserIds = myFriends.map(friend => friend.userid.toString() === userid ? friend.friendid : friend.userid);
        console.log(friendUserIds)

        const nonFriendUsers = await UserModel.find({
            _id: {
                $nin: [...friendUserIds, userid]
            }
        }).skip(SKIP_DOCS)
            .limit(12);
        res.status(200).json(nonFriendUsers)
    } catch (error) {
        console.error(error);
    }

}
