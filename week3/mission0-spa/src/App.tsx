import { Appbar } from './components/Appbar';
import { Navbar } from './components/Navbar';
import { Route, Routes } from './router';

const NunuPage = () => {
  console.log("NunuPage 렌더링");
  return <h1 className="text-3xl font-bold">누누 페이지</h1>;
};
const JingniPage = () => {
  console.log("JingniPage 렌더링");
  return <h1 className="text-3xl font-bold">징니 페이지</h1>;
};
const JenPage = () => {
  console.log("JenPage 렌더링");
  return <h1 className="text-3xl font-bold">젠 페이지</h1>;
};
const EdenPage = () => {
  console.log("EdenPage 렌더링");
  return <h1 className="text-3xl font-bold">이든 페이지</h1>;
};
const NotFoundPage = () => {
  console.log("NotFoundPage 렌더링");
  return <h1 className="text-3xl font-bold text-red-500">404</h1>;
};

// Navbar


// Appbar (상단)

function App() {
  console.log("🌍 App 전체 실행");
  return (
    <div className="flex flex-col h-screen">
      <Appbar />
      <div className="flex flex-1">
        <Navbar />
        <main className="p-6 flex-1">
          <Routes>
            <Route path='/nunu' component={NunuPage} />
            <Route path='/jingni' component={JingniPage} />
            <Route path='/jen' component={JenPage} />
            <Route path='/eden' component={EdenPage} />
            <Route path='/not-found' component={NotFoundPage} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;