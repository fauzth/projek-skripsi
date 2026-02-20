import React from "react";
import Navbar from "@/Components/Navbar";
// import Footer from "@/Components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-6xl mx-auto px-6 py-8">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
