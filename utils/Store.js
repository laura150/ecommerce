import Cookies from 'js-cookie';
import {createContext, useReducer} from 'react'

export const Store = createContext()
console.log(Store)

const initialState ={
    darkMode : Cookies.get('darkMode') === 'ON'? true : false, //when you get on the page for the fisrt time, the darkmoe is set to false because the logic in the cookies is false now
    cart : {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')): [],
    },
    userInfo:Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null
  
};

console.log(Cookies.get('userInfo'))

export const reducer = (state, action)=>{
    switch(action.type){
        case 'DARK_MODE_ON' :
            return {...state, darkMode: true}
        case 'DARK_MODE_OFF' :
            return {...state, darkMode: false}
        case 'CART_ADD_ITEM': {
                const newItem = action.payload; //item gotten from payload
                const existItem = state.cart.cartItems.find( //<= checking to see if the item gotten from the payload already exists
                  (item) => item._id === newItem._id
                );
                const cartItems = existItem ? state.cart.cartItems.map((item) => //<= if existitem is true, map through the cartitems, get the item and then replace the current value wuth the new value "newItem" otherwise just add the new item to the array
                 item.name === existItem.name ? newItem : item
                    )
                  : 
                  [...state.cart.cartItems, newItem];
                Cookies.set('cartItems', JSON.stringify(cartItems));
                return { ...state, cart: { ...state.cart, cartItems } };
              }
         case 'CART_REMOVE_ITEM': {
                const cartItems = state.cart.cartItems.filter(
                  (item) => item._id !== action.payload._id
                );
                Cookies.set('cartItems', JSON.stringify(cartItems));
                return { ...state, cart: { ...state.cart, cartItems } };
              }
          case 'USER_LOGIN':{
           
            return { ...state, userInfo: action.payload }
          }
          

        default:
        return state
    }
}

 export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initialState)

    const value={state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
};

