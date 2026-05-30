import React from "react";
// import { Link, usePage } from "@inertiajs/react";
import { Home, Upload, Activity, Radio, Info, CheckCircle, TrendingUp, Thermometer, Droplets, Clock, Download } from "lucide-react";

export default function Result(){
    return(
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Hasil Analisis
              </h2>

              <div className="space-y-6">
                {/* Gambar yang Dianalisis */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-100 p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-800">Gambar yang Dianalisis</h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-gray-500">[Gambar Maggot yang Diunggah]</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Waktu Upload:</span>
                        <span className="font-medium text-gray-800">19 Desember 2024, 14:35:22 WIB</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* A. Hasil Analisis Machine Learning */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 border-b border-green-700">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle size={20} />
                      Hasil Analisis Machine Learning
                    </h3>
                    <p className="text-green-50 text-sm mt-1">Klasifikasi berbasis Computer Vision (CNN)</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Status Kondisi */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle size={28} className="text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Status Kondisi Maggot</h4>
                            <p className="text-2xl font-bold text-green-700">Normal</p>
                            <p className="text-xs text-gray-600 mt-1">Kondisi visual sesuai standar fase larva</p>
                          </div>
                        </div>
                      </div>

                      {/* Confidence Score */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 p-2 rounded-lg mt-1">
                            <TrendingUp size={20} className="text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Tingkat Kepercayaan Model</h4>
                            <p className="text-2xl font-bold text-blue-700">92.3%</p>
                            <p className="text-xs text-gray-600 mt-1">Confidence score klasifikasi CNN</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detail Klasifikasi */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Detail Klasifikasi</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fase Pertumbuhan:</span>
                          <span className="font-medium text-gray-800">Larva</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model yang Digunakan:</span>
                          <span className="font-medium text-gray-800">CNN MobileNetV2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Durasi Inferensi:</span>
                          <span className="font-medium text-gray-800">2.3 detik</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* B. Data Sensor Lingkungan (Konteks Pendukung) */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 border-b border-blue-700">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Activity size={20} />
                      Data Lingkungan Saat Analisis
                    </h3>
                    <p className="text-blue-50 text-sm mt-1">Data sensor WSN sebagai konteks pendukung interpretasi</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Suhu */}
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-red-500 p-2 rounded-lg">
                            <Thermometer size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 uppercase font-medium">Suhu Lingkungan</p>
                            <p className="text-2xl font-bold text-gray-800">28.5°C</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">Rentang optimal: 27-30°C</p>
                      </div>

                      {/* Kelembapan */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-blue-500 p-2 rounded-lg">
                            <Droplets size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 uppercase font-medium">Kelembapan</p>
                            <p className="text-2xl font-bold text-gray-800">72%</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">Rentang optimal: 60-80%</p>
                      </div>
                    </div>

                    {/* Informasi Tambahan */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Info size={16} />
                        Informasi Sensor
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sumber Data:</span>
                          <span className="font-medium text-gray-800">Kolam 1 - Node WSN-01</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Waktu Pengukuran:</span>
                          <span className="font-medium text-gray-800">14:35:15 WIB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Selisih dengan Upload:</span>
                          <span className="font-medium text-gray-800">7 detik</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* C. Insight & Interpretasi Sistem */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 p-2 rounded-lg mt-1">
                      <CheckCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Interpretasi Hasil Analisis</h3>
                      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                        <p>
                          <strong>Kondisi maggot terdeteksi NORMAL</strong> dengan tingkat kepercayaan model sebesar 92.3%.
                          Karakteristik visual maggot sesuai dengan standar fase larva yang sehat.
                        </p>
                        <p>
                          Berdasarkan data lingkungan yang tercatat saat analisis, kondisi budidaya menunjukkan parameter
                          yang mendukung: <strong>suhu 28.5°C</strong> (dalam rentang optimal 27-30°C) dan
                          <strong> kelembapan 72%</strong> (dalam rentang optimal 60-80%).
                        </p>
                        <p className="text-green-700 font-medium">
                          ✓ Kesimpulan: Kondisi visual maggot dan parameter lingkungan menunjukkan keadaan yang sesuai
                          untuk pertumbuhan optimal maggot BSF fase larva.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Catatan Penting */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-2">Catatan Penting tentang Hasil Analisis</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Hasil analisis machine learning didasarkan pada klasifikasi gambar menggunakan model CNN</li>
                        <li>Data sensor lingkungan ditampilkan sebagai <strong>konteks pendukung</strong>, bukan sebagai input model ML</li>
                        <li>Interpretasi menggabungkan hasil ML dengan kondisi lingkungan untuk memberikan insight yang lebih lengkap</li>
                        <li>Sistem ini merupakan alat bantu evaluasi dan tidak menggantikan observasi langsung oleh praktisi</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-200 flex flex-col gap-3">
                  <button
                    onClick={() => setShowReport(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download size={20} />
                    Download Laporan Hasil Analisis
                  </button>
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setCurrentPage('upload');
                    }}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Analisis Gambar Lain
                  </button>
                </div>
              </div>
            </div>
    )
}
