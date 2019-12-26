const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
    users: () => {

    },
    createUser: async (args) => {
        try {

            const user = await User.findOne({ email: args.userInput.email })
            if (user) {
                throw new Error('User already exists')
            } else {
                const hashPassword = await bcrypt.hash(args.userInput.password, 12)
                const user = new User({
                    email: args.userInput.email,
                    password: hashPassword
                })
                const result = await user.save()
                return { ...result._doc, password: null }
            }
        } catch (error) {
            throw error
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email: email })
            if (!user)
                throw new Error("User does not exist")
            const isEqual = await bcrypt.compare(password, user._doc.password)

            if (!isEqual) {
                throw new Error("Password is incorrect")
            }
            const token = jwt.sign(
                {
                    userId: user._doc._id,
                    email: user._doc.email
                },
                'secretkey',
                {
                    expiresIn: '1h'
                }
            )
            console.log(token)
            
            return { userId: user._doc._id, token: token, tokenExpiration: 1 }


        } catch (error) {
            throw error
        }


    }
}