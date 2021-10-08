//THIS seed api is to create sample products in database

import nc from 'next-connect'
import data from '../../utils/data'
import Product from '../../models/Product'
import db from '../../utils/db'



const handler = nc()

handler.get(async(req, res)=>{
   
    await db.connect() 
    await Product.deleteMany()
    await Product.insertMany(data.products)
    await db.disconnect()
   res.send({message: 'seeded sucessfully'}) 
})


export default handler