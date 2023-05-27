import NavContext from "../contexts/NavContext"
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import type { NextPageWithLayout } from './_app';
import { SmallButton } from '../components/styled/buttons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useDB } from "../hooks/useDB";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  background-color: var(--background);
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

const LogoTitleTest = styled.h1`
  color: #000000;
  font-size: 1.2rem; 
  text-align: left;
  font-family: 'Lexend', sans-serif;
  margin-bottom: 0rem;
  margin-top: -1rem;
  padding: 2rem;
  padding-bottom: 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const LoginHint = styled.p`
  margin-top: 0px;
  text-align: center;
  font-size: 13px;
`;

const FieldLabel = styled.label`
  font-size: 0.8rem;
  text-align: left;
  color: #000;
`;

const SaveButton = styled.button`
  padding: 0.5rem;
  border-radius: 10px;
  width: 10rem;
  border: none;
  color: #ffffff;
  align-self: center;
  background-color: var(--splash);
  cursor: pointer;
`;

const DeleteAccountButton = styled.button`
  border: none;
  background: transparent;
  color: var(--splash);
  cursor: pointer;
  margin-bottom: 1rem;
`;

function settings() {
    const {setShowBackbutton, setHeading, setProfile} = useContext(NavContext);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        setShowBackbutton(true);
        setHeading("User settings");
        setProfile("");

        return () => {
          document.body.style.overflow = 'unset';
        };
    }, [])

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
          email: { value: string };
          username: { value: string };
          password: { value: string };
        };

        console.log('http://localhost:4000/user/'+user.id);
        if (target.email.value || target.username.value || target.password.value) {
          const response = await fetch('http://localhost:4000/user/' + user.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': "Bearer " + token},
            body: JSON.stringify({ email: target.email.value, name: target.username.value, password: target.password.value})
          });
        } else {
          toast('You need to change atleast one value!')
        }
    }

    const {data, loading, error} = useDB("getMyUser");
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(data);
    }, [data])

  return (
    <LoginContainer>
      <LogoTitleTest>
        Your user information
      </LogoTitleTest>
      <LoginForm onSubmit={handleLogin}>
        <FieldLabel>Email</FieldLabel>
        <LoginInput type="email" placeholder={user.email} name='email' />
        <FieldLabel>Username</FieldLabel>
        <LoginInput type="username" placeholder={user.name} name='username' />
        <FieldLabel>Password</FieldLabel>
        <LoginInput type="password" placeholder="••••••••" name='password' autoComplete='new-password' />
        <SaveButton>Save</SaveButton>
        <Toaster />
      </LoginForm>
      <BottomSection>
        <DeleteAccountButton>Delete Account</DeleteAccountButton>
        <SmallButton>Log out</SmallButton>
      </BottomSection>
    </LoginContainer>
  );
}

export default settings