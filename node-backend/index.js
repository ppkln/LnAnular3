const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const cors = require("cors")
const app = express()



const memberRoute = require("./routes/member.route")

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//static cirectory path
app.use(express.static(path.join(__dirname,'dist/')));
//base route
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
})

//api root
app.use('/api',memberRoute);



mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/LNangular3",{useNewUrlparser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to MongoDB.")
})
.catch(()=>{
    console.log("Cannot connect to MongoDB.")
})

const port = process.env.port || 8000
app.listen(port,function(){
    console.log("connected to server on port ", port)
})
// //404 error
// app.use((req,res,next)=>{
//     next(createError(404))
// })
// Error Handle
app.use(function(err,req,res,next){
    console.error("นี้คือข้อความจาก Express server: "+err.message);
    if (!err.statusCode) err.statusCode=500;
    res.status(err.statusCode).send("Error handle จาก express server : "+err.message)
})