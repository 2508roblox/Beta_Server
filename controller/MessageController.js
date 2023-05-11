
import MessageModel from './../Schema/MessagesModel.js';
export const CreateMessage = async (req, res, next) => {
    let { userid,
        conversationid,
        avatar,
        firstname,
        content } = req.body

    try {
        let newMess = new MessageModel(req.body)
        await newMess.save()
        res.status(200).json(newMess)

    }
    catch (error) {
        res.status(400).json('Err')

    }
}
export const GetAllMessagesByConversationnId = async (req, res, next) => {
    let ConversationId = req.params.id

    try {
        let allMess = await MessageModel.find({ conversationid: ConversationId })
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
           await allMess.sort((a, b) => a.createdAt - b.createdAt);
        res.status(200).json(allMess)


    }
    catch (error) {
        res.status(400).json('Err')

    }
}
