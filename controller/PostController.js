
import PostModel from './../Schema/PostModel.js';
import FriendModel from './../Schema/FriendModel.js';
export const CreatePost = async (req, res) => {

    try {
        let newPost = new PostModel(req.body)
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {

    }
}
export const GetAllUserPost = async (req, res) => {
    try {
        let userId = req.params.id
        let page = req.params.page
        let SKIP_DOCS = (page - 1) * 5
        let data = await PostModel.find({ userid: userId })
            .sort({ createdAt: -1 })
            .skip(SKIP_DOCS)
            .limit(5)
        res.status(200).json(data)

    } catch (error) {

    }
}
export const GetTimeline = async (req, res) => {
    try {
        let userid = req.params.id
        let page = req.params.page
        let SKIP_DOCS = (page - 1) * 5
        let friends = await FriendModel.find({
            $or: [
                { userid: { $ne: userid }, friendid: userid, status: 'confirmed' },
                { userid: userid, friendid: { $ne: userid }, status: 'confirmed' }
            ]
        })
        let friendsId = friends.map((friend) => friend.userid.toString() === userid ? friend.friendid.toString() : friend.userid.toString())
        let data = await PostModel.find({
            userid: { $in: [...friendsId, userid] }
        }).sort({ createdAt: -1 })
            .skip(SKIP_DOCS)
            .limit(5)
        res.status(200).json(data)

    } catch (error) {

    }
}
// like, unlike
export const LikePost = async (req, res) => {
    try {
        let postId = req.params.id
        let userLikePost = req.body.userid
        let existId = await PostModel.findById(postId)

        if (existId.likes.includes(userLikePost)) {
            res.status(500).json('You have already been liked')
        } else {
            let post = await PostModel.findByIdAndUpdate(
                postId, // điều kiện tìm kiếm document
                { $push: { likes: userLikePost } }, { new: true }// thêm userid vào mảng likes
            )
            res.status(200).json(post)
        }


    } catch (error) {

    }
}
export const Unlike = async (req, res) => {
    try {
        let postId = req.params.id
        let userUnLikePost = req.body.userid
        console.log(postId, "post id")


        let mm = await PostModel.findByIdAndUpdate(
            postId, // điều kiện tìm kiếm document
            { $pull: { likes: userUnLikePost } }, // xóa userid khỏi mảng likes
            { new: true } // trả về document đã được cập nhật
        )
        res.status(200).json(mm)

    } catch (error) {

    }
}