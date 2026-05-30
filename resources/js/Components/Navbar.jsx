import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Home, Upload, Activity, Radio, Info } from "lucide-react";

export default function Navbar() {
  const { url } = usePage();

  const menu = [
    { href: "/dashboard", label: "Beranda", icon: Home },
    { href: "/upload", label: "Unggah Gambar", icon: Upload },
    { href: "/kolam", label: "Monitoring Kolam", icon: Activity },
    { href: "/jaringan", label: "Monitoring Jaringan", icon: Radio },
    { href: "/about", label: "Tentang Sistem", icon: Info },
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">

        <h1 className="text-2xl font-semibold text-gray-800">
          Sistem Analisis Kondisi Maggot BSF
        </h1>

        <nav className="flex gap-6 mt-4">
          {menu.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 pb-2 ${
                url === href
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
