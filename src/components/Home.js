import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Welcome from './Welcome';
import Generator from './Generator';
import ModularGenerator from './ModularGenerator';
import Editor from './Editor';
import Interpolator from './Interpolator';

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
          <Route path='/modgenerator' element={<ModularGenerator />}/>
          <Route path='/editor' element={<Editor />}/>
          <Route path='/interpolator' element={<Interpolator />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Home;