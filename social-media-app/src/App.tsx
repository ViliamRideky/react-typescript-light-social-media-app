import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Post } from './pages/create-post/Post'
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create-post' element={<Post/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
