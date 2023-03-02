const express=require("express")
const app=express.Router()
const orderModel = require("../Schema/orderModel")
const cartModel = require("../Schema/cartModel")
app.post("/post", async(req , res)=>{
    // const {title,image,price,count}=req.body
  
    try {
      const productcart = await cartModel.find()
      const product = await orderModel.insertMany(productcart)
      console.log(product)
      product.save()
      return res.status(200).send("order sucessfully")
    } catch (e) {
      console.log(e.massage)
      return res.send(e.message)
    }
})
app.get("/get", async(req , res) =>{
    const product = await orderModel.find()
  
    return res.send(product)
})


module.exports =app


// const orderProduct = async (req, res) => {
//     // const {title,image,price,count}=req.body
  
//     try {
//       const productcart = await cartModel.find()
//       const product = await orderModel.insertMany(productcart)
//       console.log(product)
//       product.save()
//       return res.status(200).send("order sucessfully")
//     } catch (e) {
//       console.log(e.massage)
//       return res.send(e.message)
//     }
//   }
  
//   const getProductorder = async (req, res) => {
//     const product = await orderModel.find()
  
//     return res.send(product)
//   }
//   module.exports = { orderProduct, getProductorder }

