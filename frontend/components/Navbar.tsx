import React from 'react'

import Image from 'next/image'
import { styled } from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import NavContext from '../contexts/NavContext';

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: var(--background);
  font-family: 'Lexend', sans-serif;
  `;


function Navbar() {
  const { showBackbutton, heading, profile } = useContext(NavContext);

  let goback;
  let profileSVG;
  // go back goes to previous page
  showBackbutton ? goback = <a onClick={() => Router.back()}><Image src='/back.svg' alt={''} width={25} height={25}></Image></a>: goback = <></>
  
  if(profile == "profile") {
    profileSVG = <Link href="/profile"><Image src='/profile.svg' alt={''} width={50} height={50}></Image></Link> 
  } else if(profile == "settings") {
    profileSVG =  <Link href="/settings"><Image src='/settings.svg' alt={''} width={25} height={25}></Image></Link> 
  }
    

  return (
    <Navigation>
      {goback}
      <h1>{heading}</h1>
      <div>{profileSVG}</div>
    </Navigation>
  )
}

export default Navbar