"use client"; // Mark this component as a Client Component

import { useState } from "react";
import Link from "next/link";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

const ScheduleAppointment: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean>(false);

  const doctors: Doctor[] = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Dermatologist" },
    { id: 3, name: "Dr. Emily Johnson", specialty: "Pediatrician" },
  ];

  const timeSlots: string[] = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppointmentConfirmed(true);
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
            Schedule an Appointment
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Organize and track appointments seamlessly.
          </p>
        </header>

        {/* Appointment Form Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-green-400 mb-6">
                Book Your Appointment
              </h2>
              {appointmentConfirmed ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-400">
                    Appointment Confirmed!
                  </h3>
                  <p className="mt-4 text-gray-300">
                    Your appointment with {selectedDoctor} on {selectedDate} at{" "}
                    {selectedTime} has been confirmed.
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-green-600 text-black py-3 px-6 rounded-lg hover:bg-green-400 hover:text-gray-800 transition duration-200 mt-8"
                  >
                    Return to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Doctor Selection */}
                  <div className="mb-6">
                    <label
                      className="block text-gray-300 text-sm font-bold mb-2"
                      htmlFor="doctor"
                    >
                      Select Doctor
                    </label>
                    <select
                      id="doctor"
                      className="w-full p-3 rounded-lg bg-gray-700 text-gray-300"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      required
                    >
                      <option value="">Choose a doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.name}>
                          {doctor.name} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-6">
                    <label
                      className="block text-gray-300 text-sm font-bold mb-2"
                      htmlFor="date"
                    >
                      Select Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full p-3 rounded-lg bg-gray-700 text-gray-300"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Time Selection */}
                  <div className="mb-6">
                    <label
                      className="block text-gray-300 text-sm font-bold mb-2"
                      htmlFor="time"
                    >
                      Select Time
                    </label>
                    <select
                      id="time"
                      className="w-full p-3 rounded-lg bg-gray-700 text-gray-300"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                    >
                      <option value="">Choose a time slot</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-black py-3 px-6 rounded-lg hover:bg-green-400 hover:text-gray-800 transition duration-200"
                  >
                    Confirm Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScheduleAppointment;