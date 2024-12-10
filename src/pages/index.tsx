import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '@/components/Nav/Nav';
import Search from "@/components/Dashboard/Search"
import Suggest from '@/components/Dashboard/Suggest';
import Playlist from '@/components/Dashboard/Playlist';
import { SongContextProvider, useSongContext } from '@/lib/UserContext' 
import Layout from '@/app/layout';
import "@/styles/dashboard.scss"

export default function Dashboard() {
  const { token, loading } = useSongContext();
  const router = useRouter();
  console.log("dawg" + token)
  useEffect(() => {
    if (!loading && token == null) {
      router.push('/login');
    }
  }, [token, loading, router]);
  

  if (loading) {
    return <p>Loading...</p>; // Optional loading indicator
  }

  if (!token) {
    return null;
  }

  return (
    <Layout>
      <Nav />
      <section className='dashboard'>
        <div className='container'>
            <div className='left'>
              <Search />
            </div>
            <Playlist />
        </div>
        
      </section>
    </Layout>
  );
}
