import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import {
  createFurniture,
  deleteFurniture,
  getFurnitures,
  uploadFurnitureImages,
  updateFurniture,
} from "../../services/furnitureService";
import {
  createPortfolio,
  deletePortfolio,
  getPortfolios,
  uploadPortfolioImages,
  updatePortfolio,
} from "../../services/portfolioService";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../../services/blogService";
import { getContacts, markContactAsRead } from "../../services/contactService";

const emptyForms = {
  furniture: {
    category_id: "",
    name: "",
    slug: "",
    description: "",
    material: "",
    dimensions: "",
    starting_price: "",
    is_featured: false,
  },
  portfolio: {
    title: "",
    slug: "",
    description: "",
    client_name: "",
    location: "",
    year: new Date().getFullYear(),
    category: "",
  },
  blog: { title: "", body: "", status: "draft", cover_image: null },
};

const resources = {
  furniture: {
    title: "Furniture",
    description: "Katalog furniture yang tampil di website.",
    load: getFurnitures,
    create: createFurniture,
    update: updateFurniture,
    remove: deleteFurniture,
    columns: ["name", "category", "material", "starting_price"],
    labels: {
      name: "Nama",
      category: "Kategori",
      material: "Material",
      starting_price: "Harga",
    },
  },
  portfolio: {
    title: "Portfolio",
    description: "Daftar proyek yang ditampilkan kepada pengunjung.",
    load: getPortfolios,
    create: createPortfolio,
    update: updatePortfolio,
    remove: deletePortfolio,
    columns: ["title", "category", "location", "year"],
    labels: {
      title: "Judul",
      category: "Kategori",
      location: "Lokasi",
      year: "Tahun",
    },
  },
  blog: {
    title: "Artikel Blog",
    description: "Kelola daftar artikel dan status publikasinya.",
    load: getBlogs,
    create: createBlog,
    update: updateBlog,
    remove: deleteBlog,
    columns: ["title", "status", "created_at"],
    labels: { title: "Judul", status: "Status", created_at: "Tanggal" },
  },
  contacts: {
    title: "Pesan Masuk",
    description: "Pesan konsultasi dari calon pelanggan.",
    load: getContacts,
    columns: ["name", "email", "phone", "is_read"],
    labels: {
      name: "Nama",
      email: "Email",
      phone: "Telepon",
      is_read: "Status",
    },
  },
};

const formatValue = (key, value) => {
  if (key === "starting_price" && value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (key === "created_at" && value) {
    return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
      new Date(value),
    );
  }
  if (key === "is_read") return value ? "Sudah dibaca" : "Belum dibaca";
  return value || "-";
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

export default function AdminResourcePage({ resourceKey }) {
  const resource = resources[resourceKey];
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [form, setForm] = useState(emptyForms[resourceKey]);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const loadItems = async () => {
    try {
      const response = await resource.load();
      setItems(response.data || []);
    } catch (err) {
      console.error(`Gagal mengambil ${resourceKey}:`, err);
      setError("Data tidak dapat dimuat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    setForm(emptyForms[resourceKey]);
    setEditing(null);
    setImageFiles([]);
    setFormOpen(false);
    loadItems();

    if (resourceKey === "furniture") {
      getCategories()
        .then((response) => setCategories(response.data || []))
        .catch(() => setCategories([]));
    }
  }, [resourceKey]);

  const updateField = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForms[resourceKey]);
    setFormError("");
    setImageFiles([]);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm(
      resourceKey === "blog"
        ? {
            title: item.title || "",
            body: item.body || "",
            status: item.status || "draft",
            cover_image: null,
          }
        : Object.keys(emptyForms[resourceKey]).reduce(
            (values, key) => ({ ...values, [key]: item[key] ?? values[key] }),
            emptyForms[resourceKey],
          ),
    );
    setFormError("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setEditing(null);
    setForm(emptyForms[resourceKey]);
    setFormError("");
    setImageFiles([]);
    setFormOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      let payload = { ...form };
      if (resourceKey === "blog") {
        const data = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== null && value !== "") data.append(key, value);
        });
        payload = data;
      }

      if (editing) await resource.update(editing.id, payload);
      const saved = editing
        ? { data: editing }
        : await resource.create(payload);
      const savedId = saved.data?.id || editing?.id;

      if (
        imageFiles.length > 0 &&
        savedId &&
        ["furniture", "portfolio"].includes(resourceKey)
      ) {
        const imageData = new FormData();
        imageFiles.forEach((file) => imageData.append("images[]", file));
        const upload =
          resourceKey === "furniture"
            ? uploadFurnitureImages
            : uploadPortfolioImages;
        await upload(savedId, imageData);
      }

      setForm(emptyForms[resourceKey]);
      setEditing(null);
      setImageFiles([]);
      setFormOpen(false);
      await loadItems();
    } catch (err) {
      const validationErrors = err.response?.data?.errors;
      setFormError(
        validationErrors
          ? Object.values(validationErrors).flat().join(" ")
          : err.response?.data?.message || "Data gagal disimpan.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus ${item.name || item.title || "data ini"}?`))
      return;

    try {
      await resource.remove(item.id);
      await loadItems();
    } catch (err) {
      setError(err.response?.data?.message || "Data gagal dihapus.");
    }
  };

  const renderFormFields = () => {
    if (resourceKey === "furniture") {
      return (
        <>
          <Field label="Nama furniture">
            <input
              className={inputClass}
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </Field>
          <Field label="Slug">
            <input
              className={inputClass}
              required
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="meja-kerja-premium"
            />
          </Field>
          <Field label="Kategori">
            <select
              className={inputClass}
              required
              value={form.category_id}
              onChange={(e) => updateField("category_id", e.target.value)}
            >
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Material">
            <input
              className={inputClass}
              required
              value={form.material}
              onChange={(e) => updateField("material", e.target.value)}
            />
          </Field>
          <Field label="Dimensi">
            <input
              className={inputClass}
              value={form.dimensions}
              onChange={(e) => updateField("dimensions", e.target.value)}
            />
          </Field>
          <Field label="Harga mulai">
            <input
              className={inputClass}
              required
              type="number"
              min="0"
              value={form.starting_price}
              onChange={(e) => updateField("starting_price", e.target.value)}
            />
          </Field>
          <Field label="Deskripsi">
            <textarea
              className={inputClass}
              rows="4"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Field>
          <Field label="Gambar">
            <input
              className={inputClass}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />
          </Field>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => updateField("is_featured", e.target.checked)}
            />{" "}
            Tampilkan sebagai unggulan
          </label>
        </>
      );
    }

    if (resourceKey === "portfolio") {
      return (
        <>
          <Field label="Judul proyek">
            <input
              className={inputClass}
              required
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </Field>
          <Field label="Slug">
            <input
              className={inputClass}
              required
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
            />
          </Field>
          <Field label="Kategori">
            <input
              className={inputClass}
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            />
          </Field>
          <Field label="Klien">
            <input
              className={inputClass}
              value={form.client_name}
              onChange={(e) => updateField("client_name", e.target.value)}
            />
          </Field>
          <Field label="Lokasi">
            <input
              className={inputClass}
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </Field>
          <Field label="Tahun">
            <input
              className={inputClass}
              type="number"
              value={form.year}
              onChange={(e) => updateField("year", e.target.value)}
            />
          </Field>
          <Field label="Deskripsi">
            <textarea
              className={inputClass}
              rows="4"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </Field>
          <Field label="Gambar proyek">
            <input
              className={inputClass}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />
          </Field>
        </>
      );
    }

    return (
      <>
        <Field label="Judul artikel">
          <input
            className={inputClass}
            required
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </Field>
        <Field label="Isi artikel">
          <textarea
            className={inputClass}
            required
            rows="8"
            value={form.body}
            onChange={(e) => updateField("body", e.target.value)}
          />
        </Field>
        <Field label="Status">
          <select
            className={inputClass}
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>
        <Field label="Cover image">
          <input
            className={inputClass}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) =>
              updateField("cover_image", e.target.files[0] || null)
            }
          />
        </Field>
      </>
    );
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Manajemen Konten
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {resource.title}
          </h2>
          <p className="mt-2 text-slate-500">{resource.description}</p>
        </div>
        {resourceKey !== "contacts" && (
          <button
            type="button"
            onClick={openCreate}
            className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950"
          >
            + Tambah {resource.title}
          </button>
        )}
      </div>

      {resourceKey !== "contacts" && formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {editing ? `Edit ${resource.title}` : `Tambah ${resource.title}`}
            </h3>
            {editing && (
              <button
                type="button"
                onClick={closeForm}
                className="text-sm font-semibold text-slate-500"
              >
                Batal
              </button>
            )}
          </div>
          <div className="grid gap-5 md:grid-cols-2">{renderFormFields()}</div>
          {formError && (
            <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {formError}
            </p>
          )}
          <button
            disabled={saving}
            className="mt-6 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-950 disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Simpan"}
          </button>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {loading && (
          <p className="p-8 text-center text-slate-500">Memuat data...</p>
        )}
        {!loading && error && (
          <p className="p-8 text-center text-red-600">{error}</p>
        )}
        {!loading && !error && items.length === 0 && (
          <p className="p-8 text-center text-slate-500">Belum ada data.</p>
        )}
        {!loading && !error && items.length > 0 && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    {resource.columns.map((column) => (
                      <th key={column} className="px-6 py-4 font-semibold">
                        {resource.labels[column]}
                      </th>
                    ))}
                    <th className="px-6 py-4 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      {resource.columns.map((column) => (
                        <td key={column} className="px-6 py-4 text-slate-700">
                          {formatValue(column, item[column])}
                        </td>
                      ))}
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              resourceKey === "contacts"
                                ? markContactAsRead(item.id).then(loadItems)
                                : openEdit(item)
                            }
                            className="font-semibold text-amber-600 hover:text-amber-700"
                          >
                            {resourceKey === "contacts"
                              ? "Tandai dibaca"
                              : "Edit"}
                          </button>
                          {resourceKey !== "contacts" && (
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              className="font-semibold text-red-600 hover:text-red-700"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-slate-100 md:hidden">
              {items.map((item) => (
                <article key={item.id} className="space-y-4 p-5">
                  <div>
                    <p className="text-base font-bold text-slate-900">
                      {item.name || item.title || `Data #${item.id}`}
                    </p>
                    {resourceKey === "contacts" && item.subject && (
                      <p className="mt-1 text-sm text-slate-500">
                        {item.subject}
                      </p>
                    )}
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    {resource.columns.slice(1).map((column) => (
                      <div key={column}>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {resource.labels[column]}
                        </dt>
                        <dd className="mt-1 wrap-break-word font-medium text-slate-700">
                          {formatValue(column, item[column])}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex gap-4 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        resourceKey === "contacts"
                          ? markContactAsRead(item.id).then(loadItems)
                          : openEdit(item)
                      }
                      className="min-h-10 font-semibold text-amber-600"
                    >
                      {resourceKey === "contacts" ? "Tandai dibaca" : "Edit"}
                    </button>
                    {resourceKey !== "contacts" && (
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="min-h-10 font-semibold text-red-600"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
