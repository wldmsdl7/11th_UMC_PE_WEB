import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { RequestLoginDTO } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/keys";
import { postLogin, postLogout } from "../api/auth";

interface AuthContextType {
    accessToken : string | null;
    refreshToken : string | null;
    login: (loginData: RequestLoginDTO) => Promise <void>
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {}
})

export const AuthProvider = ({children}:PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage, 
        setItem: setAccessTokenInStorage, 
        removeItem: removeAccessTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
     const {
        getItem: getRefreshTokenFromStorage, 
        setItem: setRefreshTokenInStorage, 
        removeItem: removeRefreshTokenFromStorage
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    /**
     * 상태 변화가 나타나면 렌더링이 일어나는데, 
     * 값을 가지는 건 렌더링이 일어날 때 마다 가져올 필요는 없다. 
     * -> 초기에 한 번만 가져오면 된다.
     */

    const [accessToken, setAccessToken] = useState <string | null>(
        getAccessTokenFromStorage()
    );
    const [refreshToken, setRefreshToken] = useState <string | null>(
        getRefreshTokenFromStorage()
    )

    const login = async (loginData: RequestLoginDTO) => {
        try {
            const {data} =await postLogin(loginData);
    
            if(data){
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;
    
                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);
    
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                alert("로그인 성공");

                window.location.href="/home";
            }
        } catch (err) {
            console.error("로그인 오류", err);
            alert("로그인 실패");
        }
    }

    const logout = async () => {
       try {
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();
            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
       } catch (err) {
            console.error("로그인 오류", err);
            alert("로그아웃 실패");
        }
    };

    return (
        <AuthContext.Provider value = {{accessToken, refreshToken, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};


export const useAuth = ()=> {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
}