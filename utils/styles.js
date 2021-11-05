import {makeStyles} from '@material-ui/core'
const useStyles = makeStyles({
    navbar:{
        backgroundColor: '#203040',
        '& a':{
            color: '#FFFFFF',
            marginLeft:10,
        }
    },

    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
    },

    grow:{
        flexGrow: 1
    },

    main:{
        minHeight:'80vh',
    }, 

    footer:{
        textAlign:'center',
        marginTop: 50,
        marginBottom: 10
    },

    section: {
        marginTop: 10,
        marginBottom: 10
    },

    form: {
        maxWidth: 800,
        margin:' 0 auto'
    },
    navbarButton: {
       color:'#FFFFFF' ,
       textTransform:'initial',
       zindex: 1000
    }

})

export default useStyles