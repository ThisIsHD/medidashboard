"use client"; // Mark this component as a Client Component

import { useState } from "react";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  condition: string;
}

const ManagePatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
  });
  const [editPatientId, setEditPatientId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editPatientId !== null) {
      // Edit existing patient
      const updatedPatients = patients.map((patient) =>
        patient.id === editPatientId ? { ...patient, ...formData, age: Number(formData.age) } : patient
      );
      setPatients(updatedPatients);
      setEditPatientId(null);
    } else {
      // Add new patient
      const newPatient = {
        id: patients.length + 1,
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender,
        condition: formData.condition,
      };
      setPatients([...patients, newPatient]);
    }

    // Clear the form
    setFormData({ name: "", age: "", gender: "", condition: "" });
  };

  const handleEdit = (patient: Patient) => {
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      gender: patient.gender,
      condition: patient.condition,
    });
    setEditPatientId(patient.id);
  };

  const handleDelete = (id: number) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-50"
      style={{
        backgroundImage: "url('/assets/images/hospital-bg.jpg')",
      }}
    >
      <div className="min-h-screen bg-black bg-opacity-70">
        {/* Header Section */}
        <header className="py-12 text-center">
          <h1 className="text-5xl font-bold text-green-400">
            Manage Patients
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Securely add, edit, and manage patient records with ease.
          </p>
        </header>

        {/* Patient Form Section */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
                {editPatientId !== null ? "Edit Patient" : "Add New Patient"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-200 mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter patient's name"
                    required
                  />
                </div>

                {/* Age Field */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-200 mb-2"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter patient's age"
                    required
                  />
                </div>

                {/* Gender Field */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-200 mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Condition Field */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-200 mb-2"
                    htmlFor="condition"
                  >
                    Condition
                  </label>
                  <input
                    type="text"
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter patient's condition"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {editPatientId !== null ? "Update Patient" : "Add Patient"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Patient List Section */}
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
                Patient Records
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-gray-200">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="p-3">Name</th>
                      <th className="p-3">Age</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">Condition</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-700">
                        <td className="p-3">{patient.name}</td>
                        <td className="p-3">{patient.age}</td>
                        <td className="p-3">{patient.gender}</td>
                        <td className="p-3">{patient.condition}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleEdit(patient)}
                            className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition duration-200 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(patient.id)}
                            className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManagePatients;