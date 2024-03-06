import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigations from './components/Navigations'; 
import Books from './components/Books';
import Login from './components/Login';
import Registration from './components/Register';
import Account from './components/Account';

function App() {
  return (
    <Router>
      <Navigations />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/account" element={<Account />} />
        <Route path="/" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;

