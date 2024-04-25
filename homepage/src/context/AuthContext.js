/*
    => This program is use for the Firebase Authentication for sign up user, log out users, or update the current user
    => There are different function calls for: 
        => Creating a new user
        => Signing in a user 
        => Signing out a user 
        => Updating the current user
*/

import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
} from 'firebase/auth'
import {auth} from '../firebase'

const userAuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    // Create a use state to set the store the current user
    const [user, setUser] = useState({}); 

    /* 
    => Use the createUserWithEmailAndPassword function from firebase authentication to create a user
    => The function takes the firebase authentication, the email, and password  
    */
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    /* 
    => Use the signIn function from firebase authentication to sign in a user
    => The function takes the firebase authentication, the email, and password  
    */
    const signIn = (email, password) => {   
        return signInWithEmailAndPassword(auth, email, password)
    }

    /* 
    => Use the signOut function from firebase authentication to log out a user
    => The function just take the firebase authentication
    */
    const logout = () => {
        return signOut(auth);
    }

    /* 
    => Use to update and store the current user 
    => Utilize the onAuthStateChange function from firebase authentication which take the current user and the authentication
    => Updates and set the currentUser
    */
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <userAuthContext.Provider value={{createUser, user, logout, signIn}}>
            {children}
        </userAuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(userAuthContext);
}