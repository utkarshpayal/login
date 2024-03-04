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
                        // Cookies.set('email', email); // Store email in a cookie
                        history("/",{state:{id:email}})

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
      <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96 border-t  border-blue-400">
          <h1 className="text-3xl  font-bold text-center mb-8">Login</h1>
          <form className="space-y-4" action="POST">
            <div className=''>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">Email</label>
              <input
                id="email"
                className=" bg-gray-200 p-2 w-full rounded   "
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder="Enter Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                className="bg-gray-200 p-2  w-full rounded "
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder="Enter Password"
              />
            </div>
            <button
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              type="submit"
              onClick={submit}
            >
              Submit
            </button>
          </form>
          <p className="text-center mt-4">OR</p>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-blue-500">Sign Up</Link>
          </div>
        </div>
      </div>
    );
}

export default Login