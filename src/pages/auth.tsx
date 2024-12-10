import { useRouter } from "next/router";
import React, {useEffect} from 'react'
import "@/styles/login.scss"
import Nav  from '@/components/Nav/Nav'
import LoginButton from "@/components/Login/Button";
import Layout from "@/app/layout"
import Token from "@/lib/token"
import { useSongContext } from '@/lib/UserContext';


export default function Auth() {
  const router = useRouter();
  const { token, setToken } = useSongContext();

  const getToken = async (code: string) => {
    const response = await Token(code)
    setToken(response.access_token);
    router.push("/")
  }

  useEffect(() => {
    const { code } = router.query
    if (typeof code === 'string') {
        console.log('Authorization Code:', code);
        getToken(code);
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
