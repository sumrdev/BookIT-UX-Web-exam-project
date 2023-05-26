import React, { FormEvent } from 'react';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from './_app';
/* This will need to be moved into a seperate style file, but is here for now */
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f4; /* Page background color */
`;

const LogoTitle = styled.h1`
  color: #000000; /* Set color as needed */
  font-size: 3rem; /* Adjust font size as needed */
  margin-bottom: 1rem; /* Adjust margin as needed */
  font-family: 'Lexend', sans-serif; /* Add this line */
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f0f4f4; /* Same color as LoginContainer background */
`;

const LoginInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

const LoginButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  color: #ffffff; /* Text color */
  background-color: #e06464; /* Button color */
  cursor: pointer;

  &:hover {
    background-color: #b55454; /* Darker shade for hover */
  }
`;
 

const Login: NextPageWithLayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* This code is boilerplate and does not work yet */
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 'email': email, 'password': password})
    });

    console.log(response.json());
    if (response.status !== 401) {
      const result = await response.json();
      window.location.href = "/";
    }
  };


  return (
    <LoginContainer>
      <LogoTitle>BookIT</LogoTitle>
      <LoginForm onSubmit={handleLogin}>
        <LoginInput type="email" placeholder="Email" />
        <LoginInput type="password" placeholder="Password" />
        <LoginButton >Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;