import React from 'react';

import './App.css';
import LoginForm from './login-form/LoginForm';
import BookElement from './book-element/BookElement';

function App() {
  return (
    <>
      {/*<LoginForm></LoginForm>*/}
      <BookElement title="Harry Potter" author="J.K. Rowling" year={1997} />
    </>
  );
}

export default App;
