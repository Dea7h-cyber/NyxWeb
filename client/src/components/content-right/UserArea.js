import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import useForm from 'react-hook-form';
import axios from 'axios';

export default () => {
  const cookie = new Cookies();
  const user = cookie.get('username');

  const { register, handleSubmit } = useForm();

  // cookies.set('myCat', 'Pacman', { path: '/' });
  // console.log(user);

  function onSubmit(data) {
    // event.preventDefault()
    console.log(data);
  }

  return (
    <>
      <h1 className='content-title'>{user ? `welcome ${user}` : 'login'}</h1>
      <section className='content-body padding'>
        {user ? <div>logged in</div> : <div>logged out</div>}
      </section>
    </>
  );
};
