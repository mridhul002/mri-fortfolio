const express = require('express');
const { Http2ServerResponse } = require('https://portfolio-mri.netlify.app/');
const mongoose = require('mongoose')
const path = require('path')
const port = Http2ServerResponse

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://mridhul:cluster-mri@cluster0.aioeulj.mongodb.net/portfolio')
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