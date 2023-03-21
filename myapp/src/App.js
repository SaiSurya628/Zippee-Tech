
import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import "./App.css"
import LoginPage from './components/LoginPage';
import HomePage from './components/Home';
import SignUp from "./components/SignUp";


const App=()=>(
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginPage/>}/>
      <Route exact path="/home" element={<HomePage/>}/>
      <Route exact path="/signup" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>

)

export default App;
