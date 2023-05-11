import UserModel from "../Schema/UserModel.js"


export const Register = async (req, res) => {
    try {
        console.log('register')
        const { username, password, firstname, lastname } = req.body
        //check username
        let isExist = await UserModel.findOne({ username: username })
        if (isExist) {
            res.status(500).json('username has already been taken')

        } else {
            const user = new UserModel({ username, password, firstname, lastname })
            await user.save()
            res.status(200).json(user)
        }

    } catch (error) {

    }
}
export const Login = async (req, res) => {

    try {

        const { username, password } = req.body
        const isExist = await UserModel.findOne({ username: username })
        if (isExist) {
            //check password

            if (password === isExist.password) {
                res.status(200).json(isExist)
            }
            else {
                res.status(404).json('password is wrong')

            }
        }
        else {
            res.status(404).json('user not found')
        }


    } catch (error) {
        res.status(404).json('some thing went wrong')

    }
} 