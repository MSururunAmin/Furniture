import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPortfolio } from "../../services/portfolioService";
import { WHATSAPP_URL } from "../../constants/contact";
import { getStorageUrl } from "../../config/api";

const getImageUrl = (image) => {
  const imagePath = image?.url || image?.image_url || image?.image_path;

  return getStorageUrl(imagePath);
};

export default function PortfolioDetail() {
  const { id } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await getPortfolio(id);

        console.log("Portfolio detail:", response);

        const data = response.data;

        setPortfolio(data);

        if (data?.images?.length > 0) {
          setSelectedImage(getImageUrl(data.images[0]));
        } else if (data?.cover_image) {
          setSelectedImage(getImageUrl({ image_path: data.cover_image }));
        }
      } catch (err) {
        console.error("Gagal mengambil detail portfolio:", err);

        setError("Portfolio tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [id]);

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">Memuat detail portfolio...</p>
      </section>
    );
  }

  if (error || !portfolio) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Portfolio tidak ditemukan
          </h1>

          <p className="mt-3 text-slate-500">
            Data portfolio yang Anda cari tidak tersedia.
          </p>

          <Link
            to="/portfolio"
            className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
          >
            Kembali ke Portfolio
          </Link>
        </div>
      </section>
    );
  }

  const images = portfolio.images || [];

  return (
    <div className="bg-white">
      {/* ================= HEADER ================= */}
      <section className="bg-slate-950 px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/portfolio"
            className="text-sm font-medium text-slate-400 transition hover:text-amber-400"
          >
            ← Kembali ke Portfolio
          </Link>

          {portfolio.category && (
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
              {portfolio.category}
            </p>
          )}

          <h1 className="mt-3 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            {portfolio.title || portfolio.name}
          </h1>
        </div>
      </section>

      {/* ================= DETAIL ================= */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* ================= GALLERY ================= */}
            <div>
              <div className="aspect-4/3 overflow-hidden rounded-3xl bg-slate-100">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={portfolio.title || portfolio.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    Belum ada gambar
                  </div>
                )}
              </div>

              {/* Thumbnail */}
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images.map((image, index) => {
                    const imageUrl = getImageUrl(image);

                    return (
                      <button
                        key={image.id || index}
                        type="button"
                        onClick={() => setSelectedImage(imageUrl)}
                        className={`aspect-square overflow-hidden rounded-xl border-2 transition ${
                          selectedImage === imageUrl
                            ? "border-amber-500"
                            : "border-transparent hover:border-slate-300"
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Portfolio ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ================= INFORMATION ================= */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                Tentang Proyek
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {portfolio.title || portfolio.name}
              </h2>

              {portfolio.description && (
                <p className="mt-6 leading-8 text-slate-500">
                  {portfolio.description}
                </p>
              )}

              {/* Informasi */}
              <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {portfolio.category && (
                  <div className="flex justify-between gap-6 py-4">
                    <span className="text-slate-500">Kategori</span>

                    <span className="font-semibold text-slate-900">
                      {portfolio.category}
                    </span>
                  </div>
                )}

                {portfolio.client_name && (
                  <div className="flex justify-between gap-6 py-4">
                    <span className="text-slate-500">Klien</span>

                    <span className="font-semibold text-slate-900">
                      {portfolio.client_name}
                    </span>
                  </div>
                )}

                {portfolio.location && (
                  <div className="flex justify-between gap-6 py-4">
                    <span className="text-slate-500">Lokasi</span>

                    <span className="font-semibold text-slate-900">
                      {portfolio.location}
                    </span>
                  </div>
                )}

                {portfolio.completed_at && (
                  <div className="flex justify-between gap-6 py-4">
                    <span className="text-slate-500">Selesai</span>

                    <span className="font-semibold text-slate-900">
                      {portfolio.completed_at}
                    </span>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
                >
                  Konsultasi Proyek
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
