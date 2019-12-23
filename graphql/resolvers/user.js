const bcrypt = require('bcryptjs')
const User = require('../../models/user')

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

    }
}