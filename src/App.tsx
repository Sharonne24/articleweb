import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

import Home from './pages/home';
import BlogDetails from './pages/blog-details';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import AppLayout from './components/layout/app-layout';
import Authors from './pages/authors';
import CreateAuthor from './pages/create-author';
import ProtectedRoute from './components/layout/protected-route';
import CategoriesPage from './pages/categories';
import BlogsListPage from './pages/blogs-list';
import BlogForm from './pages/blog-form';
import PublicLayout from './components/layout/public-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/new" element={<CreateAuthor />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/blogs/list" element={<BlogsListPage />} />
          <Route path="/blogs/new" element={<BlogForm />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
