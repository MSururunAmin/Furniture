import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFurnitures } from "../../services/furnitureService";
import { getStorageUrl } from "../../config/api";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function Furniture() {
  const [furnitures, setFurnitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFurnitures = async () => {
      try {
        const response = await getFurnitures();

        console.log("Furniture page response:", response);

        setFurnitures(response.data || []);
      } catch (err) {
        console.error("Gagal mengambil furniture:", err);
        setError("Gagal memuat data furniture.");
      } finally {
        setLoading(false);
      }
    };

    loadFurnitures();
  }, []);

  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
            Koleksi Furniture
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Furniture Custom untuk Ruang yang Lebih Berkarakter
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Temukan berbagai furniture berkualitas yang dibuat dengan material
            pilihan dan dapat disesuaikan dengan kebutuhan ruang Anda.
          </p>
        </div>
      </section>

      {/* ================= LIST FURNITURE ================= */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Produk
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Semua Furniture
            </h2>

            <p className="mt-3 text-slate-500">
              Pilihan furniture yang telah kami kerjakan untuk berbagai
              kebutuhan ruang.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-20 text-center">
              <p className="text-slate-500">Memuat furniture...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && furnitures.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-500">
                Belum ada furniture yang tersedia.
              </p>
            </div>
          )}

          {/* Furniture Grid */}
          {!loading && !error && furnitures.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {furnitures.map((furniture) => {
                const image = furniture.images?.[0];

                return (
                  <article
                    key={furniture.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="aspect-4/3 overflow-hidden bg-slate-100">
                      {image?.url || image?.image_url || image?.image_path ? (
                        <img
                          src={getStorageUrl(
                            image.url || image.image_url || image.image_path,
                          )}
                          alt={furniture.name}
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
                      {/* Category */}
                      <p className="text-sm font-semibold text-amber-600">
                        {furniture.category}
                      </p>

                      {/* Name */}
                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        {furniture.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                        {furniture.description}
                      </p>

                      {/* Material */}
                      {furniture.material && (
                        <p className="mt-4 text-sm text-slate-500">
                          Material:{" "}
                          <span className="font-medium text-slate-700">
                            {furniture.material}
                          </span>
                        </p>
                      )}

                      {/* Price */}
                      <div className="mt-5">
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Mulai dari
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          {formatPrice(furniture.starting_price)}
                        </p>
                      </div>

                      {/* Button */}
                      <Link
                        to={`/furniture/${furniture.id}`}
                        className="mt-6 block rounded-xl bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
                      >
                        Lihat Detail
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
