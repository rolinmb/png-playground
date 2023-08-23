import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Welcome from './Welcome';
import Generator from './Generator';
import Editor from './Editor';

const Home = () => {
  return(
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='' element={<Welcome />}/>
          <Route path='/' element={<Welcome />}/>
          <Route path='/welcome' element={<Welcome />}/>
          <Route path='/generator' element={<Generator />}/>
          <Route path='/editor' element={<Editor />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Home;