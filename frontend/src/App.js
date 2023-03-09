import React, { Component } from 'react';
import HomePage from  "./pages/HomePage"
import AddPage from "./pages/AddPage"
// import ListPost from  "./components/ListPost"
import ListPost from  "./components/ListPost/ListPost"

import NavBar from  "./components/NavBar"
import {Routes, Route} from 'react-router-dom'



function App() {
  return (
    <>
      <NavBar /> 
      <div className = "container">
        <Routes>
          <Route path= "/" element = {<HomePage />} />
          <Route path= "/add" element = {<AddPage/>} />
          <Route path= "/list" element = {<ListPost />} />
        </Routes>
      </div>    
    </>
     
  );
}

export default App;
