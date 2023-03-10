import React, { useState } from "react";
import {useDispatch , useSelector} from 'react-redux'
import {registerNewUser} from '../actions/userActions'
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
export default function Registerscreen() {

  const registerstate =  useSelector(state=>state.registerNewUserReducer)

  const {loading , error , success} = registerstate

  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const dispatch = useDispatch()

  function register(e) {

    e.preventDefault()
    const user={
        name : name ,
        email : email , 
        password : password
    }

    if(password==cpassword)
    {
        dispatch(registerNewUser(user))
    }
    else{
        alert('passwords not matched')
    }
    
  }

  return (
    <div>
      {loading && (<Loader/>)}
      <div className="row justify-content-center update-bg">
        <div className="col-md-5  p-3 p-3 mb-5 log-body" style={{ marginTop: "100px", color:"white"  }}>
          <div className="div">
            <h2 style={{display: "inline"}} className="text-center m-3 text-black">Register</h2>
            <i style={{fontSize:'25px'}} className="fa fa-user-plus" aria-hidden="true"></i>

            
            {error && (<Error error ='Email Address is already registred' ></Error>)}
            {success && (<Success success='Your Registration is successfull' />)}

              <form onSubmit={register}>
              <input
              type="text"
              placeholder="name"
              className="form-control"
              required
              value={name}
              onChange={(e) => {
                setname(e.target.value);
                
              }}
            />
            <input
              type="text"
              placeholder="email"
              className="form-control"
              value={email}
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <input
              type="password"
              placeholder="confirm password"
              className="form-control"
              value={cpassword}
              required
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <div className="text-right">
              <button type='submit' className="btn mt-3">
                REGISTER
              </button>
            </div>
            <div className='margin-10'><a  href="/login" >Click Here To Login</a></div>
              </form>

              
            
          </div>
        </div>
      </div>
    </div>
  );
}
