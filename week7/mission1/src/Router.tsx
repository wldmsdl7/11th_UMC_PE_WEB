import { createBrowserRouter, type RouteObject } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import LPDetailPage from "./pages/LPDetailPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";

// publicRoutes : 인증 없이 접근 가능한 라우트
  
const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    // 상위 page 에서 outlet 처리해줘야 함
    children: [
       {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />
      },
      { 
        path: 'home',
        element: <HomePage />,
      },
    ],
  }

]
// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
   {
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'me',
        element: <MyPage />
      },
       {
        path: 'lp/:lpId',
        element: <LPDetailPage />
      }
    ]
  }
]

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes
])