import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const navItems = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/furniture", label: "Furniture" },
  { to: "/admin/categories", label: "Kategori" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/contacts", label: "Pesan Masuk" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth_user") || "null");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Clear local session even when the API session has expired.
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950 text-white transition-transform duration-300 lg:static lg:min-h-screen lg:w-72 lg:shrink-0 lg:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
              Premium Furniture
            </p>
            <p className="mt-2 text-xl font-bold">Admin Panel</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Tutup menu"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <nav className="space-y-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
              onClick={() => setMobileNavOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 px-6 py-6">
          <p className="truncate text-sm font-semibold">
            {user?.name || "Admin"}
          </p>
          <p className="mt-1 truncate text-xs text-slate-400">
            {user?.email || ""}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 text-sm font-semibold text-amber-400 transition hover:text-amber-300"
          >
            Keluar
          </button>
        </div>
      </aside>
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi"
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      <main className="min-w-0 flex-1">
        <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-10 lg:py-5">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-700 hover:bg-slate-50 lg:hidden"
            aria-label="Buka menu"
          >
            <span className="text-xl leading-none">&#9776;</span>
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-slate-500">Panel pengelolaan website</p>
            <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
              Selamat datang kembali
            </h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-slate-900 hover:text-slate-900 lg:hidden"
          >
            Keluar
          </button>
        </header>
        <div className="p-4 sm:p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
