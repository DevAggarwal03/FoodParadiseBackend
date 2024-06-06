const mongoose = require('mongoose')
require('dotenv').config()

const dbUrl = process.env.DB_URL

const dbConnect = () => {
    mongoose.connect(dbUrl).then(() => {
        console.log(`db connected successfull`);
    })
    .catch((e) => {
        console.log(`error while connecting to the db: ${e}`);
        process.exit(1);
    })
}

module.exports = dbConnect