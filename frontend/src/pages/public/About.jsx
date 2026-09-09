import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "../../constants/contact";

const values = [
  {
    title: "Dibuat Sesuai Kebutuhan",
    description:
      "Setiap ruang memiliki karakter yang berbeda. Kami merancang furniture yang menyesuaikan ukuran, gaya, dan kebutuhan Anda.",
  },
  {
    title: "Material Pilihan",
    description:
      "Kami menggunakan material yang dipilih dengan cermat untuk menghasilkan furniture yang kuat, nyaman, dan tahan lama.",
  },
  {
    title: "Pengerjaan Terpercaya",
    description:
      "Detail dikerjakan dengan teliti oleh tim berpengalaman, mulai dari proses desain hingga furniture siap digunakan.",
  },
];

export default function About() {
  return (
    <div className="bg-white">
      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            Tentang Kami
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Menghadirkan Furniture yang Berarti untuk Setiap Ruang
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Premium Furniture membantu Anda menciptakan ruang yang nyaman,
            fungsional, dan memiliki karakter melalui furniture berkualitas yang
            dibuat dengan perhatian pada setiap detail.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Cerita Kami
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Dari ide menjadi ruang yang terasa personal
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              Kami percaya furniture bukan sekadar benda yang mengisi ruangan.
              Furniture yang tepat dapat membuat aktivitas terasa lebih nyaman,
              menyimpan cerita, dan mencerminkan karakter pemiliknya.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Karena itu, kami menggabungkan desain yang matang, material yang
              berkualitas, dan pengerjaan yang rapi untuk membantu mewujudkan
              furniture custom yang sesuai dengan kebutuhan Anda.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white md:p-10">
            <p className="text-5xl font-bold text-amber-500">01</p>
            <h3 className="mt-8 text-2xl font-bold">Ruang yang lebih nyaman</h3>
            <p className="mt-4 leading-7 text-slate-300">
              Setiap proyek kami mulai dari mendengarkan kebutuhan Anda, memahami
              ruangnya, lalu merancang solusi yang tepat dan berkarakter.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
              Prinsip Kami
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Hal yang kami jaga dalam setiap proyek
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="bg-white p-7 ring-1 ring-slate-200"
              >
                <p className="text-sm font-bold text-amber-600">0{index + 1}</p>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-500">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-amber-500 px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900/70">
              Mulai dari sini
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Punya rencana untuk ruang Anda?
            </h2>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-slate-950 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
