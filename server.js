const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }))

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'; // Use the environment variable for MongoDB URI

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.once('open', () => {
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
})

const Users = mongoose.model("data", userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/post', async (req, res) => {

    const {  name, email, message } = req.body

    const user = new Users({
        name,
        email,
        message
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful" )
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})   