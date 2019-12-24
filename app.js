const express = require('express')
const bodyParser = require('body-parser')
const graphQLHttp = require('express-graphql')
const app = express();
const mongoose = require('mongoose')
const graphQLSchema = require('./graphql/schema/index')
const graphQLEventResolvers = require('./graphql/resolvers/event')
const graphQLUserResolvers = require('./graphql/resolvers/user')
const graphQLBookingResolvers = require('./graphql/resolvers/booking')


app.use(bodyParser.json());
app.use('/graphql', graphQLHttp({
    schema: graphQLSchema,
    rootValue: {...graphQLEventResolvers,...graphQLUserResolvers, ... graphQLBookingResolvers},
    graphiql: true

}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0-g7qoz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,{ useUnifiedTopology: true,useNewUrlParser: true },
).then(() => {
    app.listen(3000)
}).catch(err => {
    console.error(err)
})


