require('dotenv').config()

const express = require('express');
const ejs = require('ejs')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express();

const connectToMongoDB = require('./connnection')
const { logReqRes } = require('./middlewares/index')
const { checkForAuthentication, restrictTo } = require('./middlewares/auth')

const URLRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoutes')
const userRoute = require('./routes/user')

//mongoDB connection
connectToMongoDB(process.env.MONGODB_URL)
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(`error while connecting to mongoDB ${err}`))

//middlewares for handling form data
app.use(express.json())  //parsing json data
app.use(express.urlencoded({ extended: false }));  //parsing form data
app.use(cookieParser())  //parsing cookies

//middleware for making log
app.use(logReqRes('log.txt'))

//authentication middleware
app.use(checkForAuthentication)

//ejs setting
app.set('view engine', 'ejs')
// console.log(path.resolve('views'));
app.set('views', path.resolve('views'))

//routes
app.use("/", staticRoute)
app.use("/url", restrictTo(['NORMAL', 'ADMIN']), URLRoute)
app.use('/user', userRoute)

const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`server started on a port ${port}`))