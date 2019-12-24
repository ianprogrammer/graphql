const Booking = require('../../models/booking')
const Event = require('../../models/event')

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find()

            return bookings.map(book => {
                return {
                    ...book._doc,
                    createdAt: new Date(book._doc.createdAt).toISOString(),
                    updatedAt: new Date(book._doc.updatedAt).toISOString()
                }
            })
        } catch (error) {
            throw error
        }
    },
    bookEvent: async (args) => {
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
    cancelBooking: (args) => {

    }
}