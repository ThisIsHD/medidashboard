"use client";

import { useState } from "react";

interface Encounter {
  id: number;
  date: string;
  notes: string;
  vitals: {
    temperature: string;
    bloodPressure: string;
    heartRate: string;
  };
  labs: string;
  medications: string;
  diagnoses: string;
  procedures: string;
}

export default function ClinicalDashboard() {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    notes: "",
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    labs: "",
    medications: "",
    diagnoses: "",
    procedures: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () =>
    setFormData({
      date: "",
      notes: "",
      temperature: "",
      bloodPressure: "",
      heartRate: "",
      labs: "",
      medications: "",
      diagnoses: "",
      procedures: "",
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEncounter: Encounter = {
      id: editId ?? encounters.length + 1,
      date: formData.date,
      notes: formData.notes,
      vitals: {
        temperature: formData.temperature,
        bloodPressure: formData.bloodPressure,
        heartRate: formData.heartRate,
      },
      labs: formData.labs,
      medications: formData.medications,
      diagnoses: formData.diagnoses,
      procedures: formData.procedures,
    };

    if (editId !== null) {
      setEncounters((prev) =>
        prev.map((e) => (e.id === editId ? newEncounter : e))
      );
      setEditId(null);
    } else {
      setEncounters((prev) => [...prev, newEncounter]);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (enc: Encounter) => {
    setFormData({
      date: enc.date,
      notes: enc.notes,
      temperature: enc.vitals.temperature,
      bloodPressure: enc.vitals.bloodPressure,
      heartRate: enc.vitals.heartRate,
      labs: enc.labs,
      medications: enc.medications,
      diagnoses: enc.diagnoses,
      procedures: enc.procedures,
    });
    setEditId(enc.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setEncounters((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      {/* Header with Add Button */}
      <header className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Clinical Operations Dashboard
          </h1>
          <p className="text-gray-600">
            Track encounters, vitals, labs, medications, and more.
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
          + Add Encounter
        </button>
      </header>

      {/* Encounter History Table */}
      <section className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-green-700">
          Patient History & Previous Encounters
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Notes</th>
                <th className="p-3">Vitals</th>
                <th className="p-3">Labs / Diagnostics</th>
                <th className="p-3">Medications</th>
                <th className="p-3">Diagnoses</th>
                <th className="p-3">Procedures</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {encounters.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-3">{e.date}</td>
                  <td className="p-3">{e.notes}</td>
                  <td className="p-3">
                    Temp: {e.vitals.temperature}
                    <br />
                    BP: {e.vitals.bloodPressure}
                    <br />
                    HR: {e.vitals.heartRate}
                  </td>
                  <td className="p-3">{e.labs}</td>
                  <td className="p-3">{e.medications}</td>
                  <td className="p-3">{e.diagnoses}</td>
                  <td className="p-3">{e.procedures}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(e)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {encounters.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-3 text-center text-gray-500">
                    No encounters recorded.
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
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-semibold text-green-700">
                {editId !== null ? "Update Encounter" : "Add New Encounter"}
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
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded border p-3"
              />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Clinical notes"
                className="w-full rounded border p-3"
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  type="text"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Temperature (°C/°F)"
                  className="rounded border p-3"
                />
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="Blood Pressure (e.g. 120/80)"
                  className="rounded border p-3"
                />
                <input
                  type="text"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleChange}
                  placeholder="Heart Rate (bpm)"
                  className="rounded border p-3"
                />
              </div>
              <textarea
                name="labs"
                value={formData.labs}
                onChange={handleChange}
                placeholder="Lab results / Diagnostic reports"
                className="w-full rounded border p-3"
              />
              <textarea
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                placeholder="Current medications"
                className="w-full rounded border p-3"
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <textarea
                  name="diagnoses"
                  value={formData.diagnoses}
                  onChange={handleChange}
                  placeholder="Diagnoses codes / details"
                  className="rounded border p-3"
                />
                <textarea
                  name="procedures"
                  value={formData.procedures}
                  onChange={handleChange}
                  placeholder="Procedure codes / details"
                  className="rounded border p-3"
                />
              </div>

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
                  {editId !== null ? "Save Changes" : "Add Encounter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
