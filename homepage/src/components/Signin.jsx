/* 
  => Generating the Sign In page for existing users
  => When a user sign's in: 
    => User enters their email and password
  => If user doesn't remember their password, user can click forget password link in which users can reset their password
*/
import React, {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {Alert} from "react-bootstrap";
import {useUserAuth } from '../context/AuthContext';

const Signin = () => {

  /* 
    => Define useState to stor ethe emails, passwords, and error that occur
    => Create a variable in which we will be using to navigate user when login  
    => Import the signIn function to sign in and valid users in successfully logging them in. 
  */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const {signIn} = useUserAuth();

  /*
    => The handleSubmit function is used to sign in the user and navigate them to the appropriate page 
    => The functions that are used are signIn and navigate
      => signIn function take an email and password and verifies that the user's credentials are valid and legit 
      => navigate function is used to navigate a user to the dashboard page once they are login
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try { 
      await signIn(email, password)
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
    }
  };

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
    <div> 
      <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
      <p className='py-2'>
        Don't have an account yet? <Link to='/signup' className='underline'>Sign Up</Link>.
      </p>
    </div>
    <div> 
      <p className='py-2'>
        Forget your password?  <Link to='/forgetpassword' className='underline'>Forget Password</Link>.
      </p>
    </div>
    {error && <Alert variant="danger">{error}</Alert>}
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col py-2 '>
        <label className='py-2 font-medium'>Email Address</label>
        <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email"></input>
      </div>
      <div className='flex flex-col py-2 '>
        <label className='py-2 font-medium'>Enter Password</label>
        <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password"></input>
      </div>
      <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>Sign In</button>
    </form>
  </div>
  )
}

export default Signin