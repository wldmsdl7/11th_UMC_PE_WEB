import { useMutation } from "@tanstack/react-query";
import type { RequestLoginDTO } from '../../types/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function usePostLogin(){

    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();

    const from = (location.state as any)?.from?.pathname || "/home";

    return useMutation({
        mutationFn: (loginDTO: RequestLoginDTO) =>  login(loginDTO),
        onSuccess: (data) => {
            console.log(`로그인 성공 !`, data);
            alert('로그인 성공 !');
            navigate(from, { replace: true });
        },
        onError: (error: unknown) => {
            console.log(`로그인 실패 !`, error);
            alert('로그인 실패 !');
        }
    })
}