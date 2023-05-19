import CommentModel from "../Schema/PostCommentModel.js"

export const getComment = async (req, res) => {
    try {
        let postid = req.params.postid
        let page = req.params.page
        let SKIP_DOCS = (page - 1) * 5
        let allComment = await CommentModel.find({ postid: postid })
            .skip(SKIP_DOCS)
            .limit(5)
        res.status(200).json(allComment)

    } catch (error) {

    }
}
export const newComment = async (req, res) => {
    let {
        postid, userid, firstname, content } = req.body
    try {
        let newComment = new CommentModel({ postid, userid, firstname, content })
        console.log('asd')
        await newComment.save()
        res.status(200).json(newComment)
    } catch (error) {
        res.status(400).json(error)

    }

}
export const delComment = async (req, res) => {

    try {
        let cmtid = req.params.cmtid
        let newComment = await CommentModel.findByIdAndDelete(cmtid)


        res.status(200).json('done')
    } catch (error) {
        res.status(400).json('check id', error.message)

    }

}
export const likeCmt = async (req, res) => {

    try {
        let { userid } = req.body
        let cmtid = req.params.cmtid

        let existId = await CommentModel.findById(cmtid)
        console.log('check',

            userid, cmtid)
        if (!existId.likes.includes(userid)) {
            let liked = await CommentModel.findByIdAndUpdate(cmtid, { $push: { likes: userid } }, { new: true })
            res.status(200).json(liked)
        } else {
            res.status(500).json('this post have been liked by you')
        }


    } catch (error) {
        res.status(400).json('check id', error.message)

    }

}
export const unlikeCmt = async (req, res) => {

    try {
        let { userid } = req.body
        let cmtid = req.params.cmtid


        let liked = await CommentModel.findByIdAndUpdate(cmtid, { $pull: { likes: userid } }, { new: true })
        res.status(200).json(liked)


    } catch (error) {
        res.status(400).json('check id', error.message)

    }

}