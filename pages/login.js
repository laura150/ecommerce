import { List, Typography, TextField, Link , Button} from '@material-ui/core'
import Layout from '../Components/Layout/Layout'
import React from 'react'
import { ListItem } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import axios from 'axios'
import {useState} from 'react'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles()
    // const handleSubmit= async (e)=>{
    // //     e.preventDefault()
    // //     try{
    // //         const {data} = await axios.post('api/users/login', {
    // //             email,
    // //             password
    // //         })
    // //         alert('sucess login')
    // //     }catch(err){

    // //       alert(err.message )
    // //     }
    // // }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post('/api/users/login', {
            email,
            password,
          });
          alert('succss login');
        } catch (err) {
        //   alert(err.response.data ? err.response.data.message : err.message);
        alert(err.message )
        }
      };
    return (
        <Layout title='Login'>
            <form className={classes.form} onSubmit={submitHandler}>
                <Typography component='h1' varaint='h1'>
                    Login
                </Typography>
                <List>
                <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              onChange={(e)=> setEmail(e.target.value)}
            ></TextField>
          </ListItem>

          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: 'password' }}
              onChange={(e)=> setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
           <Button variant='contained' type='submit' color='primary' fullWidth>Button</Button>
          </ListItem>
          <ListItem>
           Dont have an account? {''}
           <NextLink href='/register' passHref>
               <Link>Sign up</Link>
           </NextLink>
          </ListItem>
                </List>
            </form>

        </Layout>
    )
}

export default Login
