const Event = require('../../models/event')
const User = require('../../models/user')
module.exports.events = async eventIds => {

    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {

            return {
                ...event._doc, creator: this.user.bind(this, event._doc.creator)
            }
        })
    } catch (error) {
        throw error
    }

}
module.exports.user = async userId => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, createdEvents: this.events.bind(this, user._doc.createdEvents) }
    } catch (error) {
        throw error
    }
}
module.exports.singleEvent = async eventId => {
    try {

        const event = await Event.findById(eventId)
        return {
            ...event._doc,
            creator: this.user.bind(this, event._doc.creator)
        }
    } catch (error) {
        throw error
    }
}
