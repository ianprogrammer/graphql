const Event = require('../../models/event')
const User = require('../../models/user')
const Util = require('./util')



module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return await events.map(event => {
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: Util.user.bind(this, event._doc.creator)
                }
            })
        } catch (error) {
            throw error
        }
    },
    createEvent: async (args) => {
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5e014ccacb4ef131294815eb'
            })
            const createdEvents = await event.save()
            const findedUser = await User.findById('5e014ccacb4ef131294815eb')

            if (!findedUser)
                throw new Error('User not found')
            findedUser.createdEvents.push(event)
            await findedUser.save()
            return {
                ...createdEvents._doc,
                date: new Date(createdEvents._doc.date).toISOString(),
                creator: Util.user.bind(this, createdEvents._doc.creator)
            }   

        } catch (error) {
            throw error
        }

    }
}