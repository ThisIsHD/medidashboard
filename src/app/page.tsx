import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-50"
      style={{ backgroundImage: "url('/assets/images/hospital-bg.jpg')" }}

    >
      {/* Overlay for Full Page */}
      <div className="min-h-screen bg-black bg-opacity-70">
        {/* Header Section */}
        <header className="py-12 text-center">
          <h1 className="text-5xl font-bold text-green-400">
            Welcome to{" "}
            <span className="text-gray-50">MedAssist</span>
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            Effortlessly manage patient records, appointments, and notifications.
          </p>
          <div className="mt-8">
            <a
              href="#signup-section" // Anchor link to scroll to the signup section
              className="inline-block bg-green-600 text-black py-3 px-6 rounded-lg hover:bg-green-400 hover:text-gray-800 transition duration-200"
            >
              Get Started
            </a>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center text-green-400">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {/* Feature 1: Manage Patients */}
              <Link href="/manage-patients">
              <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
                <Image
                  src="/assets/icons/patient.png"
                  alt="Manage Patients"
                  width={50}
                  height={50}
                  className="mb-4"
                />
                <h3 className="text-2xl font-semibold text-green-400">
                  Manage Patients
                </h3>
                <p className="mt-4 text-gray-300">
                  Securely add, edit, and manage patient records with ease.
                </p>
              </div>
              </Link>

              {/* Feature 2: Schedule Appointments */}
              <Link href="/schedule-appointment">
                <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
                  <Image
                    src="/assets/icons/icons8-doctor-appointment-68.png"
                    alt="Schedule Appointments"
                    width={50}
                    height={50}
                    className="mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-green-400">
                    Schedule Appointments
                  </h3>
                  <p className="mt-4 text-gray-300">
                    Organize and track appointments seamlessly.
                  </p>
                </div>
              </Link>

              {/* Feature 3: Notifications */}
              <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
                <Image
                  src="/assets/icons/notification-bell.png"
                  alt="Notifications"
                  width={50}
                  height={50}
                  className="mb-4"
                />
                <h3 className="text-2xl font-semibold text-green-400">
                  Notifications
                </h3>
                <p className="mt-4 text-gray-300">
                  Notify patients with reminders via SMS or email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Signup Section */}
        <section id="signup-section" className="py-16 text-center">
          <h2 className="text-4xl font-bold text-gray-50">
            Ready to Transform Patient Management?
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Join us and streamline your workflows today.
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-block bg-green-600 text-black py-3 px-6 rounded-lg hover:bg-green-400 hover:text-gray-800 transition duration-200"
            >
              Sign Up Now
            </Link>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-black bg-opacity-90 py-8">
          <div className="container mx-auto text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Patient Management System. All Rights
              Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;