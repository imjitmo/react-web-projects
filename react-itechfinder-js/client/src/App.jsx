import './App.css';

import { useBeforeunload } from 'react-beforeunload';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Verifier from './components/Verifier';
import About from './pages/About';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Favourites from './pages/Favourites';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Shop from './pages/Shop';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Transactions from './pages/Transactions';

function App() {
  // useBeforeunload(() => {
  //   if (window) localStorage.clear();
  // });
  return (
    <Router>
      <Header />
      <main className="min-w-screen min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/verify/:token" element={<Verifier />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
