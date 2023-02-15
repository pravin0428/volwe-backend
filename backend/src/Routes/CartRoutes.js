const express = require("express");
const { isValidObjectId } = require("mongoose");
 
const ProductModel = require("../Schema/CartSchema");
  const { validatePost } = require("../Validator/postValidator");
const app = express();
app.use(express.json());
 

app.get("/", async (req, res) => {
  // console.log((ProductModel).find())
  const data = await ProductModel.find();
  // console.log(data)
  return res.status(200).send({ data });
});

 

app.post("/", async (req, res) => {
 
  const { body } = req;
    console.log(body)
    let id = body._id

    let existingUser = await ProductModel.findOne({id}) 
    console.log(existingUser , "alllllredy have")
    if(existingUser){
      return  res.send({message:"This product alredy exist in cart"}).status(200)
   }

  //  so now to post our data to the server we have to make the new data object and the we have post it
  console.log({ ...body });
  const newPost = new ProductModel({ ...body })
  console.log(newPost,"-----------") 
  if (newPost.title === "" || newPost.imageFileSet === "" || newPost.description === "" || newPost.publishedAt === "" ) {
    return res.status(400).send("empty post object ! Please fill all the data");
  }else{
    const post = await newPost.save();
   res.status(200).send("Data added successfully")
  } 
   
});

//delete req

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).send("invalid object id");
  }
  try {
    let data = await ProductModel.findByIdAndDelete(id);
    //  await data.remove() // we are also use this approch
    return res.status(200).send("post deleted success");
  } catch (error) {
    console.log(error);
  }
});

 
module.exports = app;
