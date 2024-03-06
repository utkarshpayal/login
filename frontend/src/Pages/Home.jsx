import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        if (location.state && location.state.loggedIn && location.state.userEmail) {
            // Set loggedIn state to true if user is logged in
            setLoggedIn(true);
            // Set the user's email
            setUserEmail(location.state.userEmail);
        }
    }, [location.state]);

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
            <div className="border border-gray bg-gray-100 p-10">
                <img className="mx-auto max-w-full h-auto" src="https://media.istockphoto.com/id/1365840714/photo/a-middle-aged-caucasian-woman-donates-blood-from-a-vein-in-a-hospital-the-donor-sits-in-a.webp?b=1&amp;s=170667a&amp;w=0&amp;k=20&amp;c=83_xGqFFHTMrH1LUlizi0kZaL1SiOr3DujrWA5DxBVg=" alt="A middle-aged Caucasian woman donates blood from a vein in a hospital" />
            </div>
            {loggedIn ? (
                <h1 className="text-blue-500 font-bold text-5xl p-20 text-center">{userEmail} logged in</h1>
            ) : (
                <h1 className="text-red-500 font-bold text-5xl p-20 text-center">Not logged in</h1>
            )}
        </div>
    );
}

export default Home;
