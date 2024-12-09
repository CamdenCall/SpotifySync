import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import "./Button.scss"
import Axios from 'axios'
import Auth from "@/lib/auth"


const LoginButton: React.FC = () => {
  const Login = async () => {
    Auth()
  }
  return (
    <button onClick={Login}>
        <Image src={"/checkmark.svg"}  alt='checkmark' width={15} height={16}/>
        Login To Spotify
    </button>
  )
};

export default LoginButton;
