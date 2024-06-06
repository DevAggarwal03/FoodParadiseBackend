const express = require('express')
const app = express()
const appRouter = require('./routes/appRoutes')
const fileUpload = require('express-fileupload')
const cors = require('cors')

app.use(cors())

const corseOption = {
    origin: 'https://food-paradise-frontend.vercel.app/', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204
}

require('dotenv').config()
app.use(cors(corseOption))
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