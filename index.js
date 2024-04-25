const express = require('express');
const cors = require('cors');
const app=express();
const port = process.env.PORT || 5000;

// medilwere

app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send('the  Tourists Spot server is runnig')
})

app.listen(port,()=>{
    console.log(`the Tourists Spot is runnig port : ${port}`)
})