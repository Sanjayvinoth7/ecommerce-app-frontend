import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {useDispatch , useSelector} from 'react-redux'
import { placeOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'
export default function Checkout({amount}) {

    const dispatch = useDispatch()
    const orderstate = useSelector(state=>state.placeOrderReducer)

    const { loading , success , error } = orderstate
    function tokenHandler(token)
    {
         console.log(token);
         dispatch(placeOrder(token , amount))
    }

    function validate()
    {
        if(!localStorage.getItem('currentUser'))
        {
             window.location.href ='/login'
        }else{
            localStorage.removeItem("cartItems")
        }
    }

   

    return (
        <div>

            {loading && (<Loader/>)}
            {success && (<Success success='Your Order Placed Successfully'/>)}
            {error && (<Error error='Something Went wrong' />)}
            
            <StripeCheckout
            token={tokenHandler}
            amount={amount*100}
            shippingAddress
            currency='INR'
            stripeKey='pk_test_51MZGvhSGDa1FYuRCESCDQG8mTqHQMWBPMAdGEr0X1ce9wYkIcnTO3WKSIaluMtgdfSayJ8r6xCfy9A2KLYMrFX2700D0koV1vc'
            // stripeKey='pk_test_51MZGvhSGDa1FYuRCESCDQG8mTqHQMWBPMAdGEr0X1ce9wYkIcnTO3WKSIaluMtgdfSayJ8r6xCfy9A2KLYMrFX2700D0koV1vc'
            >

            <button className="btn" onClick={validate}>PAY NOW</button>

            </StripeCheckout>

        </div>
    )
}
