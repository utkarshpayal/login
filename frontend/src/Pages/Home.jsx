import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library


function Home() {
    const location = useLocation(); 


    return (
        <div className=''>
            {location.state.id ? (
                <h1 className='text-blue-500 font-bold text-5xl p-20 text-center'>Welcome {location.state.id}</h1>
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