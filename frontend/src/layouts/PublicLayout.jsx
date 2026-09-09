import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "../pages/public/Footer";
import { WHATSAPP_URL } from "../constants/contact";

export default function PublicLayout() {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:h-24 lg:px-8">
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-xl font-bold text-white">
              F
            </div>

            <div className="leading-tight">
              <div className="text-lg font-bold text-slate-900 sm:text-xl">
                Premium
              </div>

              <div className="text-[10px] font-semibold tracking-[0.25em] text-amber-600 sm:text-sm">
                FURNITURE
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              to="/"
              className={`font-medium transition ${
                isActive("/")
                  ? "text-amber-600"
                  : "text-slate-700 hover:text-amber-600"
              }`}
            >
              Home
            </Link>

            <Link
              to="/furniture"
              className={`font-medium transition ${
                isActive("/furniture")
                  ? "text-amber-600"
                  : "text-slate-700 hover:text-amber-600"
              }`}
            >
              Furniture
            </Link>

            <Link
              to="/portfolio"
              className={`font-medium transition ${
                isActive("/portfolio")
                  ? "text-amber-600"
                  : "text-slate-700 hover:text-amber-600"
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/blog"
              className={`font-medium transition ${
                isActive("/blog")
                  ? "text-amber-600"
                  : "text-slate-700 hover:text-amber-600"
              }`}
            >
              Blog
            </Link>

            <Link
              to="/tentang-kami"
              className={`font-medium transition ${
                isActive("/tentang-kami")
                  ? "text-amber-600"
                  : "text-slate-700 hover:text-amber-600"
              }`}
            >
              Tentang Kami
            </Link>
          </nav>

          {/* ================= DESKTOP CONTACT ================= */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 lg:block"
          >
            Hubungi Kami
          </a>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-900 transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? (
              /* X */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Hamburger */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <nav className="mx-auto max-w-[1600px] px-6 py-5">
              <div className="flex flex-col">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`border-b border-slate-100 py-4 font-medium transition ${
                    isActive("/")
                      ? "text-amber-600"
                      : "text-slate-700 hover:text-amber-600"
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/furniture"
                  onClick={closeMobileMenu}
                  className={`border-b border-slate-100 py-4 font-medium transition ${
                    isActive("/furniture")
                      ? "text-amber-600"
                      : "text-slate-700 hover:text-amber-600"
                  }`}
                >
                  Furniture
                </Link>

                <Link
                  to="/portfolio"
                  onClick={closeMobileMenu}
                  className={`border-b border-slate-100 py-4 font-medium transition ${
                    isActive("/portfolio")
                      ? "text-amber-600"
                      : "text-slate-700 hover:text-amber-600"
                  }`}
                >
                  Portfolio
                </Link>

                <Link
                  to="/blog"
                  onClick={closeMobileMenu}
                  className={`border-b border-slate-100 py-4 font-medium transition ${
                    isActive("/blog")
                      ? "text-amber-600"
                      : "text-slate-700 hover:text-amber-600"
                  }`}
                >
                  Blog
                </Link>

                <Link
                  to="/tentang-kami"
                  onClick={closeMobileMenu}
                  className={`border-b border-slate-100 py-4 font-medium transition ${
                    isActive("/tentang-kami")
                      ? "text-amber-600"
                      : "text-slate-700 hover:text-amber-600"
                  }`}
                >
                  Tentang Kami
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="mt-5 rounded-xl bg-slate-900 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-800"
                >
                  Hubungi Kami
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main>
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
