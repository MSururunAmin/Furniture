import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "../../services/blogService";
import { WHATSAPP_URL } from "../../constants/contact";
import { getStorageUrl } from "../../config/api";

const getImageUrl = (imagePath) => {
  return getStorageUrl(imagePath);
};

const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const getReadingTime = (body) => {
  const wordCount = body?.trim().split(/\s+/).filter(Boolean).length || 0;
  return Math.max(1, Math.ceil(wordCount / 200));
};

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await getBlog(id);
        const data = response.data;

        if (!data || data.status !== "published") {
          throw new Error("Artikel tidak tersedia");
        }

        setBlog(data);
      } catch (err) {
        console.error("Gagal mengambil detail blog:", err);
        setError("Artikel tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) {
    return (
      <section
        role="status"
        aria-label="Memuat artikel"
        className="min-h-[70vh] bg-stone-50 px-6 pb-16 pt-32"
      >
        <span className="sr-only">Memuat artikel...</span>
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mx-auto h-4 w-36 rounded bg-slate-200" />
          <div className="mx-auto mt-8 h-12 max-w-2xl rounded bg-slate-200" />
          <div className="mx-auto mt-4 h-6 max-w-xl rounded bg-slate-100" />
          <div className="mt-12 aspect-16/8 rounded-3xl bg-slate-200" />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 w-4/5 rounded bg-slate-200" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-6 pt-20">
        <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl text-amber-600">
            !
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Artikel tidak ditemukan
          </h1>
          <p className="mt-3 leading-7 text-slate-500">
            Artikel yang Anda cari belum tersedia.
          </p>
          <Link
            to="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
          >
            <span aria-hidden="true">←</span> Kembali ke Blog
          </Link>
        </div>
      </section>
    );
  }

  const imageUrl = getImageUrl(blog.cover_image);
  const publishedDate = blog.published_at || blog.created_at;
  const readingTime = getReadingTime(blog.body);

  return (
    <article className="bg-stone-50">
      <header className="px-6 pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-amber-700"
          >
            <span aria-hidden="true">←</span> Kembali ke Jurnal
          </Link>

          <div className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Jurnal Ruang
            </span>
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
              {publishedDate && (
                <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
              )}
              <span className="hidden h-1 w-1 rounded-full bg-amber-500 sm:block" />
              <span>{readingTime} menit membaca</span>
            </div>
            <div className="mx-auto mt-8 h-px w-16 bg-amber-500" />
          </div>
        </div>
      </header>

      {imageUrl && (
        <figure className="px-6">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-stone-200 shadow-xl shadow-slate-900/10">
            <img
              src={imageUrl}
              alt={blog.title}
              className="aspect-16/8 w-full object-cover"
            />
          </div>
          <figcaption className="mx-auto mt-3 max-w-6xl text-right text-xs text-slate-400">
            Inspirasi ruang dari Premium Furniture
          </figcaption>
        </figure>
      )}

      <section className="px-6 pb-20 pt-10 sm:pt-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <div className="mx-auto w-full max-w-3xl">
            <div className="whitespace-pre-line font-serif text-lg leading-[1.95] text-slate-700 sm:text-xl">
              {blog.body}
            </div>

            <div className="mt-14 border-t border-slate-200 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Catatan ruang
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Terima kasih sudah membaca. Temukan lebih banyak inspirasi
                untuk ruang Anda di jurnal kami.
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Punya rencana?
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-snug text-slate-950">
              Wujudkan ruang yang terasa seperti Anda.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Diskusikan kebutuhan furniture custom bersama tim kami.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Konsultasi via WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <Link
              to="/blog"
              className="mt-4 block text-center text-sm font-semibold text-slate-500 transition hover:text-amber-700"
            >
              Jelajahi artikel lain
            </Link>
          </aside>
        </div>
      </section>
    </article>
  );
}
