const express = require("express");
const { isValidObjectId } = require("mongoose");
const { findByIdAndDelete } = require("../Schema/ProductSchema");
const ProductModel = require("../Schema/ProductSchema");
  const { validatePost } = require("../Validator/postValidator");
const app = express();
app.use(express.json());

// app.get("/" , (req , res)=>{
//     res.send("hi bro")
// })

app.get("/", async (req, res) => {
  // console.log((ProductModel).find())
  const data = await ProductModel.find();
  // console.log(data)
  return res.status(200).send({ data });
});

//get post by id ---------------------
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  if (!isValidObjectId(id)) {
    return res
      .status(400)
      .send("error : dil khush ho gya error id error dekhkr ");
  }
  const data = await ProductModel.findById(id);
  if (!data) {
    return res.status(404).send("no data found for this id");
  }
  return res.status(200).send({ data });
});

//post request : post data in database

app.post("/", async (req, res) => {
  // const {title ,description , imageFileSet ,  publishedAt }  = req.body
  //  console.log(title ,description , imageFileSet ,  publishedAt);
  const { body } = req;
    console.log(body)
   
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

//  edit post

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  // const {data , id} = req.body
  if (!isValidObjectId(id)) {
    return res.status(400).send("invalid object id");
  }
 
  //i have moved the validation in validator folder will dirct use this function here to validate our data
  const { error, value } = validatePost({ body });
  if (error) {
    res.send({ message: error });
  }

  const data = await ProductModel.findOneAndUpdate({ _id: id }, { ...value });
 
  console.log(data);
  if (!data) {
    return res.status(404).send({ data , message: "no data found for update" });
  }

  return res.status(200).send({ data });
});

module.exports = app;
