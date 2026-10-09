import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/keys";
import { useLocalStorage } from "../hooks/useLocalStorage";


interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
   _retry? : boolean; 
}

let refreshPromise: Promise <string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
     headers: {
            Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },
});

axiosInstance.interceptors.request.use((config)=> {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const accessToken = getItem();

    if(accessToken){
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
    },

    (err) => Promise.reject(err),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async(err) => {
      const originalRequest: CustomInternalAxiosRequestConfig = err.config;

      if(err.response && err.response.status === 401 && !originalRequest._retry){

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

        originalRequest._retry = true;

        if(!refreshPromise){
          refreshPromise = ( async () => {
            const {getItem: getRefreshToken} = useLocalStorage (
              LOCAL_STORAGE_KEY.refreshToken,
            );

            const refreshToken = getRefreshToken();
            
            const{data} = await axiosInstance.post("/v1/auth/refresh", {
              refresh: refreshToken,
            });

            const { setItem: setAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken,
            );

            const { setItem: setRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );

            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            
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

        return refreshPromise.then((newAccessToken)=> {

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosInstance.request(originalRequest);
        });
      }

      return Promise.reject(err);
    }
  )

