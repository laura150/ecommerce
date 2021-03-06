import { CardActionArea, CardActions, CardMedia } from '@material-ui/core'
import { CardContent, Typography, Button } from '@material-ui/core'
import { Grid, Card } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../Components/Layout/Layout'
import styles from '../styles/Home.module.css'
import data from '../utils/data'
import NextLink from 'next/link'
import db from '../utils/db'
import Product from '../models/Product'
import {Store} from '../utils/Store'
import {useContext} from 'react'
import {useRouter} from 'next/router'

import axios from 'axios'

export default function Home(props) {
  const router = useRouter()
  const {state, dispatch} = useContext(Store)
  const {products} = props

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const {data} = await axios.get(`/api/products/${product._id}`) 
   
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
          <div>
            <p>Products</p>
            
           <Grid container spacing={3}>
             {
               products.map((product)=>( //was formerly data.products.map
                 <Grid item md={4} key={product.name}>
                  <Card>
                    <NextLink href={`/product/${product.slug}`} passHref>
                      <CardActionArea>
                          <CardMedia component='img' image={product.image} title={product.name}></CardMedia>
                          <CardContent>
                            <Typography>
                              {product.name}
                            </Typography>
                          </CardContent>
                      </CardActionArea>
                    </NextLink>
                    <CardActions>
                      <Typography>${product.price}</Typography>
                      <Button size='small' color='primary' onClick={()=> addToCartHandler(product)}>Add to Cart</Button>
                    </CardActions>
                  </Card>
                 </Grid>
               ))
             }
           </Grid>
          </div>
      </Layout>

      
    </div>
  )
}
//to fetch data from the database dynamicaly
//next.js will prerender this page on each request using the data returned by getserversideprops
//by having this function before rendering the home page in serverside, we fetch data from database through the products and pass it to the home component
export async function getServerSideProps(){
 await db.connect()
 const products = await Product.find({}).lean() //by default moongoose return an object from document class but by calling the lean function we tell mongoose to skip instantiating a full moongoose document and just give the plain object to us
  await db.disconnect() 

  return {
    props:{
      products: products.map(db.convertDocToObj)//for each item in products, we call convertDocToObj function to convert item to js object thst contains only primary types
    }
  }
}