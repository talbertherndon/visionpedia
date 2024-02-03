import { useUser } from '@auth0/nextjs-auth0/client'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const onSubmit = () => {
    router.push("/api/auth/login")

  }

  useEffect(() => {
    if(isLoading && !user){
      onSubmit();
    } else{
      router.push('/home')
    }
  }, [user])

  return (
    <>
    </>
  )
}