import React from 'react';
import './App.css';
import Header from './components/header';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import NotFound from './pages/NotFound';
import Footer from './components/footer';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
