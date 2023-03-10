import React, { useState } from 'react'
import Rating from 'react-rating'
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2';
import { addProductReview } from '../actions/productActions'

export default function Review({product}) {

    const dispatch = useDispatch()
    const [rating , setrating] = useState(5)
    const [comment , setcomment] = useState('')

    function sendreview(){

        if(localStorage.getItem('currentUser'))
        {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))

            var alreadyreviewed
    
            for(var i=0;i<product.reviews.length;i++) {
    
                if(product.reviews[i].userid==currentUser._id){
                    alreadyreviewed = true
                }
    
            }
    
            if(alreadyreviewed)
           
            {
                Swal.fire('Oops', 'You have already reviewed this product', 'error');
      
            }else{
    
                const review={
                    rating :rating ,
                    comment :comment
                }
        
                dispatch(addProductReview(review , product._id))
                
            }
        }
        else{
            
            Swal.fire('Oops', 'Cannot Review without logging-in', 'error').then(result => { window.location.href = '/login' });
        }

        


    }
    return (
       <>
        <div className='ml-2 '>
            <h2>Give Your Review</h2>

            <Rating
            style={{ color: "orange" }}
            initialRating={rating}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
           onChange={(e)=>{setrating(e)}}

          />

          <input type="text" className="form-control mt-2" value={comment} onChange={(e)=>{setcomment(e.target.value)}}/>
          <button className='btn mt-3' onClick={sendreview}>Submit Review</button>

          <h2 className='mt-3'>Latest Reviews</h2>

          {product.reviews && (product.reviews.map(review=>{
              return <div className="text-left">
                    <Rating
            style={{ color: "orange" }}
            initialRating={review.rating}
            emptySymbol="fa fa-star-o fa-1x"
            fullSymbol="fa fa-star fa-1x"
            readonly

          />
          <p>{review.comment}</p>
          <p>By : {review.name}</p>
          <hr/>
              </div>
          }))}
        </div>
        </>
    )
       
}