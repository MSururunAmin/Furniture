import { useEffect, useState } from "react";
import { getFurnitures } from "../../services/furnitureService";
import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "../../constants/contact";
import { getStorageUrl } from "../../config/api";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return getStorageUrl(imagePath);
};

export default function Home() {
  const [furnitures, setFurnitures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFurniture = async () => {
      try {
        const response = await getFurnitures();

        console.log("Furniture API:", response);

        setFurnitures(response.data || []);
      } catch (error) {
        console.error("Gagal mengambil furniture:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFurniture();
  }, []);

  const featuredFurniture =
    furnitures.find((furniture) => furniture.is_featured) || furnitures[0];

  const heroImage = featuredFurniture?.images?.[0]
    ? getImageUrl(featuredFurniture.images[0].image_path)
    : null;

  return (
    <main>
      {/* =========================================================
                HERO
            ========================================================= */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-24 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-10">
          {/* Hero Text */}
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-amber-400">
              Premium Furniture
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-5xl">
              Furniture Custom
              <br />
              untuk Ruang
              <br />
              Impian Anda
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Kami menghadirkan furniture berkualitas dengan desain yang dibuat
              sesuai kebutuhan, karakter, dan gaya ruang Anda.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#furniture"
                className="rounded-xl bg-amber-500 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Lihat Furniture
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
              >
                Konsultasi
              </a>
            </div>

            {/* Small Stats */}
            <div className="mt-12 flex flex-wrap gap-10 border-t border-slate-800 pt-8">
              <div>
                <p className="text-2xl font-bold">{furnitures.length}+</p>

                <p className="mt-1 text-sm text-slate-400">Koleksi Furniture</p>
              </div>

              <div>
                <p className="text-2xl font-bold">Custom</p>

                <p className="mt-1 text-sm text-slate-400">Sesuai Kebutuhan</p>
              </div>

              <div>
                <p className="text-2xl font-bold">Premium</p>

                <p className="mt-1 text-sm text-slate-400">
                  Material Berkualitas
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative -mt-24 w-full max-w-lg lg:w-[76%] lg:translate-x-10">
            <div className="overflow-hidden rounded-4xl border border-slate-800 bg-slate-900 shadow-2xl">
              <div className="aspect-square">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-slate-500">Memuat gambar...</p>
                  </div>
                ) : heroImage ? (
                  <img
                    src={heroImage}
                    alt={featuredFurniture?.name || "Premium Furniture"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-slate-500">Belum ada gambar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Furniture Info */}
          </div>
        </div>
      </section>

      {/* =========================================================
                INTRODUCTION
            ========================================================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600">
            Tentang Kami
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Furniture yang Dibuat dengan Detail
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500">
            Kami percaya bahwa furniture bukan hanya sekadar pelengkap ruangan.
            Setiap produk dirancang untuk memberikan fungsi, kenyamanan, dan
            karakter yang sesuai dengan kebutuhan pelanggan.
          </p>
        </div>
      </section>

      {/* =========================================================
                FURNITURE
            ========================================================= */}
      <section id="furniture" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-600">
                Koleksi
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Furniture Pilihan
              </h2>

              <p className="mt-3 max-w-xl text-slate-500">
                Beberapa furniture yang kami kerjakan dengan material
                berkualitas dan desain yang menyesuaikan kebutuhan pelanggan.
              </p>
            </div>

            <Link
              to="/furniture"
              className="font-semibold text-slate-900 hover:text-amber-600"
            >
              Lihat Semua →
            </Link>
          </div>

          {/* Furniture List */}
          <div className="mt-12">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-96 animate-pulse rounded-2xl bg-slate-200"
                  />
                ))}
              </div>
            ) : furnitures.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-slate-500">Belum ada furniture.</p>
              </div>
            ) : (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {furnitures.slice(0, 6).map((furniture) => {
                  const image = furniture.images?.[0]
                    ? getImageUrl(furniture.images[0].image_path)
                    : null;

                  return (
                    <article
                      key={furniture.id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Image */}
                      <div className="aspect-4/3 overflow-hidden bg-slate-100">
                        {image ? (
                          <img
                            src={image}
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
                        <p className="text-sm font-semibold text-amber-600">
                          {furniture.category}
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-slate-900">
                          {furniture.name}
                        </h3>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                          {furniture.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between gap-4">
                          <p className="text-lg font-bold text-slate-900">
                            {formatPrice(furniture.starting_price)}
                          </p>

                          <a
                            href={`/furniture/${furniture.id}`}
                            className="text-sm font-semibold text-slate-900 transition hover:text-amber-600"
                          >
                            Detail →
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
                CTA
            ========================================================= */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
            Wujudkan Ruang Impian Anda
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Butuh Furniture Custom?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
            Konsultasikan kebutuhan furniture Anda bersama kami. Kami siap
            membantu mewujudkan furniture yang sesuai dengan ruang dan kebutuhan
            Anda.
          </p>

          <div className="mt-9">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl bg-amber-500 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
