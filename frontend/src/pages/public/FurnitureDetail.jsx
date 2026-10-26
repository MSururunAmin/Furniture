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
      <section className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-6 pt-20">
        <div
          role="status"
          aria-label="Memuat detail furniture"
          className="w-full max-w-6xl animate-pulse"
        >
          <span className="sr-only">Memuat detail furniture...</span>
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="aspect-4/3 rounded-3xl bg-slate-200" />
            <div className="space-y-5 rounded-3xl bg-white p-8">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-10 w-3/4 rounded bg-slate-200" />
              <div className="h-24 rounded bg-slate-100" />
              <div className="h-16 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !furniture) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-6 pt-20">
        <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl text-amber-600">
            !
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Furniture tidak ditemukan
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            Data furniture yang Anda cari tidak tersedia.
          </p>

          <Link
            to="/furniture"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
          >
            <span aria-hidden="true">←</span> Kembali ke Furniture
          </Link>
        </div>
      </section>
    );
  }

  const images = furniture.images || [];
  const selectedImageIndex = images.findIndex(
    (image) => getImageUrl(image) === selectedImage,
  );

  return (
    <div className="bg-stone-50">
      <section className="bg-slate-950 px-6 pb-7 pt-28 sm:pb-9 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/furniture"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-amber-400"
          >
            <span aria-hidden="true">←</span> Semua Furniture
          </Link>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-amber-500">
            Koleksi Furniture <span className="px-2 text-slate-600">/</span>{" "}
            Detail Produk
          </p>
        </div>
      </section>

      <section className="px-6 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="min-w-0">
              <div className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-stone-200 shadow-lg shadow-slate-900/5">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={furniture.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
                    <svg
                      aria-hidden="true"
                      className="h-10 w-10 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3.75" y="4.75" width="16.5" height="14.5" rx="2" />
                      <circle cx="8.5" cy="9.5" r="1.25" />
                      <path d="m4.5 17 5-5 3.25 3.25 2.5-2.5 4.25 4.25" />
                    </svg>
                    <span className="text-sm">Belum ada gambar</span>
                  </div>
                )}
                {images.length > 0 && (
                  <div className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    {Math.max(selectedImageIndex + 1, 1)} / {images.length} foto
                  </div>
                )}
              </div>

              {images.length > 0 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {images.map((image, index) => {
                    const imageUrl = getImageUrl(image);
                    const isSelected = selectedImage === imageUrl;

                    return (
                      <button
                        key={image.id || index}
                        type="button"
                        onClick={() => setSelectedImage(imageUrl)}
                        aria-label={`Lihat foto ${index + 1}`}
                        aria-pressed={isSelected}
                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition sm:h-24 sm:w-24 ${
                          isSelected
                            ? "border-amber-500 shadow-md shadow-amber-900/10"
                            : "border-transparent opacity-70 hover:border-slate-300 hover:opacity-100"
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

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Geser pilihan foto untuk melihat detail produk dari berbagai sisi.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-amber-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">
                  {furniture.category || "Furniture pilihan"}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Dibuat untuk Anda
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                {furniture.name}
              </h1>

              {furniture.description && (
                <p className="mt-5 whitespace-pre-line text-[15px] leading-7 text-slate-600">
                  {furniture.description}
                </p>
              )}

              <div className="mt-7 rounded-2xl bg-stone-50 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Harga mulai dari
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {formatPrice(furniture.starting_price)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Harga dapat menyesuaikan ukuran dan pilihan material. Hubungi
                  kami untuk konsultasi kebutuhan Anda.
                </p>
              </div>

              <div className="mt-7">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-900">
                  Informasi Produk
                </h2>
                <dl className="mt-3 divide-y divide-slate-100 border-y border-slate-100">
                  <div className="flex items-start justify-between gap-6 py-4">
                    <dt className="text-sm text-slate-500">Kategori</dt>
                    <dd className="text-right text-sm font-semibold text-slate-900">
                      {furniture.category || "-"}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-6 py-4">
                    <dt className="text-sm text-slate-500">Material</dt>
                    <dd className="max-w-[60%] text-right text-sm font-semibold text-slate-900">
                      {furniture.material || "-"}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-6 py-4">
                    <dt className="text-sm text-slate-500">Dimensi</dt>
                    <dd className="max-w-[60%] text-right text-sm font-semibold text-slate-900">
                      {furniture.dimensions || "-"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-center font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  Konsultasi Furniture <span aria-hidden="true">↗</span>
                </a>

                <Link
                  to="/furniture"
                  className="rounded-full border border-slate-200 px-6 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                  Lihat Furniture Lain
                </Link>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Perlu bantuan memilih? Tim kami siap membantu.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
