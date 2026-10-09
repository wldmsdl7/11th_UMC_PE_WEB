import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    /**
     * 로그인 및 회원가입은 Navbar가 보이지 않아야 함 ! 
     * -> 레이아웃 분리
     */
    
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
  },

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
])