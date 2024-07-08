import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IP } from './Constant'
const APICallingDuration = 900000
const LocationTracker = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  console.log('location tracker api is called')
  const findCurrentLocation = ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );           
              const data = await response.json();
              saveData(data.display_name)
              setAddress(data.display_name);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching address:', error);
              setLoading(false);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLoading(false);
      }
  }
  useEffect(() => {
    let id = setInterval(() => {
        findCurrentLocation();
      }, APICallingDuration);
    return () => clearInterval(id);
  }, []);
   const saveData = (addressData)=>{
    const data = {
        'user_id':  localStorage.getItem("user_id"),
        'location': addressData,
        'is_active': 1,
    }
    axios.post(IP + 'ventilia-api/index.php/api/user/location', data, {
        headers: {
            'token_code': localStorage.getItem("token_code"),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }
    }).then((response) => {
        console.log('loction saved successfullly.', 'success')
    }).catch(err => {
        console.log('Something got wrong please try again later.', 'error')
        console.log(err);
    });
   }
  // return (
  //   <div className='center'>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <p>Current Location: {address}</p>
  //     )}
  //   </div>
  // );
};

export default LocationTracker;


