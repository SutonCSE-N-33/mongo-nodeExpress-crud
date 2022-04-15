const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, Collection,ObjectId} = require('mongodb')
const uri = "mongodb+srv://nazrul:mother06@cluster0.6u8iq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})


client.connect(err => {
  const collection = client.db("firstMongodb").collection("products");  



  


  app.post('/addProduct',(req,res) => {
      const product = req.body;
      collection.insertOne(product)
    .then(result => {
        console.log("data inserted");
        res.redirect('/');
    })
})

app.get('/products',(req,res) => {
    collection.find({})
    .toArray((err,documents) => {
        res.send(documents);
    })
})

  app.delete(`/delete-item/:id`,(req,res)=>{
    collection.deleteOne({ 
        _id:ObjectId(req.params.id)
      })
      .then(function(result) {
         res.send(result.deletedCount>0);
      })
  })

  app.get('/product/:id',(req,res) => {
      collection.find({_id:ObjectId(req.params.id)})
      .toArray((err,documents)=>{
          const product = documents[0];
          res.send(product)
      })
  })

  app.patch('/upDateProduct/:id',(req,res) => {
      console.log(req.body.quantity,req.body.price)
    collection.updateOne(
        { _id:ObjectId(req.params.id) },
        { $set: { quantity:req.body.quantity, price:req.body.price} })
      .then(function(result) {
        res.send(result.modifiedCount>0)
      }) 
  })
  
                                                                                                                                                        
});




app.listen(3000,()=>console.log("Hello 3000"));

