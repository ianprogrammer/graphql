const Booking = require('../../models/booking')
const Event = require('../../models/event')
const Util = require('./util')



module.exports = {
    bookings: async (args, req) => {
        try {

            if (!req.isAuth) {
                throw new Error("Unauthenticated")
            }

            const bookings = await Booking.find()
            return bookings.map(book => {

                return {
                    ...book._doc,
                    user: Util.user.bind(this, book._doc.user),
                    event: Util.singleEvent.bind(this, book._doc.event),
                    createdAt: new Date(book._doc.createdAt).toISOString(),
                    updatedAt: new Date(book._doc.updatedAt).toISOString()
                }
            })
        } catch (error) {
            throw error
        }
    },
    bookEvent: async (args, req) => {


        if (!req.isAuth) {
            throw new Error("Unauthenticated")
        }

        const fetchedevent = await Event.findOne({ _id: args.eventId })
        const booking = new Booking({
            user: '5e014ccacb4ef131294815eb',
            event: fetchedevent
        })
        const result = await booking.save()
        return {
            ...result._doc,
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
        }
    },
    cancelBooking: async (args, req) => {
        try {

            if (!req.isAuth) {
                throw new Error("Unauthenticated")
            }

            const booking =
                await Booking.findById({ _id: args.bookingId })
                    .populate('event')

            const event = {
                ...booking.event._doc,
                creator: Util.user.bind(this, booking.event._doc.creator)
            }
            await Booking.deleteOne({ _id: args.bookingId })
            return event
        } catch (error) {
            throw error
        }
    }
}