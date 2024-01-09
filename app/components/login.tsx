import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {

  const [isRedirecting, setIsRedirecting] = useState(false);
//   https://prismcodehub.com/aliexpress/
// 504040
// usRWt1Y4mdzgdWEmjimiVdXO0fPn5IPZ
  const config = {
    clientId: '504104',
    clientSecret: 'HuaGb3SBPjtBPTFKJVUcJe8KgcOiLcRv',
    redirectUri: 'https://alilogin.vercel.app/',
    baseUrl: 'https://api-sg.aliexpress.com'
  };

  const router = useRouter()
  const timestamp = new Date().getTime(); // In milliseconds

  const handleLogin = () => {
    const url = new URL("https://api-sg.aliexpress.com/oauth/authorize");
    url.searchParams.set("response_type", "code");
    url.searchParams.set("force_auth", "true");
    url.searchParams.set("redirect_uri", config.redirectUri);
    url.searchParams.set("client_id", config.clientId);

    // window.location.href = url;
    router.push(url.toString())
    setIsRedirecting(true);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      console.log("GOT THE CODE");
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleLogin} disabled={isRedirecting} className=''>
        {isRedirecting ? "Redirecting..." : "Login with AliExpress"}
      </button>
    </div>
  )
}