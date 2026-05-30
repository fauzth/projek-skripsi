import MainLayout from '@/Layouts/MainLayout'
import React from "react";
import { Info } from "lucide-react";

export default function Tentang() {
  return (
    <MainLayout>
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Tentang Sistem
      </h2>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Tujuan Pengembangan
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Sistem ini dikembangkan sebagai alat bantu penelitian untuk menganalisis kesesuaian
            kondisi maggot Black Soldier Fly (BSF) berdasarkan gambar. Sistem ini dirancang untuk
            membantu pelaku budidaya maggot dan peneliti dalam mengevaluasi kondisi maggot secara
            objektif menggunakan teknologi machine learning.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Teknologi yang Digunakan
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span><strong>Machine Learning:</strong> Menggunakan model deep learning untuk klasifikasi kondisi maggot</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span><strong>Cloud Computing:</strong> Sistem berbasis cloud untuk kemudahan akses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span><strong>Image Processing:</strong> Pemrosesan gambar untuk ekstraksi fitur visual</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info size={24} className="text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Catatan Penting</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Sistem ini merupakan alat bantu penelitian dan dikembangkan untuk keperluan akademik.
                Hasil analisis sebaiknya dikombinasikan dengan pengamatan manual dan pengetahuan
                praktis dalam budidaya maggot BSF untuk mendapatkan evaluasi yang komprehensif.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Ruang Lingkup
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Sistem ini fokus pada analisis kondisi visual maggot BSF untuk menentukan kesesuaian
            kondisi berdasarkan fase pertumbuhan. Sistem tidak menggantikan observasi langsung dan
            pemeriksaan fisik secara menyeluruh yang dilakukan oleh praktisi budidaya.
          </p>
        </div>
      </div>
    </div>
    </MainLayout>
  )
}
