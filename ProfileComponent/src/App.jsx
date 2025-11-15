import { useState } from "react";
import { Calendar } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const webinars = [
    { time: "11:30 AM", status: "Live", title: "UX Webinar" },
    { time: "11:30 AM", status: "Upcoming", title: "My first Webinar" },
    { time: "11:30 AM", status: "Upcoming", title: "Important Webinar" },
    { time: "11:30 AM", status: "Upcoming", title: "Webinar 1" },
  ];

  const actions = ["Schedule a Webinar", "Join a Webinar", "Open Recordings"];

  function Card({ className = "", children, ...props }) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <button
        className="p-2 text-4xl mb-2 hover:bg-gray-200 rounded transition-colors flex items-start"
        onClick={() => {
          setSidebarOpen(!sidebarOpen);
        }}
      >
        ☰
      </button>
      <aside
        id="sidebar"
        className={`bg-white shadow-md border-b md:border-r md:border-b-0
        transition-all duration-300 flex flex-col
        ${sidebarOpen ? "w-full md:w-64" : "w-0 md:w-0 overflow-hidden"}`}
      >
        {/* Top Row with Logo */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b md:border-b-0">
          <h1 className="text-xl md:text-2xl font-semibold">Webiner.gg</h1>
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>

        {/* Navigation */}
        <nav
          id="sidebarLinks"
          className={`flex md:flex-col gap-4 text-sm md:text-base p-4 md:p-6 ${
            sidebarOpen ? "flex" : "hidden"
          }`}
        >
          <a
            className="text-blue-600 font-semibold hover:underline hover:decoration-2 hover:underline-offset-5"
            href="#"
          >
            Home
          </a>
          <a
            className="text-gray-700 hover:underline hover:decoration-2 hover:underline-offset-5"
            href="#"
          >
            Webinars
          </a>
          <a
            className="text-gray-700 hover:underline hover:decoration-2 hover:underline-offset-5"
            href="#"
          >
            Billing
          </a>
          <a
            className="text-gray-700 hover:underline hover:decoration-2 hover:underline-offset-5"
            href="#"
          >
            User
          </a>
          <a
            className="text-gray-700 hover:underline hover:decoration-2 hover:underline-offset-5"
            href="#"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 mr-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-3xl font-bold">
              Good morning, Vedansh!
            </h2>
          </div>
          <div className="flex justify-center items-center gap-4">
            <p className="font-mono font-semibold">Hello, Vedansh</p>
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Profile + Content Section */}
        <div className="transition-transform grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <div className="md:text-left">
              <h3 className="text-lg font-semibold">Vedansh Sharma</h3>
              <p className="text-gray-600">Vedansh@gmail.com</p>
              <p className="text-gray-600">9876987621</p>
              <p className="text-gray-600">Surat, India</p>
            </div>
          </Card>

          {/* Webinar Schedule */}
          <Card className="p-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5" />
              <h3 className="font-bold">Monday, 14 October 2024</h3>
            </div>

            <div className="grid grid-cols-1  gap-4">
              {/* 'grid gap-4' could also be used */}
              {webinars.map((w, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{w.time}</p>
                    <p
                      className={`${
                        w.status === "Live" ? "text-red-500" : "text-blue-500"
                      } text-sm`}
                    >
                      {w.status}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">{w.title}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        {/*  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <Card className="p-6 text-center hover:shadow-lg cursor-pointer">
            <p className="font-semibold">Schedule a Webinar</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg cursor-pointer">
            <p className="font-semibold">Join a Webinar</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg cursor-pointer">
            <p className="font-semibold">Open Recordings</p>
          </Card>
        </div>
        */}

        <Card className="mt-4 p-4 hover:shadow-xl">
          <h3 className="font-bold text-l">Other tasks...</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2">
            {actions.map((label, i) => (
              <Card
                key={i}
                className="p-6 text-center hover:shadow-lg cursor-pointer"
              >
                <p className="font-semibold">{label}</p>
              </Card>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
