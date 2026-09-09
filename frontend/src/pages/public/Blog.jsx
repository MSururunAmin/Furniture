import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../../services/blogService";
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

const getExcerpt = (body) => {
  if (!body)
    return "Baca insight terbaru seputar furniture dan desain interior.";

  return body.length > 150 ? `${body.slice(0, 150).trim()}...` : body;
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getBlogs();
        const publishedBlogs = (response.data || []).filter(
          (blog) => blog.status === "published",
        );

        setBlogs(publishedBlogs);
      } catch (err) {
        console.error("Gagal mengambil blog:", err);
        setError("Gagal memuat artikel.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="bg-white">
      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            Blog & Insight
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Inspirasi untuk Ruang yang Lebih Berkarakter
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Temukan inspirasi desain, tips memilih furniture, dan cerita di
            balik pengerjaan ruang yang kami hadirkan.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Artikel Terbaru
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Ide dan Pengetahuan Furniture
            </h2>
          </div>

          {loading && (
            <div className="py-20 text-center text-slate-500">
              Memuat artikel...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <p className="text-lg font-medium text-slate-500">
                Belum ada artikel yang diterbitkan.
              </p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => {
                const imageUrl = getImageUrl(blog.cover_image);

                return (
                  <article
                    key={blog.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="aspect-16/10 overflow-hidden bg-slate-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={blog.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          Belum ada gambar
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-slate-400">
                        {formatDate(blog.created_at)}
                      </p>
                      <h2 className="mt-3 text-2xl font-bold text-slate-900">
                        {blog.title}
                      </h2>
                      <p className="mt-3 line-clamp-3 leading-7 text-slate-500">
                        {getExcerpt(blog.body)}
                      </p>
                      <Link
                        to={`/blog/${blog.id}`}
                        className="mt-6 inline-block font-semibold text-amber-600 transition hover:text-amber-700"
                      >
                        Baca Selengkapnya →
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
