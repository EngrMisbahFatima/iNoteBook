import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import React, { Fragment } from 'react';
import NoteSate from './context/noteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <NoteSate>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/signup" exact element={<Signup/>} />
          </Routes>
        </Fragment>
      </Router>
      </NoteSate>
    </div>
  );
}

export default App;
