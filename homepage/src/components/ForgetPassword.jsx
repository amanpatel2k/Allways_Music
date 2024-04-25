/* 
This code generates a Forget Password Page with the help of Firebase authentication. 

  => User enters a valid email in which the email is sent to the User
    => The User will receive an alert message stating that the reset password template email is sent to the email that the User entered

  => If the user email doesn't exist, the alert message will say invalid.
*/

import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { sendPasswordResetEmail, getAuth} from "firebase/auth";

const ForgetPassword = () => {

  // Define a useState for the user's email 
  const [user_email, setEmail] = useState('')

  // Define variables for navigating to different pages and firebase authentication
  const navigate = useNavigate();
  const auth = getAuth();

  /* 
    Function handles the send the reset password email 
      => Utilizes the sendPasswordResetEmail function from Firebase authentication
    => If the email exists, then the email is sent
    => Else, if the email doesn't exist, then an alert message will display 
  */ 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try { 
      await sendPasswordResetEmail(auth, user_email)
      .then(() => {
        if(!alert('Sent password reset to: ' + user_email)){
          navigate('/')
        }
      })
    } catch (error){ 
      alert('Email is not found')
    }
  }

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
    <div> 
      <h1 className='text-center text-2xl font-bold py-2 mb-5'>Forget Your Password</h1>
      <p className='py-2'>
        Enter the email address associated with your account and we'll send you a link to reset your password.
      </p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col py-2 '>
        <label className='py-2 font-medium'>Email Address</label>
        <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email"></input>
      </div>
      <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>Continue</button>
    </form>
    <p className='py-2 text-center mt-11'>
        Don't have an account.  <Link to='/signup' className='underline'>Sign Up</Link>.
      </p>
  </div>
  )
}

export default ForgetPassword