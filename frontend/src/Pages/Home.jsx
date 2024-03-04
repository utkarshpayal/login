import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(sessionStorage.getItem('userId') || null);

    useEffect(() => {
        // Check if session is stored in sessionStorage
        const sessionStatus = sessionStorage.getItem('loggedIn');
        if (sessionStatus === 'true' && userId) {
            setLoggedIn(true);
        }
    }, [userId]);

    useEffect(() => {
        // Check if userId is stored in sessionStorage
        if (!userId) {
            const newUserId = location.state && location.state.id;
            if (newUserId) {
                setUserId(newUserId);
                sessionStorage.setItem('userId', newUserId);
            }
        }
    }, [location.state, userId]);

    return (
        <div className=''>
            {loggedIn ? (
                <h1 className='text-blue-500 font-bold text-5xl p-20 text-center'>{userId} logged in</h1>
            ) : (
                <h1 className='text-red-500 font-bold text-5xl p-20 text-center'>Not logged in</h1>
            )}
            <div className='border border-gray bg-gray-100 p-10'>
                <img className="mx-auto max-w-full h-auto" src="https://media.istockphoto.com/id/1365840714/photo/a-middle-aged-caucasian-woman-donates-blood-from-a-vein-in-a-hospital-the-donor-sits-in-a.webp?b=1&amp;s=170667a&amp;w=0&amp;k=20&amp;c=83_xGqFFHTMrH1LUlizi0kZaL1SiOr3DujrWA5DxBVg=" alt="A middle-aged Caucasian woman donates blood from a vein in a hospital" />
            </div>
        </div>
    );
}

export default Home;
