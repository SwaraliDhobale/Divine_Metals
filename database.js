const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/Users',{
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
var db= mongoose.connection;

db.on('error',()=>console.log('Failure in database connection'))
db.once('open',()=>console.log("Database connected successfully"))

const LogInSchema= new mongoose.Schema({
    name: 
    {
        type: String,
        required: true
    },
    password: 
    {
        type: String,
        required: true
    },
    email:
    {
        type:String,
        required: true
    },
    // cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

const collection=new mongoose.model("New_Users",LogInSchema)
module.exports=collection