const express=require('express');
const mongoose=require('mongoose');
const app=express();
const {Schema}=mongoose;
main()
.catch((err)=>{
    console.log('an error occured while connecting to db',err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

const PersonSchema=new Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
})

const person=mongoose.model('person',PersonSchema);
// person.insertMany([{
//     firstName:'siva ganesh',
//     lastName:'gullipalli',
// },
// {
//     firstName:'yugesh',
//     lastName:'A',
// }])

person.updateOne({firstName:'yugesh'},{lastName:'B'})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

app.listen(8080,()=>{
    console.log('server starts listening');
})