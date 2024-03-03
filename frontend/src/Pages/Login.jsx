import React from 'react'
import {useNavigate,  Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library


function Login() {

    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    async function submit(e){
        e.preventDefault();
        try{
                await axios.post('http://localhost:5000/login',{
                email, password })
                .then(res => {
                    if(res.data == 'success'){
                        Cookies.set('email', email); // Store email in a cookie
                        history("/home",{state:{id:email}})

                    }else if(res.data == 'user_not_exists'){
                        alert('User has not signed up')
                    }
                    else if(res.data == 'incorrect_password'){
                      alert('Please enter correct password')
                  }
                })
                .catch(e =>{
                alert('wrong details')
                console.log(e)
            })

                
        }
        catch(e){
            console.log(e);
        }


    } 
  return (
    <>
  <h1 className='font-bold text-3xl p-10 text-center'>Login</h1>
  <form className='border border-black flex flex-col items-center p-4' action='POST'>
    <input className='rounded border p-2 mb-4' type='email' onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter Email'/>
    <input className='rounded border p-2 mb-4' type='password' onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter Password'/>
    <button className='bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600' type='submit' onClick={submit}>Submit</button>
  </form>
  <p className="text-center">OR</p>
  <div className="text-center">
    <Link to="/signup" className="text-blue-500">Signup Page</Link>
  </div>
</>


  )
}

export default Login