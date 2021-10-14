import React, {useContext} from 'react'
import Head from 'next/head'
import {AppBar, Container, CssBaseline, Link, Toolbar, Typography, ThemeProvider, Switch, Badge} from '@material-ui/core'
import { createMuiTheme} from '@material-ui/core/styles'
import useStyles from '../../utils/styles'
import NextLink from 'next/link'
import {Store} from '../../utils/Store'
import Cookies from 'js-cookie'



const Layout = ({title, children, description}) => {
    const {state, dispatch} = useContext(Store)
    const {darkMode, cart} =state
    const classes= useStyles()
    const darkModeHandler = ()=>{
        dispatch({type: darkMode? 'DARK_MODE_OFF' : 'DARK_MODE_ON'})
        const newDarkMode = !darkMode
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
    }
    const theme = createMuiTheme({
        typography: {
          h1: {
            fontSize: '1.6rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
          h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
        },
        palette: {
             type: darkMode ? 'dark' : 'light',
            primary: {
              main: '#f0c000',
            },
            secondary: {
              main: '#208080',
            },
          },
    })
    return (
        <div>
            <Head>
                <title>{title? `${title} - Ecommerce` : 'Ecommerce' }</title>
            {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position='static' className={classes.navbar}>
                    <Toolbar>
                        <NextLink href='/' passHref>
                            <Link>
                                <Typography className={classes.brand}>Ecommerce</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <div>
                            <Switch checked={darkMode} onChange={darkModeHandler}></Switch>
                        <NextLink href='/cart' passHref>
                            <Link>
                           {
                               cart.cartItems.length >0 ? (<Badge color='secondary' badgeContent={cart.cartItems.length}>cart</Badge>): ('cart')
                           }
                            </Link>
                        </NextLink>

                        <NextLink href='/login' passHref>
                            <Link>
                            Login
                            </Link>
                        </NextLink>
                        </div>
                    </Toolbar>
                </AppBar>

                <Container className={classes.main}>
                {children}
                </Container>

                <footer className={classes.footer}>
                    <Typography> Copyright &copy;</Typography> 
                </footer>
            </ThemeProvider>
        
        </div>
    )
}

export default Layout
