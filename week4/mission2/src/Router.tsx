import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    // 상위 page 에서 outlet 처리해줘야 함
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      },
      {
        element: <HomePage />,
        index: true
      },
      {
        path: 'movies/:category',
        element: <MoviePage />,
        index: true
      },
      {
        path: 'movies/:category/:movieId',
        element: <MovieDetailPage />
      },
       
    ]
  }
])

/** 추천
 * 카테고리 별 페이지 : movie?category={카테고리}
 * 상세 페이지 : movie/{아이디}
 */