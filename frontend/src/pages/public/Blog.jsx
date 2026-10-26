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

const ArticleImage = ({ imageUrl, title, featured = false }) => (
  <div
    className={`relative overflow-hidden bg-stone-200 ${
      featured ? "aspect-16/10 sm:aspect-auto sm:min-h-[24rem]" : "aspect-16/10"
    }`}
  >
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
    ) : (
      <div className="flex h-full min-h-48 items-center justify-center text-sm text-slate-400">
        Belum ada gambar
      </div>
    )}
  </div>
);

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

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="bg-stone-50">
      <section className="px-6 pb-14 pt-32 sm:pb-20 sm:pt-36">
        <div className="mx-auto grid max-w-7xl items-end gap-8 md:grid-cols-[1fr_340px] md:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
              <span className="h-px w-8 bg-amber-500" />
              Jurnal Ruang
            </p>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Cerita di balik ruang yang bermakna.
            </h1>
          </div>
          <div className="border-l border-amber-300 pl-5 md:mb-2">
            <p className="text-base leading-7 text-slate-600">
              Inspirasi desain, panduan memilih furniture, dan ide untuk
              menjadikan rumah terasa lebih personal.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Ide baik untuk hidup sehari-hari
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                Baca dan temukan
              </p>
              <h2 className="mt-2 font-serif text-3xl text-slate-950 sm:text-4xl">
                Catatan terbaru
              </h2>
            </div>
            {!loading && !error && blogs.length > 0 && (
              <p className="text-sm text-slate-500">
                {blogs.length} artikel
              </p>
            )}
          </div>

          {loading && (
            <div
              role="status"
              aria-label="Memuat artikel"
              className="grid animate-pulse gap-6 md:grid-cols-2"
            >
              <span className="sr-only">Memuat artikel...</span>
              <div className="aspect-16/10 rounded-3xl bg-slate-200 md:row-span-2 md:aspect-auto" />
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-8 w-3/4 rounded bg-slate-200" />
                <div className="h-20 rounded bg-slate-100" />
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-20 text-center">
              <p className="font-serif text-2xl text-slate-800">
                Belum ada artikel yang diterbitkan.
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Nantikan cerita dan inspirasi terbaru dari kami.
              </p>
            </div>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="space-y-8">
              <article
                key={featuredBlog.id}
                className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-slate-900/5 md:grid-cols-2"
              >
                <Link
                  to={`/blog/${featuredBlog.id}`}
                  className="block overflow-hidden"
                  aria-label={`Baca artikel: ${featuredBlog.title}`}
                >
                  <ArticleImage
                    imageUrl={getImageUrl(featuredBlog.cover_image)}
                    title={featuredBlog.title}
                    featured
                  />
                </Link>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                    <span className="rounded-full bg-amber-50 px-3 py-1.5">
                      Pilihan editor
                    </span>
                    <time
                      dateTime={
                        featuredBlog.published_at || featuredBlog.created_at
                      }
                    >
                      {formatDate(
                        featuredBlog.published_at || featuredBlog.created_at,
                      )}
                    </time>
                  </div>
                  <h3 className="mt-5 font-serif text-3xl leading-tight text-slate-950 sm:text-4xl">
                    {featuredBlog.title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">
                    {getExcerpt(featuredBlog.body)}
                  </p>
                  <Link
                    to={`/blog/${featuredBlog.id}`}
                    className="mt-7 inline-flex w-fit items-center gap-3 border-b border-amber-500 pb-1.5 text-sm font-semibold text-slate-950 transition hover:gap-5 hover:text-amber-800"
                  >
                    Baca artikelnya <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>

              {otherBlogs.length > 0 && (
                <div className="grid gap-x-8 gap-y-10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                  {otherBlogs.map((blog) => (
                    <article key={blog.id} className="group">
                      <Link
                        to={`/blog/${blog.id}`}
                        className="block overflow-hidden rounded-2xl"
                        aria-label={`Baca artikel: ${blog.title}`}
                      >
                        <ArticleImage
                          imageUrl={getImageUrl(blog.cover_image)}
                          title={blog.title}
                        />
                      </Link>
                      <div className="pt-5">
                        <time
                          dateTime={blog.published_at || blog.created_at}
                          className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400"
                        >
                          {formatDate(blog.published_at || blog.created_at)}
                        </time>
                        <h3 className="mt-3 font-serif text-2xl leading-snug text-slate-950 transition group-hover:text-amber-800">
                          {blog.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {getExcerpt(blog.body)}
                        </p>
                        <Link
                          to={`/blog/${blog.id}`}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:gap-3 group-hover:text-amber-800"
                        >
                          Baca artikel <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
