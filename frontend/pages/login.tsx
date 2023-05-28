import React, { FormEvent, useContext } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from './_app';
import { SmallButton } from '../components/styled/buttons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

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
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  border: none;
`;

const LoginHint = styled.p`
  margin-top: 0px;
  font-size: 16px;
  text-align: center;
`;


const Login: NextPageWithLayout = () => {
  const router = useRouter();
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

    if (response.status !== 401 && response.status !== 500) {
      const result = await response.json();
      user = result.user;
      document.cookie = `token=${result.token}`;
      toast.success("Signing in...");
      await new Promise(resolve => setTimeout(resolve, 750)); // sleep for 500ms
      router.push('/');
    } else {
      toast.error("Sign in failed!");
      return;
    }
  };


  return (
    <LoginContainer>
      <LogoTitle>BookIT</LogoTitle>
      <LoginForm onSubmit={handleLogin}>
        <LoginInput type="email" placeholder="Email" name='email' autoComplete='current-email' />
        <LoginInput type="password" placeholder="Password" name='password' autoComplete='current-password' />
        <LoginHint>or create an account <Link href="/signup" className='link-class'>here</Link></LoginHint>
        <SmallButton>Login</SmallButton>
        <Toaster />
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
