import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Notes from './pages/Notes';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
