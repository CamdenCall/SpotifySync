import React from 'react';
import Image from 'next/image'
import "./Nav.scss"
import "@/styles/var.scss"


const Nav: React.FC = () => {
  return (
  <nav>
        <Image src="/logo.svg" alt="logo" width={30}height={30}></Image>
        Spotify Sync
  </nav>
  )
};

export default Nav;
