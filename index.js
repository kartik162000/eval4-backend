const express=require('express');
const app=express();
const port=process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const cors=require('cors');
app.use(cors());

app.use('/api',require('./src/routes/routes'));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});