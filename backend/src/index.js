require("dotenv").config();

const express = require("express");
const cors = require("cors");
 
const connect = require("./Config/db")
const PORT = process.env.PORT || 3000
const ProductsRoute = require("./Routes/ProductRoutes")
const AuthRoutes = require("./Routes/AuthRoutes")
const CartRoute = require("./Routes/CartRoute")
const  OrderRoute=require("./Routes/OrderRoute")
// const  cartRoute=require("./Routes/cartRoute")
console.log(AuthRoutes);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/posts", ProductsRoute );
app.post("/signup",AuthRoutes.Signup)
app.post("/login",AuthRoutes.Login) 
app.use("/cart",CartRoute)
app.use("/order",OrderRoute)

app.listen(PORT, async () => {
    await connect();
    console.log(`listning to http://localhost:${PORT}`)
})
 