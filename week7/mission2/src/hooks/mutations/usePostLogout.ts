import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function usePostLogout(){

    const navigate = useNavigate();
    const location = useLocation();
    const {logout} = useAuth();

    const from = (location.state as any)?.from?.pathname || "/home";

    return useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            console.log(`로그아웃 성공 !`);
            alert('로그아웃 성공 !');
            navigate(from, { replace: true });
        },
        onError: (error: unknown) => {
            console.log(`로그인 실패 !`, error);
            alert('로그인 실패 !');
        }
    })
}