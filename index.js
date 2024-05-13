const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.Port || 3000

// middleware
app.use(cors())
app.use(express.json())

// coffeMaster
// G4v6aErITNspzOQO

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)


const uri = "mongodb+srv://coffeMaster:G4v6aErITNspzOQO@cluster0.bspxqoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bspxqoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    let database = client.db('coffeeDB')
    let coffeeCollection = database.collection
    ('coffee')
    let userCOllection=client.db('coffeeDB').collection('user')

    // let coffeeCollection = client.db('coffeeDB').collection('coffee')

    app.get('/coffee', async(req,res)=>{
      const cursor=coffeeCollection.find()
      const result= await cursor.toArray()
      res.send(result)
    })
    app.get('/user',async(req,res)=>{
      let cursor=userCOllection.find()
      let result=await cursor.toArray()
      res.send(result)
    })

    app.get('/coffee/:id',async(req,res)=>{
      const id=req.params.id
      const query={_id: new ObjectId(id)}
      const result= await coffeeCollection.findOne(query)
      res.send(result)
    })

    app.put('/coffee/:id',async(req,res)=>{
      let id=req.params.id
      let filter={_id: new ObjectId(id)}
      let options={upsert: true}
      let updatedCoffee=req.body
      let coffee={
        $set:{
          name:updatedCoffee.name,quantity:updatedCoffee.quantity,supplier:updatedCoffee.supplier,taste:updatedCoffee.taste,category:updatedCoffee.category,details:updatedCoffee.details,
          photo:updatedCoffee.photo
        }
      }
      let result= await coffeeCollection.updateOne(filter,coffee,options)
      res.send(result)
    })
 
    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body
      console.log(newCoffee)
      let result = await coffeeCollection.insertOne(newCoffee)
      res.send(result)
    })

    app.delete('/coffee/:id',async(req,res)=>{
      let id=req.params.id
      let query={_id: new ObjectId(id)}
      let result=await coffeeCollection.deleteOne(query)
      res.send(result)
    })

    // user related apis
    app.post('/user',async(req,res)=>{
      let user=req.body
      console.log(user)
      let result=await userCOllection.insertOne(user)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Coffee making server is running')
})

app.listen(port, () => {
  console.log(`Coffee Server is running on port: ${port}`)
})