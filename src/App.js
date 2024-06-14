import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Head from './components/Head';
import Main from './components/Main';
import Login from './components/Login';
import UserList from './components/UserList';
import Messages from './components/Messages';
import MessageChat from './components/MessageChat';
import CreatePost from './components/CreatePost';
import Edit from './components/Edit';
import SignUp from './components/SignUp';
import Search from './components/Search';
import Home from './components/Home';
import Mypage from './components/Mypage';
import './App.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messageChat" element={<MessageChat />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </Router>
  );}


export default App;
