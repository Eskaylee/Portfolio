let express = require('express')
let app = express()
let mongoose =require('mongoose')
let controller = require('./controller')
let path = require('path')
let cors = require('cors')

require("dotenv").config()
let port = process.env.PORT
let MONGO_URI = process.env.MONGO_URI

let backendRouter = require('./router')
let frontendRouter = require('./frontendRouter')





app.use(express.json())
app.use(cors())
app.use('/route',backendRouter)
app.use('/',frontendRouter)

console.log(__dirname)
app.use(express.static(path.join(__dirname, '../frontend')));
app.listen(port, ()=>{
    console.log(`running at port ${port}`);
    
})




// Replace 'your_database_name' with the name of your database
const uri = MONGO_URI;

mongoose.connect(uri, {
    
    


}).then(() => {
    console.log('Successfully connected to MongoDB');
   //controller.sendMessage('secondName','secondEmail','secondmessage')
    //controller.findUser()
    //controller.findUserMessage('secondName')

}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

