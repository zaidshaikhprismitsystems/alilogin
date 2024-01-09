import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import md5 from 'md5'

export default function Home() {

const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [responseData, setResponseData] = useState(null);
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

  useEffect(() => {
    console.log(router);
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      setIsLoading(true);
      exchangeCode(code);
    }
  }, []);

  const exchangeCode = async (code: any) => {
    try {
      const timestamp = new Date().getTime();

    //   const params = {
    //     app_key: config.clientId,
    //     code,
    //     format: 'json',
    //     method: '/auth/token/create',
    //     sign_method: 'md5',
    //     timestamp,
    //   };
    //   console.log(params);
    // //   ksort(params);

    //   const sign = Object.keys(params)
    //     .map(([key, value]) => `${key}${value}`)
    //     .join('')
    //     .replace(/&/g, '')
    //     .replace(/=/g, '');

    // //   const finalUrl = `${config.baseUrl}?${new URLSearchParams(params)}&sign=${toUpperCase(
    // //     md5(config.clientSecret + sign + config.clientSecret)
    // //   )}`;

    console.log(router);
    const url = "https://api-sg.aliexpress.com/sync";
    
    const param: any = {};
    param.app_key = config.clientId;
    param.code = new URLSearchParams(window.location.search).get('code');
    param.format = 'json';
    param.method = '/auth/token/create';
    param.sign_method = 'md5';
    param.timestamp = new Date().getTime();
    let parameters: any;
    // Sort keys alphabetically
    Object.keys(param).sort().forEach(key => {
    const value = param[key].toString();
    console.log(value);
    console.log(param[key].toString());
    
        parameters = parameters ? `${parameters}&${key}=${value}` : `${key}=${value}`;
    });

    // Generate the signature
    let sign = parameters.replace(/&/g, '').replace(/=/g, '');
    
    console.log(config);

    console.log(sign);

    const final = url+"?"+ parameters + "&sign=" + md5(config.clientSecret+sign+config.clientSecret).toUpperCase();
    
    console.log(parameters);

    console.log(final);

    await axios.get(final)
    .then(response => {
      // Handle successful response
      console.log(response.data);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });

    //   const response = await axios.post(finalUrl, params, {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //     },
    //   });

    //   setResponseData(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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