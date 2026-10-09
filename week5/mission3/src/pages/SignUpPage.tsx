import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form"
import { postSignup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { schema, type FormFields } from "../schemas/signup.schema";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const SignUpPage = () => {

  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    if(accessToken){
      navigate("/home");
    }
  }, [navigate, accessToken]);
  const {
    register, 
    handleSubmit, 
    reset, // 폼 제출 후 비우는 함수
    formState: {errors, isSubmitting}
  } = useForm <FormFields> ({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: ""
    },
    resolver: zodResolver(schema),
    mode: "onChange" // 입력할 때 마다 검증

    /**
     * NONE - 사용자가 폼을 제출할 때 검증 (submit 시)
     * mode : "onBlur" - focus out 시 검증
     * mode : "all" - onChange + onBlur 모두
     */
  });

  const onSubmit:SubmitHandler<FormFields> = async (data: any) => {

    const {passwordCheck, ...rest} = data; // passwordCheck는 서버에 전송해주지 않아도 됨 (역구조분해할당)
    
    try {
      const response = await postSignup(rest);
      console.log(response);
  
      reset(); // 제출 후 폼 초기화
      navigate("/login");

    } catch (err: any) {
      alert(err?.message);
    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
        <h1 className="text-3xl font-bold p-2">회원가입</h1>
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit(onSubmit)}>
          <input {...register('name')}
                    name="name"
                    className={`border border-[#ccc] w-[300px] rounded-s p-2
                        ${errors?.name ? "border-red-500 bg-red-200 text-gray-800" : "border-gray-300"}
                    `}
                    type={"name"} 
                    placeholder="이름"
                    autoComplete="name" 
            />
            {errors.name &&( 
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}
            <input {...register('email')}
                    name="email"
                    className={`border border-[#ccc] w-[300px] rounded-s p-2
                        ${errors?.email ? "border-red-500 bg-red-200 text-gray-800" : "border-gray-300"}
                    `}
                    /**
                     * Zod 검증은 별도의 클릭 이벤트가 존재하면, 실행되지 않음
                     * -> 이메일 field 타입을 text로 변경하면 HTML5 검증 없이 Zod 검증이 적용됨
                     */
                    type={"text"} 
                    placeholder="이메일"
                    autoComplete="email" 
            />
            {errors.email &&( 
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
            <input  {...register('password')}
                    name="password"
                    className={`border border-[#ccc] w-[300px] rounded-s p-2
                        ${errors?.password ? "border-red-500 bg-red-200 text-gray-800" : "border-gray-300"}
                    `}
                    type={"password"} 
                    placeholder="비밀번호"
                    autoComplete="current-password"
            />
            {errors.password &&( 
              <div className="text-red-500 text-sm">{errors.password.message}</div>
            )}
            <input  {...register('passwordCheck')}
                    name="passwordCheck"
                    className={clsx("border border-[#ccc] w-[300px] rounded-s p-2", errors?.passwordCheck ? "border-red-500 bg-red-200 text-gray-800" : "border-gray-300")}
                    
                    type={"password"} 
                    placeholder="비밀번호 확인"
                    autoComplete="current-password"
            />
            {errors.passwordCheck &&( 
              <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
            )}
            <button 
                type="submit" // button type을 submit으로 해야 Zod 검증이 동작함
                disabled = {false}
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white "
            >
            회원가입
            </button>
            <div
                onClick={() => navigate("/login")} 
                className="text-sm underline cursor-pointer hover:cursor-pointer text-center"
            >
                로그인하러 가기
            </div>
        </form>
      
    </div>
  )
}

export default SignUpPage

