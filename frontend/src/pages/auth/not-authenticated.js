import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function NotAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/auth/login');
    }, 2000);
  }, []);

  return (
    <div >
      <Head>
        <title>Strapi - Next - NextAuth</title>
      </Head>
      <h1>Not Authenticated, you will be redirected to Sign In page</h1>
    </div>
  );
}
