import { createBrowserRouter, type RouteObject } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import AuthLayout from "./layouts/AuthLayout";

// publicRoutes : 인증 없이 접근 가능한 라우트
  
const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    // 상위 page 에서 outlet 처리해줘야 함
    children: [
       {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />
      },   
    ],
  }

]
// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
   {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'me',
        element: <MyPage />
      },
      { 
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movies/:category/:movieId',
        element: <MovieDetailPage />
      },
    ]
  }
]

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes
])