import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import  Dashboard from './components/Dashboard'
import  Login  from './components/Login'
import  Register  from './components/Register'
import Header from './components/Header';
import Styles from './index.module.css'

function App() {
  return (
    <Router>
      <div className={Styles.Container}>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
