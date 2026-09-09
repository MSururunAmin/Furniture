import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPortfolios } from "../../services/portfolioService";
import { getStorageUrl } from "../../config/api";

const getImageUrl = (image) => {
  const imagePath = image?.url || image?.image_url || image?.image_path;

  return getStorageUrl(imagePath);
};

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const response = await getPortfolios();

        console.log("Portfolio response:", response);

        setPortfolios(response.data || []);
      } catch (error) {
        console.error("Gagal mengambil portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolios();
  }, []);

  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            Portfolio
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Hasil Pekerjaan Furniture Kami
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Lihat berbagai proyek furniture yang telah kami kerjakan untuk
            menciptakan ruang yang nyaman, fungsional, dan sesuai dengan
            kebutuhan pelanggan.
          </p>
        </div>
      </section>

      {/* ================= PORTFOLIO ================= */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Proyek Kami
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Portfolio Terbaru
            </h2>

            <p className="mt-3 text-slate-500">
              Beberapa hasil pekerjaan yang telah kami selesaikan.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <p className="text-slate-500">Memuat portfolio...</p>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <p className="text-lg font-medium text-slate-500">
                Belum ada portfolio.
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Portfolio akan ditampilkan setelah tersedia.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((portfolio) => {
                const image = portfolio.images?.[0];
                const imageUrl = getImageUrl(image);

                return (
                  <article
                    key={portfolio.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="aspect-4/3 overflow-hidden bg-slate-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={portfolio.title || portfolio.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          Belum ada gambar
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {portfolio.category && (
                        <p className="text-sm font-semibold text-amber-600">
                          {portfolio.category}
                        </p>
                      )}

                      <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {portfolio.title || portfolio.name}
                      </h3>

                      {portfolio.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                          {portfolio.description}
                        </p>
                      )}

                      {portfolio.location && (
                        <p className="mt-4 text-sm text-slate-500">
                          📍 {portfolio.location}
                        </p>
                      )}

                      <Link
                        to={`/portfolio/${portfolio.id}`}
                        className="mt-6 inline-block font-semibold text-amber-600 transition hover:text-amber-700"
                      >
                        Lihat Detail →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
