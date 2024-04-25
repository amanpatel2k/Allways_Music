import React from "react";
import Signup from './components/Signup'
import Signin from './components/Signin';
import ForgetPassword from './components/ForgetPassword'
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import { Route, Routes} from "react-router-dom"
import './index.css';
import PlaylistDetails from './Routes/PlaylistDetails';


// Pages
import Convert from './Routes/Convert';
import Dashboard from './Routes/Dashboard';
import Playlist from './Routes/Playlist';
import {Profile} from './Routes/Profile';

import Layout from "./components/Layout"

function App() {
  return (
    <div> 
     <AuthContextProvider>
      <Routes>
        <Route element={<Layout/>}>
            <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/></ProtectedRoute>}/>
            <Route path='/convert' element={<ProtectedRoute> <Convert/> </ProtectedRoute>}/>
            <Route path='/playlist' element={<ProtectedRoute> <Playlist/> </ProtectedRoute>}/>
            <Route path='/profile' element={<ProtectedRoute> <Profile/> </ProtectedRoute>}/>
            <Route path='/playlist/:id' element={<ProtectedRoute> <PlaylistDetails/> </ProtectedRoute>} />

        </Route>

        <Route path='/' element={<Signin />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/forgetpassword' element={<ForgetPassword/>} />

     </Routes>
    </AuthContextProvider>
    </div>
  )
}

export default App;
