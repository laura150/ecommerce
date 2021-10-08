//we are going to create an api that returns list of products from database
//first we install next-connect, it is a routing and middleware for next,js and we are going to use it to create out backend APIs
import nc from 'next-connect'
import Product from '../../../models/Product'
import db from '../../../utils/db'
const handler = nc()

handler.get(async(req, res)=>{
    await db.connect() //connect to the database
    const products = await Product.find({})//passing empty object as a parameter means return all products without any filter on them
    await db.disconnect() //disconnect from database
   res.send(products) //respond.send products
})

//after this you will ckeck in the browser and you should see an empty array, meaning you sucessfully connected to database and in the Product modal, there is no data. it is an empty array

export default handler