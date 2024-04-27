const express=require('express')
const cors=require('cors')
const {MongoClient} =require('mongodb')
const bcrypt =require('bcrypt')

const app=express()
app.use(cors())
app.use(express.json())

const client=new MongoClient('mongodb+srv://admin:admin@cluster0.sfezbu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
client.connect()
const db=client.db("SDP_4")
const col=db.collection("user")

app.get('/home',(req,res)=>{
    res.send("welcome")
})

app.post('/insert',async (req,res)=>{
    console.log(req.body)
    req.body.password=await bcrypt.hash(req.body.password,5)
    col.insertOne(req.body)
    res.send("data recieved")
})

app.get('/show',async (req,res)=>{
    var result=await col.find().toArray()
    res.send(result)
})

app.post('/check',async (req,res)=>{
    console.log(req.body)
    var result=await col.findOne({name:req.body.un})
    console.log(result)
    if(await bcrypt.compare(req.body.pw,result.password)){
        res.send(result)
    }
    else{
        res.send("fail")
    }
})

app.listen(8081)
console.log("server running")
