
import UserModel from './../Schema/UserModel.js';
export const GetUser = async (req, res) => {
    try {
        console.log(req.params.id)
        let data = await UserModel.findById(req.params.id).lean()
        res.status(200).json(data);

    } catch (error) {

    }
}
export const GetAllUser = async (req, res) => {
    try {

        let data = await UserModel.find().lean()
        res.status(200).json(data);

    } catch (error) {

    }
}
export const UpdateUser = async (req, res) => {
    try {
        if (req.params.id === req.body.curentuserid) {
            console.log(req.body)
            const doc = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            res.status(200).json(doc);
        } else {
            res.status(400).json('You can not update other user');

        }

    } catch (error) {
        res.status(404).json('err');

    }
}