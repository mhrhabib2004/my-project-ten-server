const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app=express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fbvkkp8.mongodb.net/?retryWrites=true&w=majority`;

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
    const addspotcollection = client.db('addspotDB').collection('spots');

    app.get('/addspots',async(req,res)=>{
        const cursor= addspotcollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })
     app.get('/addspots/:id',async(req,res)=>{
        const id =req.params.id;
        const query={_id : new ObjectId(id)}
        const result = await addspotcollection.findOne(query)
        res.send(result);

     })

    app.post('/addspots',async(req,res)=>{
        const newaddspots = req.body;
        console.log(newaddspots);
        const result =await addspotcollection.insertOne(newaddspots);
        res.send(result);
    })

    app.put(`/addspots/:id`,async(req,res)=>{
        const id =req.params.id;
        const filter= {_id:new ObjectId(id)}
        const options = {upsert : true};
        const UpdaetedData= req.body;
        const Updaeted ={
            $set:{
                photo:UpdaetedData.photo,
                spot:UpdaetedData.spot,
                country:UpdaetedData.country,
                location:UpdaetedData.location,
                description:UpdaetedData.description,
                average:UpdaetedData.average,
                seasonality:UpdaetedData.seasonality,
                time:UpdaetedData.time,
                totalVisitorsPerYear:UpdaetedData.totalVisitorsPerYear
            }
        }
        const result = await addspotcollection.updateOne(filter,Updaeted,options);
        res.send(result);
    })

    app.delete('/addspots/:id',async(req,res)=>{
        const id =req.params.id;
        const query={_id:new ObjectId(id)}
        const result = await addspotcollection.deleteOne(query);
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


app.get('/',(req,res)=>{
    res.send('the  Tourists Spot server is running')
})

app.listen(port,()=>{
    console.log(`the Tourists Spot is running port : ${port}`)
})