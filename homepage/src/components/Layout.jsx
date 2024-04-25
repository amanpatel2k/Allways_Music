/* 
  Generate the layout of the webpage with the navbar and other protected routed pages 
*/

import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default Layout