import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { getAllOrders } from '../actions/orderActions'
import Adminscreen from './Adminscreen'

export default function Orderslist() {

    const getordersstate = useSelector(state => state.getAllOrdersReducer)

    const {loading , error , orders} = getordersstate
    const dispatch = useDispatch()

    useEffect(() => {

       dispatch(getAllOrders())
        
    }, [])

    return (
        <div className='row justify-content-center '>
            
            <Adminscreen/>
            {loading ? (<Loader/>) : (<>
                <div className='col-md-10'>
                {error && (<Error error='something went wrong'/>)}
            <h2>Orders List</h2>
            <table className='table table-bordered  table-responsive-sm text-black'>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Email</th>
                        <th>User Id</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Transaction Id</th>
                    </tr>
                    </thead>

                    <tbody className='order-list'>
                        {orders && (orders.map(order=>{
                            return <tr onClick={()=>{window.location.href=`/orderinfo/${order._id}`}}>
                                <td>{order._id}</td>
                                <td>{order.email}</td>
                                <td>{order.userid}</td>
                                <td>{order.orderAmount}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.transactionId}</td>
                            </tr>
                        }))}
                    </tbody>
               
            </table>
            </div>

            </>)}
            

        
        </div>
    )
}
