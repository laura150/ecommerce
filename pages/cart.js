import React from 'react'
import {Store} from '../utils/Store'
import {useContext} from 'react'
import Layout from '../Components/Layout/Layout'
import { Typography, Grid, TableRow, TableCell, Link, Select, MenuItem, Button, Card, List , ListItem } from '@material-ui/core'
import NextLink from 'next/link'
import { TableContainer } from '@material-ui/core'
import { Table } from '@material-ui/core'
import { TableHead } from '@material-ui/core'
import { TableBody } from '@material-ui/core'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import axios from 'axios'
import {useRouter} from 'next/router'

const Cartscreen = () => {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {cart} = state
    const {cartItems} = cart

    const updateCartHandler = async(item, quantity)=>{
        const {data} = await axios.get(`/api/products/${item._id}`) // we used axios to get the products in order to check if the product is available, that is count in sctock before adding the product to cart
        if( data.countInStock <= 0){
            window.alert('Sorry this product is out of stock')
            return
        }
         dispatch({type: 'CART_ADD_ITEM', payload:{...item, quantity}})
    }

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
      };

    const checkoutHandler = ()=>{
        router.push('/shipping')
    }
    return (
       <Layout title='Shopping Cart'>
           <Typography component='h1' varaint='h1'>Shopping Cart</Typography>
           {
               cartItems.length === 0? <div>No Item in the cart
               <NextLink href='./' >
                   <Link passHref>
                   Go Shoppig
                   </Link>
                </NextLink></div> 
               : <Grid container spacing={1}>
                   <Grid item md={9} xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align='right'>quantity</TableCell>
                                        <TableCell align='right'>price</TableCell>
                                        <TableCell align='right'>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cartItems.map((item)=>(
                                            <TableRow  key={item._id}>
                                                <TableCell>
                                                    <NextLink href={`/product/${item.slug}`} passHref>
                                                        <Link>
                                                        <Image src={item.image} alt='item' width={50} height={50}/>
                                                        </Link>
                                                    </NextLink>
                                                </TableCell>

                                                <TableCell>
                                                <NextLink href={`/product/${item.slug}`} passHref>
                                                    <Link>
                                                         <Typography>{item.name}</Typography>
                                                    </Link>
                                                    </NextLink>
                                                </TableCell>

                                                <TableCell  align='right'>
                                                   <Select value={item.quantity} onChange={(e)=>{updateCartHandler(item, e.target.value)}}>
                                                       {
                                                           [...Array(item.countInStock).keys()].map((x)=>( // creating an array from countinstock from 0 to the last index then mapping through them to give them the menuitem and setting the key and value to x+1 because we dont want it to show zero
                                                               <MenuItem key={x+1} value={x+1}>
                                                                   {x+1}
                                                               </MenuItem>
                                                           ))
                                                       }
                                                   </Select>
                                                </TableCell>

                                                <TableCell  align='right'>
                                                    <Typography>${item.price}</Typography>
                                                </TableCell>

                                                <TableCell  align='right'>
                                                <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => removeItemHandler(item)} //in this function call an argument is being added becasue we want to do something with it
                                                >
                                                x
                                                </Button>
                                                </TableCell>

                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                   </Grid>

                   <Grid item md={3} xs={12}>
                   <Card>
                       <List>
                           <ListItem>
                               <Typography varaint='h2'>
                                Subtotal({cartItems.reduce((a, c)=> a + c.quantity, 0 )} {''}items) 
                                    :
                                   ${''}{cartItems.reduce((a, c)=> a + c.quantity * c.price,  0 )}  
                               </Typography>
                           </ListItem>

                           <ListItem>
                               <Button varaint='contained' color='primary' fullWidth onClick={checkoutHandler}>Check Out</Button>
                           </ListItem>
                       </List>
                   </Card>
                   </Grid>

               </Grid>
           }

       </Layout>
    )
}

export default dynamic(()=> Promise.resolve(Cartscreen), {ssr: false})
