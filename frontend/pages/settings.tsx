import NavContext from "../contexts/NavContext"
import React, { useState, useContext, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import { SmallButton } from '../components/styled/buttons';
import toast, { Toaster } from 'react-hot-toast';
import { useDB } from "../hooks/useDB";
import { useRouter } from "next/router";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

const LogoTitleTest = styled.h3`
  color: #000000;
  text-align: left;
  margin-bottom: 0rem;
  margin-top: -1rem;
  padding: 2rem;
  padding-bottom: 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
  max-width: 400px;
  border-radius: 10px;
  background-color: var(--background);
`;

const LoginInput = styled.input`
  margin-bottom: 1rem;
  font-size: 18px;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ced4da;
  border: none;
`;

const LoginHint = styled.p`
  margin-top: 0px;
  text-align: center;
`;

const FieldLabel = styled.h4`
  text-align: left;
  color: #000;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const SaveButton = styled.button`
  padding: 0.5rem;
  border-radius: 10px;
  width: 10rem;
  border: none;
  color: #ffffff;
  font-size: 18px;
  align-self: center;
  background-color: var(--splash);
  cursor: pointer;
`;

const DeleteAccountButton = styled.button`
  border: none;
  font-size: 18px;
  background: transparent;
  color: var(--splash);
  cursor: pointer;
  margin-bottom: 1rem;
`;

const PopupOverlay = styled.div`
  font-size: 18px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  background: white;
  padding: 1rem;
  text-align: center;
  border-radius: 10px;
  max-width: 20rem;
  width: 80%;
`;

type User = {
  id: number;
  name: string;
  email: string;
  role: string; 
}

function settings() {
    const {setShowBackbutton, setHeading, setProfile} = useContext(NavContext);
    const {data, loading, error} = useDB("getMyUser");
    const router = useRouter();
    const [user, setUser] = useState<User>({ id: 0, name: "", email: "", role: ""});
    useEffect(() => {
        setUser(data);
    }, [data])

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => {
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    
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

        if (target.email.value || target.username.value || target.password.value) {
          const token = document.cookie.split("=")[1];
          const response = await fetch('http://localhost:4000/user/' + user.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': "Bearer " + token},
            body: JSON.stringify({ email: target.email.value, name: target.username.value, password: target.password.value})
          });
          toast.success("Your settings have been changed!")
        } else {
          toast('You need to change at least one value!')
        }
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const deleteAccount = async (event: FormEvent) => {
      event.preventDefault();
      const token = document.cookie.split("=")[1];
      const response = await fetch('http://localhost:4000/users/' + user.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': "Bearer " + token },
      });

      if (response.status !== 200) {
        toast.error("Something went wrong!")
        return;
      } else {
        toast.success("Your account is being deleted...");
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        await sleep(2000);
        router.push('/');
      }
    }

    const logOut = async (event: FormEvent) => {
      event.preventDefault();
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success("Logging out...");
      await sleep(2000);
      router.push('/');
    }



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
        <DeleteAccountButton onClick={openPopup}>
          Delete Account
        </DeleteAccountButton>

        {isPopupOpen && (
          <PopupOverlay>
            <PopupContent>
              <h4>Do you want to delete your account permanently? This cannot be reverted</h4>
              <SaveButton onClick={deleteAccount}>Yes, delete my account</SaveButton>
              <h4></h4>
              <SaveButton onClick={closePopup}>No, take me back!</SaveButton>
            </PopupContent>
          </PopupOverlay>
        )}

        <SmallButton onClick={logOut}>Log out</SmallButton>
      </BottomSection>
    </LoginContainer>
  );
}

export default settings