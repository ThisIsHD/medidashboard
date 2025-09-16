"use client";

import { useState } from "react";

interface BillingRecord {
  id: number;
  patient: string;
  insuranceStatus: string;
  balance: number;
  payments: string;
  billingCodes: string;
  feeSchedule: string;
}

export default function BillingDashboard() {
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [formData, setFormData] = useState({
    patient: "",
    insuranceStatus: "",
    balance: "",
    payments: "",
    billingCodes: "",
    feeSchedule: "",
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
      patient: "",
      insuranceStatus: "",
      balance: "",
      payments: "",
      billingCodes: "",
      feeSchedule: "",
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: BillingRecord = {
      id: editId ?? records.length + 1,
      patient: formData.patient,
      insuranceStatus: formData.insuranceStatus,
      balance: Number(formData.balance),
      payments: formData.payments,
      billingCodes: formData.billingCodes,
      feeSchedule: formData.feeSchedule,
    };

    if (editId !== null) {
      setRecords((prev) =>
        prev.map((r) => (r.id === editId ? newRecord : r))
      );
      setEditId(null);
    } else {
      setRecords((prev) => [...prev, newRecord]);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (rec: BillingRecord) => {
    setFormData({
      patient: rec.patient,
      insuranceStatus: rec.insuranceStatus,
      balance: rec.balance.toString(),
      payments: rec.payments,
      billingCodes: rec.billingCodes,
      feeSchedule: rec.feeSchedule,
    });
    setEditId(rec.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const totalBalance = records.reduce((sum, r) => sum + r.balance, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      {/* Header */}
      <header className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Billing & Administrative Dashboard
          </h1>
          <p className="text-gray-600">
            Manage insurance eligibility, patient balances, and billing codes.
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
          + Add Record
        </button>
      </header>

      {/* Simple Analytics */}
      <section className="mx-auto mb-6 max-w-3xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-green-700">
          Financial Snapshot
        </h2>
        <div className="flex justify-around text-lg font-medium text-gray-700">
          <div>Total Patients: {records.length}</div>
          <div>Total Balance Due: ${totalBalance.toFixed(2)}</div>
        </div>
      </section>

      {/* Records Table */}
      <section className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold text-green-700">
          Patient Billing Records
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Insurance</th>
                <th className="p-3">Balance ($)</th>
                <th className="p-3">Payments</th>
                <th className="p-3">Billing Codes</th>
                <th className="p-3">Fee Schedule</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3">{r.patient}</td>
                  <td className="p-3">{r.insuranceStatus}</td>
                  <td className="p-3">${r.balance.toFixed(2)}</td>
                  <td className="p-3">{r.payments}</td>
                  <td className="p-3">{r.billingCodes}</td>
                  <td className="p-3">{r.feeSchedule}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-3 text-center text-gray-500">
                    No billing records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-semibold text-green-700">
                {editId !== null ? "Edit Billing Record" : "Add Billing Record"}
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
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                placeholder="Patient name or ID"
                required
                className="w-full rounded border p-3"
              />
              <input
                type="text"
                name="insuranceStatus"
                value={formData.insuranceStatus}
                onChange={handleChange}
                placeholder="Insurance eligibility / coverage"
                className="w-full rounded border p-3"
              />
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                placeholder="Patient balance ($)"
                className="w-full rounded border p-3"
              />
              <textarea
                name="payments"
                value={formData.payments}
                onChange={handleChange}
                placeholder="Payment history"
                className="w-full rounded border p-3"
              />
              <textarea
                name="billingCodes"
                value={formData.billingCodes}
                onChange={handleChange}
                placeholder="Billing codes"
                className="w-full rounded border p-3"
              />
              <textarea
                name="feeSchedule"
                value={formData.feeSchedule}
                onChange={handleChange}
                placeholder="Fee schedule details"
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
                  {editId !== null ? "Save Changes" : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
