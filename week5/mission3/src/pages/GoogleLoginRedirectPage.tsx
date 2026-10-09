import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/keys";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "../context/AuthContext";

const GoogleLoginRedirectPage = () => {
    const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
    const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)

    const { accessToken } = useAuth();

    useEffect(()=> {
      // navigate을 사용하면 로그인을 성공 했음에도 다시 로그인 화면으로 이동함
      window.location.replace("/home")
    }, [accessToken])

    useEffect(()=>{
        /**
         * URLSearchParams : queryParameter - userId, name, accessToken, refreshToken
         * window.location.search : 쿼리파라미터들
         * 
         * ex) 파라미터 값 중 이름 갖고 오고 싶을 때 
         *     console.log(urlParams.get("name"))
         */
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if(accessToken){
            setAccessToken(accessToken);
            setRefreshToken(refreshToken)

            //토큰을 context에 넣자마자 바로 navigate하면, 홈페이지에서 아직 토큰을 읽지 못하고 로그인 상태가 아니라고 판단함 -> 로그인으로 리다이렉트되는 것
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
