import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/signup', {
                email,
                password
            });

            if (res.data === 'exists') {
                alert('User already exists');
            } else {
                sessionStorage.clear();
                sessionStorage.setItem('loggedIn', true);
                history("/", { state: { id: email } });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96 border-t border-blue-400">
                <h1 className="text-3xl font-bold text-center mb-8">Signup</h1>
                <form className="space-y-4" action="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            className="bg-gray-200 p-2 w-full rounded"
                            type="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder="Enter Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            className="bg-gray-200 p-2 w-full rounded"
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
                    <Link to="/login" className="text-blue-500">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
