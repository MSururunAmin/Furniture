import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFurniture } from "../../services/furnitureService";
import { WHATSAPP_URL } from "../../constants/contact";
import { getStorageUrl } from "../../config/api";

const getImageUrl = (image) => {
  const imagePath = image?.url || image?.image_url || image?.image_path;

  return getStorageUrl(imagePath);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function FurnitureDetail() {
  const { id } = useParams();

  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadFurniture = async () => {
      try {
        const response = await getFurniture(id);

        console.log("Furniture detail:", response);

        const data = response.data;

        setFurniture(data);

        if (data?.images?.length > 0) {
          setSelectedImage(getImageUrl(data.images[0]));
        }
      } catch (err) {
        console.error("Gagal mengambil detail furniture:", err);
        setError("Furniture tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    loadFurniture();
  }, [id]);

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">Memuat detail furniture...</p>
      </section>
    );
  }

  if (error || !furniture) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Furniture tidak ditemukan
          </h1>

          <p className="mt-3 text-slate-500">
            Data furniture yang Anda cari tidak tersedia.
          </p>

          <Link
            to="/furniture"
            className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-amber-500 hover:text-slate-950"
          >
            Kembali ke Furniture
          </Link>
        </div>
      </section>
    );
  }

  const images = furniture.images || [];

  return (
    <div className="bg-white">
      {/* ================= HEADER ================= */}
      <section className="bg-slate-950 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/furniture"
            className="text-sm font-medium text-slate-400 transition hover:text-amber-400"
          >
            ← Kembali ke Furniture
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
            {furniture.category}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {furniture.name}
          </h1>
        </div>
      </section>

      {/* ================= DETAIL ================= */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* ================= GALLERY ================= */}
            <div>
              {/* Main Image */}
              <div className="aspect-4/3 overflow-hidden rounded-3xl bg-slate-100">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={furniture.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    Belum ada gambar
                  </div>
                )}
              </div>

              {/* Thumbnails */}
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
                          alt={`${furniture.name} ${index + 1}`}
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
                Detail Produk
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                {furniture.name}
              </h2>

              {/* Description */}
              <p className="mt-6 leading-8 text-slate-500">
                {furniture.description}
              </p>

              {/* Specifications */}
              <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                <div className="flex justify-between gap-6 py-4">
                  <span className="text-slate-500">Kategori</span>

                  <span className="font-semibold text-slate-900">
                    {furniture.category || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-6 py-4">
                  <span className="text-slate-500">Material</span>

                  <span className="text-right font-semibold text-slate-900">
                    {furniture.material || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-6 py-4">
                  <span className="text-slate-500">Dimensi</span>

                  <span className="text-right font-semibold text-slate-900">
                    {furniture.dimensions || "-"}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-8">
                <p className="text-sm text-slate-400">Harga mulai dari</p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {formatPrice(furniture.starting_price)}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-slate-900 px-7 py-4 text-center font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
                >
                  Konsultasi Furniture
                </a>

                <Link
                  to="/furniture"
                  className="rounded-xl border border-slate-200 px-7 py-4 text-center font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  Lihat Furniture Lain
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
