const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema.js')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 3005

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://roman:1234@cluster0.eqj5j.mongodb.net/graphql?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    )
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
