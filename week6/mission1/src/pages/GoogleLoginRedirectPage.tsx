import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/keys";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "../context/AuthContext";

const GoogleLoginRedirectPage = () => {
    const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)

    const { accessToken } = useAuth();

    useEffect(()=> {
      window.location.replace("/home")
    }, [accessToken])

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if(accessToken){
            setAccessToken(accessToken);
            setRefreshToken(refreshToken)

            window.location.replace("/home")
        }
    }, [setAccessToken, setRefreshToken])
  return (
   <main className="flex flex-col items-center justify-center min-h-screen gap-5">
      <div className="w-24 h-24 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#6D7280] font-medium text-lg">Loading...</p>
  </main>
  )
}

export default GoogleLoginRedirectPage
