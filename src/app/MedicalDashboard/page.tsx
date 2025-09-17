"use client";

import { useState, useEffect } from "react";

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  condition: string;
}

export default function MedicalDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    async function loadPatients() {
      try {
        const res = await fetch(
          "https://8667c817-0619-4f3d-86d9-1e52e39e61e6.mock.pstmn.io/patients"
        );
        if (!res.ok) throw new Error("Failed to fetch patients");
        const data = await res.json();
        setPatients(data.patients);
      } catch (err) {
        console.error("Error loading patients:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () =>
    setFormData({ name: "", age: "", gender: "", condition: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === editId ? { ...p, ...formData, age: Number(formData.age) } : p
        )
      );
      setEditId(null);
    } else {
      setPatients((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: formData.name,
          age: Number(formData.age),
          gender: formData.gender,
          condition: formData.condition,
        },
      ]);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (p: Patient) => {
    setFormData({
      name: p.name,
      age: p.age.toString(),
      gender: p.gender,
      condition: p.condition,
    });
    setEditId(p.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 text-gray-800">
        <p>Loading patient records…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      {/* Header with Add Button */}
      <header className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Medical Patient Dashboard
          </h1>
          <p className="text-gray-600">
            View, add, and manage patient records (fetched from Postman mock API).
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="rounded bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
        >
          + Add Patient
        </button>
      </header>

      {/* Patient Table */}
      <section className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold text-green-700">
          Patient Records
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Condition</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.age}</td>
                  <td className="p-3">{p.gender}</td>
                  <td className="p-3">{p.condition}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No patient records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-semibold text-green-700">
                {editId !== null ? "Edit Patient" : "Add Patient"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full rounded border p-3"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
                className="w-full rounded border p-3"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full rounded border p-3"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="Condition / Allergies"
                required
                className="w-full rounded border p-3"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded bg-gray-300 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  {editId !== null ? "Save Changes" : "Add Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
