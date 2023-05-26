import React from 'react'
import { useState } from 'react'

import Image from 'next/image'
import { styled } from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 10vh;
  background-color: #f0f4f4; /* Page background color */

  `;


function Navbar(props: { backbutton: Boolean; heading: String; profile: String }) {
  
  const {backbutton, heading, profile} = props
  const [back, setBack] = useState(backbutton)
  const [head, setHead] = useState(heading)
  const [prof, setProf] = useState(profile)
  

  let goback
  let profileSVG
  // go back goes to previous page
  back ? goback = <a onClick={() => Router.back()}><Image src='/back.svg' alt={''} width={25} height={25}></Image></a>: goback = <></>
  
  if(prof == "profile") {
    profileSVG = <Link href="settings"><Image src='/profile.svg' alt={''} width={50} height={50}></Image></Link> 
  } else if(prof == "settings") {
    profileSVG =  <Link href="settings"><Image src='/settings.svg' alt={''} width={25} height={25}></Image></Link> 
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