import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFurnitures } from "../../services/furnitureService";
import { getPortfolios } from "../../services/portfolioService";
import { getBlogs } from "../../services/blogService";
import { getContacts } from "../../services/contactService";

const cards = [
  { key: "furniture", label: "Furniture", to: "/admin/furniture", color: "amber" },
  { key: "portfolio", label: "Portfolio", to: "/admin/portfolio", color: "blue" },
  { key: "blog", label: "Artikel Blog", to: "/admin/blog", color: "emerald" },
  { key: "contacts", label: "Pesan Masuk", to: "/admin/contacts", color: "rose" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ furniture: 0, portfolio: 0, blog: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const results = await Promise.allSettled([
        getFurnitures(),
        getPortfolios(),
        getBlogs(),
        getContacts(),
      ]);

      const values = results.map((result) =>
        result.status === "fulfilled" ? result.value.data || [] : [],
      );

      setStats({
        furniture: values[0].length,
        portfolio: values[1].length,
        blog: values[2].length,
        contacts: values[3].length,
      });
      setLoading(false);
    };

    loadStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
          Overview
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Ringkasan website</h2>
        <p className="mt-2 text-slate-500">Pantau dan kelola konten Premium Furniture.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.key}
            to={card.to}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-sm font-semibold text-slate-500">{card.label}</p>
            <p className="mt-4 text-4xl font-bold text-slate-900">
              {loading ? "-" : stats[card.key]}
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-600">Kelola data →</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-slate-950 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
          Aksi cepat
        </p>
        <h3 className="mt-3 text-2xl font-bold">Website siap dikelola</h3>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          Gunakan menu di samping untuk memperbarui katalog furniture, portfolio,
          artikel, dan menindaklanjuti pesan dari calon pelanggan.
        </p>
      </div>
    </div>
  );
}