const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Connect =  () => {
  
    try {
        
        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        console.log("DB connected  successfully");
        
    } catch (err) {
        console.log("DB connection error", err)
    }

     return mongoose.connect(process.env.DB_URL)
}


module.exports = Connect;




// // require("dotenv").config()
// const mongoose = require("mongoose")
// mongoose.set("strictQuery", false);
// const Connection = async() =>{
//   try{
//    mongoose.connect(process.env.DB_URL ,  { useNewUrlParser: true })
//    console.log("DB connected successfully ")
//   }catch(err){
//     console.log( "DB connection failed" , err);
//   }

//   return mongoose.connect(process.env.DB_URL);

// }

// module.exports = Connection;