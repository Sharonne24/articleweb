import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import BlogDetails from './pages/blog-details';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
