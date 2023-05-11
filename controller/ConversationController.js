import ConversationModel from "../Schema/ConversationsModel.js"
import GroupConversationModel from "../Schema/GroupConversationModel.js"

export const CreateConversation = async (req, res, next) => {
    let { userid, otherid } = req.body

    try {
        let isExist = await ConversationModel.findOne({ participants: { $all: [userid, otherid] } })
        if (!isExist) {

            let newConversation = new ConversationModel({ participants: [userid, otherid] })
            await newConversation.save()
            res.status(200).json(newConversation)
        } else {
            res.status(400).json('Have been created')

        }
    }
    catch (error) {
        res.status(400).json('Err')

    }
}
export const CreateGroupConversation = async (req, res, next) => {
    let { adminId, name } = req.body
    // room name, admin

    try {
        let newGroupConversation = new GroupConversationModel(req.body)
        await newGroupConversation.save()
        res.status(200).json(newGroupConversation)

    }
    catch (error) {
        res.status(400).json('Err')

    }
}
export const GetGroupsConversations = async (req, res, next) => {

    try {
        let Rooms = await GroupConversationModel.find()
        res.status(200).json(Rooms)

    }
    catch (error) {
        res.status(400).json('Errx')

    }
}
export const GetConversations = async (req, res, next) => {
    let userid = req.params.id

    try {
        let Rooms = await ConversationModel.find({ participants: { $in: [userid] } })
        res.status(200).json(Rooms)

    }
    catch (error) {
        res.status(400).json('Err')

    }
}