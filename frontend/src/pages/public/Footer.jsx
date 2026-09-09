import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">

            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">

                {/* Brand */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg font-bold text-slate-950">
                            F
                        </div>

                        <div>
                            <p className="text-lg font-bold leading-none">
                                Premium
                            </p>

                            <p className="text-xs tracking-[0.2em] text-amber-400">
                                FURNITURE
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 max-w-md leading-7 text-slate-400">
                        Solusi furniture custom berkualitas untuk menciptakan
                        ruang yang nyaman, elegan, dan sesuai dengan kebutuhan
                        Anda.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold">
                        Navigasi
                    </h3>

                    <div className="mt-5 space-y-3">
                        <Link
                            to="/"
                            className="block text-slate-400 hover:text-white"
                        >
                            Home
                        </Link>

                        <Link
                            to="/furniture"
                            className="block text-slate-400 hover:text-white"
                        >
                            Furniture
                        </Link>

                        <Link
                            to="/portfolio"
                            className="block text-slate-400 hover:text-white"
                        >
                            Portfolio
                        </Link>

                        <Link
                            to="/blog"
                            className="block text-slate-400 hover:text-white"
                        >
                            Blog
                        </Link>
                    </div>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold">
                        Hubungi Kami
                    </h3>

                    <div className="mt-5 space-y-3 text-slate-400">
                        <p>Semarang, Jawa Tengah</p>
                        <p>0851-8954-3756</p>
                        <p>info@premiumfurniture.com</p>
                    </div>
                </div>

            </div>

            <div className="border-t border-slate-800">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Premium Furniture.
                        All rights reserved.
                    </p>
                </div>
            </div>

        </footer>
    );
}