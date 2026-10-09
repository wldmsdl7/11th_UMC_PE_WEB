import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/keys";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
  params: { language: "ko-KR" },
});

/**
 * @retry : 요청 재시도 여부를 나타내는 플래그
 *  - 401 Error가 발생했을 때 무한루프 (재귀) 로 빠지는 것을 방ㅈ하기 위함
 */
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
   _retry? : boolean; 
}

// 전역변수로 refresh 요청의 Promise을 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise <string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    // withCredentials: true, : Cookie 사용할 때
     headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },
});

/**
 * Interceptor
 * : Axios에서 요청과 응답이 앱으로 도달하기 전에 중간에 가로채서 처리하는 기능
 * - Request Interceptor : 서버로 요청을 보내기 직전
 * - Response Interceptor : 서버로 응답을 받는 직후 
 * 
 * -> Lazy Initialization 
 *   : 필요할 때까지 값을 미리 로드하지 않고 필요한 순간에 동적으로 초기화하는 방식
 * 
 * 과정
 * 1. 클라이언트가 API 요청을 보냄
 * 2. 서버가 accessToken이 만료됐는지 확인 -> 401 Unauthorized 에러 발생
 * 3. Axios Response Interceptor가 401 에러 감지
 * 4. refresh 요청 (/v1/auth/refresh) 을 보내 새 토큰 받아오기
 */
axiosInstance.interceptors.request.use((config)=> {
    /**
     * 요청이 나가기 전에 항상 LocalStorage에서 최신 토큰을 읽어와서 Authorization에 자동으로 추가
     * -> 로그인 후 새로고침해도 유지됨
     */
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const accessToken = getItem();

    if(accessToken){
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 요청 설정을 반환
    return config;
    },

    // 요청 인터셉터가 실패하면, 에러처리
    (err) => Promise.reject(err),
  );

  // 응답 인터셉터 : 401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리한다. 
  axiosInstance.interceptors.response.use(
    (response) => response, // 정상 응답 그대로 반환
    async(err) => {
      /**
       * if AccessToken 만료인지 확인
       *     -> 만료 : 토큰 갱신 (Refresh Token 이용)
       *    if RefreshToken 요청 실패했는지 (refreshToken도 만료되었는지) 확인
       *        -> 만료 : accessToken + refreshToken 삭제 후 로그인 화면으로 이동
       * 
       * _retry 플래그
       *    - true : refreshToken 확인까지 마친 경우
       *    - false : accessToken만 확인 -> refreshToken 확인할 차례 
       */
      const originalRequest: CustomInternalAxiosRequestConfig = err.config;

      //401 Error면서 아직 재시도 하지 않은 요청일 경우
      if(err.response && err.response.status === 401 && !originalRequest._retry){
        // refresh 앤드포인트 401 에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
        if(originalRequest.url === "/v1/auth/refresh"){
          const { removeItem: removeAccessToken } = useLocalStorage (
            LOCAL_STORAGE_KEY.accessToken,
          );
          const { removeItem: removeRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );
          removeAccessToken();
          removeRefreshToken();

          window.location.replace("/login")
          return Promise.reject(err);
        }

        // 재시도 플래그 설정
        originalRequest._retry = true;

       
        /**
         * 만약 3개의 요청이 동시에 실패를 하면, 3개의 요청 모두 동시에 /v1/auth/refresh 요청을 보내게 된다.
         *  -> 토큰이 꼬이게 됨
         *  => 이미 진행 중인 Refresh 요청이 있으면 재사용 (새로 요청하지 않고 기다렸다가 토큰 공유받음)
         */

         // refreshPromise : refresh 요청이 진행 중인지 확인
        if(!refreshPromise){
          // refresh 요청 실행 후, 요청을 promise로 전역 변수에 할당
          refreshPromise = ( async () => {
            const {getItem: getRefreshToken} = useLocalStorage (
              LOCAL_STORAGE_KEY.refreshToken,
            );

            const refreshToken = getRefreshToken();
            
            // refreshToken으로 accessToken 갱신
            const{data} = await axiosInstance.post("/v1/auth/refresh", {
              refresh: refreshToken,
            });

            // 새 토큰이 반환
            const { setItem: setAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken,
            );

            const { setItem: setRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );

            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            
            // 새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함
            return data.data.accessToken;
          })()
            .catch((err) => {
              const { removeItem: removeAccessToken } = useLocalStorage(
                LOCAL_STORAGE_KEY.accessToken,
              );
              const { removeItem: removeRefreshToken } = useLocalStorage(
                LOCAL_STORAGE_KEY.refreshToken,
              );

              removeAccessToken();
              removeRefreshToken();

              console.error("accessToken 재발급 중 오류 발생 : ",err);
            }). finally(()=>{
              refreshPromise = null;
            });
        }

        // 진행중인 refreshPromise가 해결될 때까지 기다림
        return refreshPromise.then((newAccessToken)=> {

          //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // 업데이트된 원본 요청을 재시도 (새 accessToken으로 요청 재시도)
          return axiosInstance.request(originalRequest);
        });
      }

      //401 에러가 아닌 경우 그대로 오류 반환
      return Promise.reject(err);
    }
  )

