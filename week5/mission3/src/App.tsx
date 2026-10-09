import { RouterProvider } from 'react-router-dom';
import './App.css'
import { router } from './Router';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    /**
     * AuthContext가 RouterProvider보다 위에 있음
     * -> useNavigate는 오직 RouterProvider 안에서만 사용할 수 있음
     * -> AuthProvider 안에서는 useNavigate가 아닌 window.location.href="/~" 사용해야함
     *    history를 남기고 싶지 않을 때는 window,location.replace 사용할 것
     */
    <AuthProvider>
     <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
