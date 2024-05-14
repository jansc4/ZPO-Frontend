import React from 'react';

import './App.css';
import LoginForm from './login-form/LoginForm';
import Book from './book/Book';
import BookList from './book-list/BookList';

import { Route, Navigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />}>
        <Route
          path="1"
          element={
            <>
              <div
                style={{
                  height: '300px',
                  width: '100%',
                  backgroundColor: 'red',
                }}
              />
            </>
          }
        />
        <Route
          path="2"
          element={
            <>
              <div
                style={{
                  height: '300px',
                  width: '100%',
                  backgroundColor: 'blue',
                }}
              />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
