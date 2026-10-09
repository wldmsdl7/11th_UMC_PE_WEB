import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignIn, type UserSignInInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { GoogleLogo } from "../assets";
import { usePostLogin } from '../hooks/mutations/usePostLogin';

const LoginPage = () => {

    const {accessToken} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = (location.state as any)?.from?.pathname || "/home";

    useEffect(()=> {
        if(accessToken){
            navigate(from, {replace: true});
        }
    }, [navigate, accessToken])
    const {values, errors, touched, getInputProps } =useForm<UserSignInInformation>({
        initialValue: {
            email: "",
            password: ""
        },
        validate: validateSignIn
    });

    const {mutate: loginMutate} = usePostLogin();

    const handSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(values);
        
        loginMutate(values);
    }

    const handleGoogleLogin = async() => {
        console.log("구글 로그인 !");

        window.location.replace(import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login");
    }

    const isDisabled =
        Object.values(errors || {}).some((error: string)=> error.length >0) || // 오류가 있으면 true
        Object.values(values).some((value: string) => value === ""); // 값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
        <h1 className="text-3xl font-bold p-2">로그인</h1>
        <form className="flex flex-col gap-5 " onSubmit={handSubmit}>
            <input {...getInputProps('email')}
                    name="email"
                    className={`border border-[#ccc] w-[300px] rounded-s p-2
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}
                    `}
                    type={"email"} 
                    placeholder="이메일"
                    autoComplete="email" // 브라우저가 자동완성 및 이메일 저장 기능 제공할 수 있도록 함 -> 안 쓰면 경고 메세지
            />
            {errors?.email && touched?.email && (
                <div className="text-red-500 text-xs">{errors.email}</div>
            )}
            <input  {...getInputProps('password')}
                    name="password"
                    className={`border border-[#ccc] w-[300px] rounded-s p-2
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}
                    `}
                    type={"password"} 
                    placeholder="비밀번호"
                    autoComplete="current-password"  // 브라우저가 자동완성 및 이메일 저장 기능 제공할 수 있도록 함 -> 안 쓰면 경고 메세지 
            />
            {errors?.password && touched?.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
            )}
            <button 
                type="submit"
                disabled = {isDisabled}
                className="px-6 py-3 bg-pink-800 rounded-lg hover:bg-pink-900 transition text-white "
            >
            로그인
            </button>
            <button 
                type="button"
                onClick={handleGoogleLogin}
                className="relative px-6 py-3 bg-pink-800 rounded-lg hover:bg-pink-900 transition text-white "
            >
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <GoogleLogo className="w-8 h-8" />
                </span>
                구글 로그인
            </button>
            <div
                onClick={() => navigate("/signup")} 
                className="text-sm underline cursor-pointer hover:cursor-pointer text-center"
            >
                회원가입 하러가기
            </div>

        </form>
      
    </div>
  )
}

export default LoginPage
