import React, { FormEvent, useContext } from 'react';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from './_app';
import { SmallButton } from '../components/styled/buttons';
import { Cookie } from 'next/font/google';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

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
  border: none;
`;

const Signup: NextPageWithLayout = () => {
  const router = useRouter();
  let user;

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      username: { value: string };
      password: { value: string };
      repeat_password: { value: string };
    };

    // Only a front-end check
    if ( target.password.value !== target.repeat_password.value ) {
        toast.error("Passwords do not match!");
        return;
    }

    const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ email: target.email.value, name: target.username.value, password: target.password.value})
    });

    if (response.status !== 401 && response.status !== 500) {
        const result = await response.json();
        user = result.user;
        document.cookie = `token=${result.token}`;
        router.push('/');
    } else {
        toast.error("Sign up failed!");
    }   
  };


  return (
      <LoginContainer>
          <LogoTitle>BookIT</LogoTitle>
          <LoginForm onSubmit={handleSignup}>
              <LoginInput type="email" placeholder="Email" name='email' />
              <LoginInput type="username" placeholder="Username" name='username' />
              <LoginInput type="password" placeholder="Password" name='password' autoComplete='new-password' />
              <LoginInput type="password" placeholder="Repeat Password" name='repeat_password' autoComplete='new-password' />
              <p style={{marginTop: '0px', textAlign: 'center', fontSize: 13}}>or sign in <Link href="/login" className="link-class">here</Link></p>
              <SmallButton>Sign up</SmallButton>
          </LoginForm>
          <Toaster />
      </LoginContainer>
  );
};

Signup.getLayout = (page) => {
  return (
    <div>
      {page}
    </div>
  )
}

export default Signup;