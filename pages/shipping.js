import React from 'react'
import {useRouter} from 'next/router'
import {Store} from '../utils/Store'

const Shipping = () => {
    const router = useRouter()
const redirect =router.query
  const { dispatch, state} = useContext(Store)
  const {user} = state
  if(!user){
    router.push('/login?redirect=/shipping')
  }
    return (
        <div>
            Shipping
        </div>
    )
}

export default Shipping
