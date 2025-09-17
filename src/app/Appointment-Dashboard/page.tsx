"use client";

import { useState } from "react";

interface Appointment {
  id: number;
  date: string;
  time: string;
  patient: string;
  provider: string;
  reason: string;
}

export default function AppointmentDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    patient: "",
    provider: "",
    reason: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [filterDate, setFilterDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const hasConflict = (dateTime: string, provider: string, ignoreId?: number) =>
    appointments.some(
      (a) =>
        a.provider === provider &&
        `${a.date}T${a.time}` === dateTime &&
        (ignoreId === undefined || a.id !== ignoreId)
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateTime = `${formData.date}T${formData.time}`;

    if (hasConflict(dateTime, formData.provider, editId ?? undefined)) {
      alert("Conflict: Provider already has an appointment at this time.");
      return;
    }

    if (editId !== null) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editId
            ? { ...a, ...formData }
            : a
        )
      );
      setEditId(null);
    } else {
      setAppointments((prev) => [
        ...prev,
        { id: prev.length + 1, ...formData },
      ]);
    }

    setFormData({ date: "", time: "", patient: "", provider: "", reason: "" });
    setIsModalOpen(false);
  };

  const handleEdit = (a: Appointment) => {
    setFormData(a);
    setEditId(a.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const visibleAppointments = filterDate
    ? appointments.filter((a) => a.date === filterDate)
    : appointments;

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      {/* Header with Add Button */}
      <header className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Appointment Scheduling Dashboard
          </h1>
          <p className="text-gray-600">
            View, book, reschedule, or cancel appointments with conflict checks.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({ date: "", time: "", patient: "", provider: "", reason: "" });
            setEditId(null);
            setIsModalOpen(true);
          }}
          className="rounded bg-green-600 px-5 py-2 font-medium text-white hover:bg-green-700"
        >
          + Add Appointment
        </button>
      </header>

      {/* Filter + Table Section */}
      <section className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow mb-10">
        <div className="mb-4 flex items-center gap-4">
          <label className="font-medium">Filter by Date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="rounded border p-2"
          />
          <button
            onClick={() => setFilterDate("")}
            className="rounded bg-gray-300 px-3 py-1 text-sm"
          >
            Clear
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3">Date / Time</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleAppointments.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3">{`${a.date} ${a.time}`}</td>
                  <td className="p-3">{a.patient}</td>
                  <td className="p-3">{a.provider}</td>
                  <td className="p-3">{a.reason}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {visibleAppointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No appointments scheduled.
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
                {editId !== null ? "Update Appointment" : "Book New Appointment"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="flex-1 rounded border p-3"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="flex-1 rounded border p-3"
                />
              </div>
              <input
                type="text"
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                placeholder="Patient name"
                required
                className="w-full rounded border p-3"
              />
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                placeholder="Provider name"
                required
                className="w-full rounded border p-3"
              />
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason / Notes"
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
                  {editId !== null ? "Save Changes" : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
