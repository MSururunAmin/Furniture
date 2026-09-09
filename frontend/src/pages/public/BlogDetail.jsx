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
      <section className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">Memuat artikel...</p>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Artikel tidak ditemukan
          </h1>
          <p className="mt-3 text-slate-500">
            Artikel yang Anda cari belum tersedia.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
          >
            Kembali ke Blog
          </Link>
        </div>
      </section>
    );
  }

  const imageUrl = getImageUrl(blog.cover_image);

  const newLocal = "aspect-video w-full rounded-3xl object-cover";
  return (
    <article className="bg-white">
      <section className="bg-slate-950 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="text-sm font-medium text-slate-400 transition hover:text-amber-400"
          >
            ← Kembali ke Blog
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
            {formatDate(blog.created_at)}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">
            {blog.title}
          </h1>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {imageUrl && (
            <img src={imageUrl} alt={blog.title} className={newLocal} />
          )}

          <div className="mt-10 whitespace-pre-line text-lg leading-9 text-slate-600">
            {blog.body}
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-slate-900">
              Ingin berdiskusi tentang furniture custom?
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-slate-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
