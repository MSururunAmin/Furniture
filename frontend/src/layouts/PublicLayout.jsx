import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "../pages/public/Footer";
import { WHATSAPP_URL } from "../constants/contact";

export default function PublicLayout() {
  const location = useLocation();
  const isBlogPage =
    location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 16);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path === "/blog" && location.pathname.startsWith("/blog/"))
    );
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled || isBlogPage
            ? "border-white/10 bg-slate-950/85 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:h-24 lg:px-8">
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-xl font-bold text-slate-950 shadow-lg shadow-amber-950/20">
              F
            </div>

            <div className="leading-tight">
              <div className="text-lg font-bold text-white sm:text-xl">
                Premium
              </div>

              <div className="text-[10px] font-semibold tracking-[0.25em] text-amber-400 sm:text-sm">
                FURNITURE
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md lg:flex">
            <Link
              to="/"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive("/")
                  ? "bg-amber-500 text-slate-950"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              to="/furniture"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive("/furniture")
                  ? "bg-amber-500 text-slate-950"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              Furniture
            </Link>

            <Link
              to="/portfolio"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive("/portfolio")
                  ? "bg-amber-500 text-slate-950"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/blog"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive("/blog")
                  ? "bg-amber-500 text-slate-950"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              Blog
            </Link>

            <Link
              to="/tentang-kami"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive("/tentang-kami")
                  ? "bg-amber-500 text-slate-950"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
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
            className="hidden rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400 lg:block"
          >
            Hubungi Kami
          </a>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
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
          <div className="border-t border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden">
            <nav className="mx-auto max-w-[1600px] px-6 py-5">
              <div className="flex flex-col">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`border-b border-white/10 py-4 font-medium transition ${
                    isActive("/")
                      ? "text-amber-400"
                      : "text-white/80 hover:text-amber-300"
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/furniture"
                  onClick={closeMobileMenu}
                  className={`border-b border-white/10 py-4 font-medium transition ${
                    isActive("/furniture")
                      ? "text-amber-400"
                      : "text-white/80 hover:text-amber-300"
                  }`}
                >
                  Furniture
                </Link>

                <Link
                  to="/portfolio"
                  onClick={closeMobileMenu}
                  className={`border-b border-white/10 py-4 font-medium transition ${
                    isActive("/portfolio")
                      ? "text-amber-400"
                      : "text-white/80 hover:text-amber-300"
                  }`}
                >
                  Portfolio
                </Link>

                <Link
                  to="/blog"
                  onClick={closeMobileMenu}
                  className={`border-b border-white/10 py-4 font-medium transition ${
                    isActive("/blog")
                      ? "text-amber-400"
                      : "text-white/80 hover:text-amber-300"
                  }`}
                >
                  Blog
                </Link>

                <Link
                  to="/tentang-kami"
                  onClick={closeMobileMenu}
                  className={`border-b border-white/10 py-4 font-medium transition ${
                    isActive("/tentang-kami")
                      ? "text-amber-400"
                      : "text-white/80 hover:text-amber-300"
                  }`}
                >
                  Tentang Kami
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="mt-5 rounded-xl bg-amber-500 px-6 py-3.5 text-center font-bold text-slate-950 transition hover:bg-amber-400"
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
