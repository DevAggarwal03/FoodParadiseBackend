const express = require('express')
const app = express()
const appRouter = require('./routes/appRoutes')
const fileUpload = require('express-fileupload')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))



const dbConnect = require('./config/dbConnect')
dbConnect();


app.use('/api/v1', appRouter)

port = process.env.port || 4000

app.listen(port, () => {
    console.log(`app listening at the port: ${port}`)
})

app.get('/', (req, res) => {
    res.send('home page')
})