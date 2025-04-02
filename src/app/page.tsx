'use client'
import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { signIn, signOut, useSession } from 'next-auth/react'

const page = () => {
  const { data: session } = useSession();

  //getting the weather data
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)

  //search the location
  const [location, setLocation] = useState('')

  //writing the function to fetch the weather data
  const FetchData = async () => {
    const url = 'https://yahoo-weather5.p.rapidapi.com/weather?location=sunnyvale&format=json&u=f';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'f02bb763b7mshb59b0b23f56f68ap18e5c5jsnbd4c4910e7aa',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  //fetching the weather data
  useEffect(() => {
    FetchData();
  }, [])

  return (
    <>
      <div className='flex flex-col items-center justify-center relative'>
        {session ? (
          <button
            onClick={() => signOut()}
            className='absolute top-4 right-4 px-4 py-2 bg-black text-white rounded-md flex items-center'
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn('google')}
            className='absolute top-4 right-4 px-4 py-2 bg-black text-white rounded-md flex items-center'
          >
            Authenticate
          </button>
        )}
        <div id='Header' className='py-8'>
          <h1 className='text-4xl font-extrabold'>Weather App</h1>
        </div>
        <div className='flex flex-row items-center justify-center mt-4'>
          <input
            type='text'
            placeholder='Search a location...'
            style={{ width: '600px', padding: '8px', border: '1px solid gray', borderRadius: '4px' }}
          />
          <button className='ml-4 px-4 py-2 bg-black text-white rounded-md flex items-center'>
            <FaSearch className='mr-2' /> Search
          </button>
        </div>
        <div className='mt-12 w-[720px] h-[200px] border border-gray-300 rounded-md'>
          {/* Empty box */}
        </div>
      </div>
    </>
  )
}

export default page