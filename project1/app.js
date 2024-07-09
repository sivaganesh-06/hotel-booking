const express=require('express');
const mongoose=require('mongoose');
const {data}=require('./init/data.js');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const path=require('path');
const app=express();
const Listing=require('./models/listing.js');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')))

main();

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/',(req,res)=>{
  res.send('hii i am root')
})

app.get('/listings',async (req,res)=>{
  const allListings=await Listing.find({});
  res.render('listings/index.ejs',{allListings})
})

//new route
app.get('/listings/new',(req,res)=>{
  res.render('listings/new.ejs');
})

//show route
app.get('/listings/:id',async(req,res)=>{
  const {id}=req.params;
  const listing=await Listing.findById(id);
  res.render('listings/show.ejs',{listing});
})

//edit route
app.get('/listings/:id/edit',async(req,res)=>{
  const {id}=req.params;
  const listing=await Listing.findById(id);
  res.render('listings/edit.ejs',{listing});
})

app.post('/listings',async (req,res)=>{
  const newListing=new Listing(req.body.listing);
  await newListing.save();
  res.redirect(`listings/${newListing.id}`);
})

app.put('/listings/:id',async(req,res)=>{
  const {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect('/listings');
})

app.delete('/listings/:id',async(req,res)=>{
  const {id}=req.params;
  const result=await Listing.findByIdAndDelete(id);
  res.redirect('/listings');
})

app.listen(8080,()=>{
    console.log('server starts listening');
});

