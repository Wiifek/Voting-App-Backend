const express = require('express')
const dotenv = require("dotenv");
const app = express()
const cors = require('cors')
const port = 4000

// body parser json 
app.use(express.json())
// dot env config
dotenv.config();
//Cors config
app.use(cors());

const connect = require('./database/dbConnection')
const BearerStrategy = require('./passport/bearerStrategy')
const auth = require('./routes/authApi')
const user = require('./routes/userApi')
const poll = require('./routes/pollApi')


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Voting App!' });
})

app.use("", auth);
app.use("/users",user);
app.use("/polls",poll);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})