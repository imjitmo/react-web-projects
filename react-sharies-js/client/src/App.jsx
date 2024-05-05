import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';

// component and page imports
import CreatePost from './components/CreatePost';
import Header from './components/Header';
import Signout from './components/Signout';
import Auth from './pages/Auth';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import UpdateProfile from './pages/UpdateProfile';
import UserPage from './pages/UserPage';

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <div className="container mx-auto max-w-screen-sm p-5 lg:p-0">
        <Header />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
          <Route path="/update" element={user ? <UpdateProfile /> : <Navigate to="/auth" />} />
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
        {user && <Signout />}
      </div>
    </>
  );
}

export default App;
