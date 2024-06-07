import React from 'react';

import './App.css';
import LoginForm from './login-form/LoginForm';

import { Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import ApiProvider from './api/ApiProvider';
import AddBook from './add-book/AddBook';
import AddUser from './add-user/AddUser';
import BooksPage from './books/BooksPage';
import UsersPage from './users/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="books" element={<BooksPage />}>
              <Route path="add" element={<AddBook />} />
            </Route>
            <Route path="users" element={<UsersPage />}>
              <Route path="add" element={<AddUser />} />
            </Route>
            <Route path="loans" element={<AddBook />} />
          </Route>
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
