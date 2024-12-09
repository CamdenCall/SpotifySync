import { useRouter } from "next/router";
import React, {useEffect} from 'react'
import "@/styles/login.scss"
import Nav  from '@/components/Nav/Nav'
import LoginButton from "@/components/Login/Button";
import Layout from "@/app/layout"
export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const { code } = router.query;
    if (code) {
      console.log('Authorization Code:', code);
    }
  }, [router.query]);
  return (
    <Layout>
      <Nav />
      <div className="login-container">
        <LoginButton/>
      </div>
    </Layout>

  );
}
