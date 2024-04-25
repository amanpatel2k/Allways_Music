/*
  => Generating the Sign Up page for new users 
  => When a user sign's up: 
    => The user enters their: 
        => First and Last Name 
        => Username 
        => Email 
        => Password
  => If the email exits, the page will display an alert saying email already exists
*/
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {database} from "../firebase";
import {useUserAuth } from '../context/AuthContext';
import {
  collection, doc, setDoc
} from 'firebase/firestore';


const Signup = () => {
  

  /* 
    => Define an use state for storing the email, password, username, first & last name, and the error state
    => Additionally, we create a variable in which we will be using to navigate user when they finish signing up   
  */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { user } = useUserAuth();
  
  // We grab the createUser function from Authcontext.js file to sign up a new user
  const {createUser, signIn} = useUserAuth()

  /* 
    => The handleSubmit function is used to store the information from the fourm and store it in the database
      => Firstly, we create the user with createUser function with the email and password 
        => Then store the information of the firstname, lastname, username, email, the unique id, and a default profile image in the database
        => After the user get navigated to the dashboard page
    => If an issue arise, the program will display an alert message of the error
  */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try { 
      await createUser(email, password)
      .then((userCredentials) => {
        const user_uid = userCredentials.user
        setDoc(doc(database, "music_client", user_uid.uid), {
          username: username,
          email: email,
          uid: user_uid.uid,
          firstname: firstname,
          lastname: lastname,
          image: 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top'
        });
        navigate('/dashboard')
      })
    } catch (error){ 
      setError(error.message)
      console.log(error.message)
      alert('Email is duplicated')
    }
  }
  

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div> 
        <h1 className='text-2xl font-bold py-2'>Sign up for a free account</h1>
        <p className='py-2'>
          Already have an account yet? <Link to='/' className='underline'>Sign In</Link>.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-2 pt-2">
            <label class="block tracking-wide text-medium font-bold mb-2">
              First Name
            </label>
            <input onChange={(e) => setFirstname(e.target.value)} class="appearance-none block w-full text-gray-200 bg-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight" type="text"/>
          </div>
          <div class="w-full md:w-1/2 py-2">
            <label class="block tracking-wide text-medium font-bold mb-2">
              Last Name
            </label>
            <input onChange={(e) => setLastname(e.target.value)} class="appearance-none block w-full text-gray-200 bg-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight" type="text"/>
          </div>
        </div>
        <div className='flex flex-col py-2 '>
          <label className='py-2 font-medium'>Username</label>
          <input onChange={(e) => setUsername(e.target.value)} className='border p-3' type="text"></input>
        </div>
        <div className='flex flex-col py-2 '>
          <label className='py-2 font-medium'>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email"></input>
        </div>
        <div className='flex flex-col py-2 '>
          <label className='py-2 font-medium'>Enter Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password"></input>
        </div>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup