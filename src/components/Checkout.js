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
            stripeKey='pk_test_51MdRTcSADYwrP5wmJNYzFxk8c03oR7qhQU5Oc9yNzbBitGyC6kEdkmIJWvCBrJAqksIC62jDFFCCdo9fNy7KgYv000gHR0o6vk'
            // stripeKey='pk_test_51MdRTcSADYwrP5wmJNYzFxk8c03oR7qhQU5Oc9yNzbBitGyC6kEdkmIJWvCBrJAqksIC62jDFFCCdo9fNy7KgYv000gHR0o6vk'
            >

            <button className="btn" onClick={validate}>PAY NOW</button>

            </StripeCheckout>

        </div>
    )
}
