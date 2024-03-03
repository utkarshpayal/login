import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Signup() {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    async function submit(e){
        e.preventDefault();
        try{
                await axios.post('http://localhost:5000/signup',{
                email, password })
                .then(res => {
                    if(res.data == 'exists'){
                        alert('User already exists')
                    }else if(res.data =='notexists'){
                        history("/home",{state:{id:email}})                    }
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
  <h1 className='  text-black font-bold text-3xl  rounded-t-xl text-center p-10'>Signup</h1>
  <form className='border border-black rounded-b-xl p-4 flex flex-col items-center' action='POST'>
    <input className='rounded border p-2 mb-4 w-64' type='email' onChange={(e) => {setEmail(e.target.value)}} placeholder='Enter Email'/>
    <input className='rounded border p-2 mb-4 w-64' type='password' onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter Password'/>
    <button className='bg-red-400 text-white px-4 py-2 rounded' type='submit' onClick={submit}>Submit</button>
  </form>
  <p className="text-center mt-4">OR</p>
  <div className="text-center">
    <Link to="/login" className="text-blue-500">Login Page</Link>
  </div>
</>

  )
}

export default Signup;