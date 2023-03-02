const express=require("express")
const app=express.Router()
const cartModel = require("../Schema/cartModel")

app.post("/post", async(req , res) => {
    const { title, imageFileSet , price, count } = req.body
    //, userid 
    try {
        const product = new cartModel({ title, imageFileSet, price, count   })
        //,userid
        console.log(product)
        const newProduct = await product.save()
       return res.status(200).send("Product Added to cart sucessfully")
    
      } catch (e) {
        console.log(e.massage)
        return res.send(e.message)
      }  
})
app.delete("/:id", async(req , res) =>{
    const { id } = req.params;
    const user = await cartModel.findByIdAndDelete({ _id: id });
    //   console.log(user, "User By Deleteing Id");
    return res.status(201).send(user);
})
app.put("/:id", async(req , res) => {
    const updateProduct = await cartModel.findByIdAndUpdate(req.params.id,
        {
          $set: req.body,
        }, { new: true })
      return res.status(200).send(updateProduct) 
        //   console.log(updatedData, "updated Data in patch");
        ;
})
app.get("/get", async(req , res) => {
    const product = await cartModel.find()
    // const product = await cartModel.find().populate({path : "user_id"})

    return res.send(product)
})
module.exports =app

 

