import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/public/Home";
import Furniture from "./pages/public/Furniture";
import PublicLayout from "./layouts/PublicLayout";
import Footer from "./pages/public/Footer";
import FurnitureDetail from "./pages/public/FurnitureDetail";
import Portfolio from "./pages/public/Potrofolio";
import PortfolioDetail from "./pages/public/PortfolioDetail";
import Blog from "./pages/public/Blog";
import BlogDetail from "./pages/public/BlogDetail";
import About from "./pages/public/About";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminResourcePage from "./pages/admin/AdminResourcePage";
import AdminCategories from "./pages/admin/AdminCategories";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/furniture" element={<Furniture />} />
          <Route path="/furniture/:id" element={<FurnitureDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route path="/footer" element={<Footer />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route
            path="furniture"
            element={<AdminResourcePage resourceKey="furniture" />}
          />
          <Route
            path="portfolio"
            element={<AdminResourcePage resourceKey="portfolio" />}
          />
          <Route
            path="blog"
            element={<AdminResourcePage resourceKey="blog" />}
          />
          <Route
            path="contacts"
            element={<AdminResourcePage resourceKey="contacts" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
