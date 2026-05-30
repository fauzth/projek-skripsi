import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { Image } from "lucide-react";

export default function Dashboard() {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Selamat Datang di Sistem Analisis Maggot BSF
                    </h2>

                    <p className="text-center text-gray-600 mb-10">
                        Sistem ini menganalisis kondisi maggot Black Soldier Fly
                        berbasis gambar
                    </p>

                    <div className="bg-white rounded-lg shadow p-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <Image size={32} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Mulai Analisis
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Unggah gambar maggot untuk mendapatkan hasil
                            analisis otomatis
                        </p>

                        <Link
                            href="/upload"
                            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                        >
                            Unggah Gambar Maggot →
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
