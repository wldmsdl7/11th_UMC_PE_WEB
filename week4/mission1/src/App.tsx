import './App.css'
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    // 상위 page 에서 outlet 처리해줘야 함
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
        index: true
      },
      {
        path: 'movies/:category/:movieId',
        element: <MovieDetailPage />
      }
    ]
  }
])

/** 추천
 * 카테고리 별 페이지 : movie?category={카테고리}
 * 상세 페이지 : movie/{아이디}
 */

function App() {
  console.log(import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router} />
}

export default App
