import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToken } from '@/lib/TokenContext';
import Nav from '@/components/Nav/Nav';
import Search from "@/components/Dashboard/Search"
import Suggest from '@/components/Dashboard/Suggest';
import Playlist from '@/components/Dashboard/Playlist';
import Layout from '@/app/layout';
import "@/styles/dashboard.scss"

export default function Dashboard() {
  const { token } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <Layout>
      <Nav />
      <section className='dashboard'>
        <div className='container'>
          <div className='left'>
            <Search token={token} />
          </div>
          <Playlist token={token} />
        </div>
        
      </section>
    </Layout>
  );
}
