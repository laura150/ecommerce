import { List, Typography, TextField, Link , Button} from '@material-ui/core'
import Layout from '../Components/Layout/Layout'
import React, {useContext} from 'react'
import { ListItem } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import axios from 'axios'
import {useState} from 'react'
import {Store} from '../utils/Store'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'



const Login = () => {
  const router = useRouter()
  const {redirect} =router.query //
  const { dispatch, state} = useContext(Store)
  const {userInfo} = state
  if(userInfo){// if user is there, there is no need to go to the login form. when the user is loggedin and tries to access the login form, this prevents it
    router.push('/')
  }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles()
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post('/api/users/login', {
            email,
            password,
          });
          console.log(data)
          dispatch({ type: 'USER_LOGIN', payload: data });
          Cookies.set('userInfo', data)
          router.push(redirect || '/');
        } catch (err) {
           alert(err.response.data ? err.response.data.message : err.message); //meaning if there is an error in the data coming from the backend, render the error message else render the default 401 error message
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
