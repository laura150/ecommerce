import React from 'react'
import {useRouter} from 'next/router'
import {data} from '../../utils/data'
import Layout from '../../Components/Layout/Layout' 
import { Link, Grid, List , ListItem, Typography, Card, Button } from '@material-ui/core'
import NextLink from 'next/link'
import useStyles from '../../utils/styles'
import Image from 'next/image'
import Product from '../../models/Product'
import db from '../../utils/db'

const Productpage = (props) => {
    const {product} = props
    const classes = useStyles()
    console.log(data)
//     const router = useRouter()
//     const {slug} = router.query
//     console.log(slug)
//    const product = data.products.find((a)=> a.slug === slug)
//    console.log(product)
   if(!product){
       return <div>Product Not Found</div>
   }
  const addToCartHandler = async()=>{
    const {data} = await axios.get(`api/products/${product._id}`)
    // dispatch({type: 'CART_ADD_ITEM', payload:})
  }
    return (
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <NextLink href='/' passHref>
                    <Link><Typography>Back to products</Typography></Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid items md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout='responsive'></Image>
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem>
                            <Typography component="h1" variant="h1">{product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Category: {product.category}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Brand: {product.brand}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Description: {product.description}</Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} >
                                       <Typography>Price</Typography>
                                    </Grid>

                                    <Grid item  xs={6}>
                                       <Typography>{product.price}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6} >
                                       <Typography>Status</Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                       <Typography>{product.countInStock>0? 'In Stock' : 'Unavailable'}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant='contained' color='primary' onClick={addToCartHandler}>
                                    Add to Cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
       
    )
}
export default Productpage

export async function getServerSideProps(context){ //passing context here so we can extract params from context for the url of each product
    const {params} = context
    const{slug} = params
    await db.connect()
    const product = await Product.findOne({slug}).lean()
     await db.disconnect() 
   
     return {
       props:{
         product: db.convertDocToObj(product), 
       }
     }
   }