import React, { FormEvent, useContext } from 'react';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from './_app';
import { SmallButton } from '../components/styled/buttons';
import { Cookie } from 'next/font/google';
import UserContext from '../contexts/UserContext';

/* This will need to be moved into a seperate style file, but is here for now */
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--background);
`;

const LogoTitle = styled.h1`
  color: #000000;
  font-size: 3rem; 
  margin-bottom: 1rem; 
  font-family: 'Lexend', sans-serif;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--background);
`;

const LoginInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;


const Login: NextPageWithLayout = () => {
  const {setUserID, userID} = useContext(UserContext);
  let user;
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ email: target.email.value, password: target.password.value})
    });

    if (response.status !== 401) {
      const result = await response.json();
      user = result.user;
      setUserID(user.id);
      console.log(userID)
      console.log(user.id)
      document.cookie = `token=${result.token}`;
      window.location.href = "/";
    }
  };


  return (
    <LoginContainer>
      <LogoTitle>BookIT</LogoTitle>
      {userID}
      <LoginForm onSubmit={handleLogin}>
        <LoginInput type="email" placeholder="Email" name='email' autoComplete='current-email' />
        <LoginInput type="password" placeholder="Password" name='password' autoComplete='current-password' />
        <SmallButton>Login</SmallButton>
      </LoginForm>
    </LoginContainer>
  );
};

Login.getLayout = (page) => {
  return (
    <div>
      {page}
    </div>
  )
}

export default Login;
