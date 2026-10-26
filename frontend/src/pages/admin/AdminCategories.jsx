import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/categoryService";

const blankForm = { name: "", description: "" };
const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";
const apiErrorMessage =
  "API tidak dapat dihubungi. Pastikan Laravel aktif dan VITE_API_URL di frontend/.env benar.";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || []);
      setError("");
    } catch (err) {
      setError(
        !err.response
          ? apiErrorMessage
          : err.response.data?.message || "Kategori tidak dapat dimuat.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setForm(blankForm);
    setEditing(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editing) {
        await updateCategory(editing.id, form);
      } else {
        await createCategory(form);
      }
      resetForm();
      await loadCategories();
    } catch (err) {
      const validationErrors = err.response?.data?.errors;
      setError(
        !err.response
          ? apiErrorMessage
          : validationErrors
            ? Object.values(validationErrors).flat().join(" ")
            : err.response.data?.message || "Kategori gagal disimpan.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Hapus kategori "${category.name}"?`)) return;

    try {
      await deleteCategory(category.id);
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Kategori gagal dihapus.");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
          Katalog
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Kategori</h2>
        <p className="mt-2 text-slate-500">
          Kelola kategori yang tersedia untuk produk furniture.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="font-bold text-slate-900">Daftar kategori</h3>
          </div>
          {loading ? (
            <p className="px-5 py-8 text-sm text-slate-500">
              Memuat kategori...
            </p>
          ) : categories.length === 0 ? (
            <p className="px-5 py-8 text-sm text-slate-500">
              Belum ada kategori. Tambahkan kategori melalui formulir.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">
                      {category.name}
                    </p>
                    {category.description && (
                      <p className="mt-1 text-sm text-slate-500">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-4 text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(category);
                        setForm({
                          name: category.name || "",
                          description: category.description || "",
                        });
                        setError("");
                      }}
                      className="text-slate-700 hover:text-amber-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
        >
          <h3 className="mb-5 font-bold text-slate-900">
            {editing ? "Edit kategori" : "Tambah kategori"}
          </h3>
          <label className="mb-4 block">
            <span className="text-sm font-semibold text-slate-700">
              Nama kategori
            </span>
            <input
              className={`${inputClass} mt-2`}
              required
              maxLength={100}
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
            />
          </label>
          <label className="mb-5 block">
            <span className="text-sm font-semibold text-slate-700">
              Deskripsi
            </span>
            <textarea
              className={`${inputClass} mt-2`}
              rows="3"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </label>
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-950 disabled:opacity-60"
            >
              {saving
                ? "Menyimpan..."
                : editing
                  ? "Simpan perubahan"
                  : "Tambah kategori"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
