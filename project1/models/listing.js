const mongoose=require('mongoose');
const schema=mongoose.Schema;

const listingSchema=new schema({
    title:{
      type:String,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    image:{
      type:String,
      default:'https://images.unsplash.com/photo-1495616811223-4d98c6e9mongc869?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      set:(v)=> v===''? 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D':v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model('listing',listingSchema);
module.exports=Listing;