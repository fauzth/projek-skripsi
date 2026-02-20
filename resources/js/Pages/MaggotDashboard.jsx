import React, { useState } from 'react';
import { Upload, Image, Home, Info, ArrowRight, CheckCircle, AlertCircle, Download, Activity, Droplets, Thermometer, RefreshCw, Clock, Wifi, Radio, TrendingUp, AlertTriangle } from 'lucide-react';

const MaggotDashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const Header = () => (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Sistem Analisis Kondisi Maggot BSF
        </h1>
        <nav className="flex gap-6 mt-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex items-center gap-2 pb-2 transition-colors ${
              currentPage === 'home'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Home size={18} />
            Beranda
          </button>
          <button
            onClick={() => setCurrentPage('upload')}
            className={`flex items-center gap-2 pb-2 transition-colors ${
              currentPage === 'upload'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Upload size={18} />
            Unggah Gambar
          </button>
          <button
            onClick={() => setCurrentPage('monitoring')}
            className={`flex items-center gap-2 pb-2 transition-colors ${
              currentPage === 'monitoring'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Activity size={18} />
            Monitoring Kolam
          </button>
          <button
            onClick={() => setCurrentPage('network')}
            className={`flex items-center gap-2 pb-2 transition-colors ${
              currentPage === 'network'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Radio size={18} />
            Monitoring Jaringan
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className={`flex items-center gap-2 pb-2 transition-colors ${
              currentPage === 'about'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Info size={18} />
            Tentang Sistem
          </button>
        </nav>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
        <p>Sistem Penelitian - Analisis Kondisi Maggot Black Soldier Fly</p>
        <p className="mt-1">Dikembangkan untuk keperluan penelitian akademik</p>
      </div>
    </footer>
  );

  const HomePage = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Selamat Datang di Sistem Analisis Maggot BSF
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
          Sistem ini merupakan alat bantu penelitian yang menggunakan teknologi machine learning
          untuk menganalisis kesesuaian kondisi maggot Black Soldier Fly berdasarkan gambar yang diunggah.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Image size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            Mulai Analisis
          </h3>
          <p className="text-gray-600">
            Unggah gambar maggot untuk mendapatkan hasil analisis kondisi secara otomatis
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setCurrentPage('upload')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            Unggah Gambar Maggot
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Mudah Digunakan</h4>
          <p className="text-sm text-gray-600">
            Cukup unggah gambar dan sistem akan menganalisis secara otomatis
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Berbasis ML</h4>
          <p className="text-sm text-gray-600">
            Menggunakan teknologi machine learning untuk analisis akurat
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">Hasil Cepat</h4>
          <p className="text-sm text-gray-600">
            Dapatkan hasil analisis dalam hitungan detik
          </p>
        </div>
      </div>
    </div>
  );

  const UploadPage = () => (
    <div className="max-w-3xl  px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Unggah Gambar Maggot
      </h2>
      <p className="text-gray-600 mb-8">
        Unggah gambar maggot yang akan dianalisis kondisinya
      </p>

      <div className="bg-white rounded-lg border-2 border-dashed border-gray-300  text-center hover:border-green-400 transition-colors cursor-pointer">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Upload size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Seret dan lepas gambar di sini
        </h3>
        <p className="text-gray-600 mb-4">atau</p>
        <button
          onClick={() => setUploadedImage('dummy')}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Pilih File
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Format: JPG, PNG (Maksimal 5MB)
        </p>
      </div>

      {uploadedImage && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-gray-700">Gambar berhasil diunggah</span>
          </div>
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-500">[Preview Gambar Maggot]</span>
          </div>
          <button
            onClick={() => setCurrentPage('result')}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Analisis Gambar
          </button>
        </div>
      )}
    </div>
  );

  const ResultPage = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
  );

  const MonitoringPage = () => {
    // Dummy data untuk 6 kolam
    const poolsData = [
      { id: 1, name: 'Kolam 1', temp: 28.5, humidity: 72, lastUpdate: '14:45:32', status: 'active' },
      { id: 2, name: 'Kolam 2', temp: 29.1, humidity: 68, lastUpdate: '14:45:28', status: 'active' },
      { id: 3, name: 'Kolam 3', temp: 27.8, humidity: 75, lastUpdate: '14:45:35', status: 'active' },
      { id: 4, name: 'Kolam 4', temp: 28.9, humidity: 70, lastUpdate: '14:45:30', status: 'active' },
      { id: 5, name: 'Kolam 5', temp: 28.3, humidity: 73, lastUpdate: '14:45:33', status: 'active' },
      { id: 6, name: 'Kolam 6', temp: 29.4, humidity: 67, lastUpdate: '14:45:29', status: 'active' },
    ];

    const avgTemp = (poolsData.reduce((sum, pool) => sum + pool.temp, 0) / poolsData.length).toFixed(1);
    const avgHumidity = (poolsData.reduce((sum, pool) => sum + pool.humidity, 0) / poolsData.length).toFixed(1);

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Monitoring Kondisi Kolam Maggot
          </h2>
          <p className="text-gray-600">Data lingkungan berbasis Wireless Sensor Network (WSN)</p>
        </div>

        {/* Global Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Thermometer size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Rata-rata Suhu</h3>
            </div>
            <p className="text-3xl font-bold text-blue-700">{avgTemp}°C</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Droplets size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Rata-rata Kelembapan</h3>
            </div>
            <p className="text-3xl font-bold text-green-700">{avgHumidity}%</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gray-500 p-2 rounded-lg">
                <Activity size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Status Sensor</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xl font-bold text-gray-700">Aktif</p>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-6">
          <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
            <RefreshCw size={18} />
            Refresh Data
          </button>
        </div>

        {/* Pools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poolsData.map((pool) => (
            <div key={pool.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-t-lg">
                <h3 className="text-lg font-semibold">{pool.name}</h3>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Temperature */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <Thermometer size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Suhu</p>
                      <p className="text-2xl font-bold text-gray-800">{pool.temp}°C</p>
                    </div>
                  </div>
                </div>

                {/* Humidity */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Droplets size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Kelembapan</p>
                      <p className="text-2xl font-bold text-gray-800">{pool.humidity}%</p>
                    </div>
                  </div>
                </div>

                {/* Last Update */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Update: {pool.lastUpdate} WIB</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-5 py-3 rounded-b-lg border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Lihat Riwayat →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-1 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Catatan Monitoring</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Data diperbarui otomatis setiap 5-10 menit dari sensor WSN</li>
                <li>Monitoring ini berfungsi sebagai visualisasi kondisi lingkungan kolam</li>
                <li>Tidak terhubung dengan sistem analisis gambar berbasis machine learning</li>
                <li>Sistem tidak melakukan pengambilan keputusan atau kontrol otomatis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NetworkMonitoringPage = () => {
    // Dummy data untuk monitoring jaringan WSN
    const networkData = [
      { node: 'Node-01', rssi: -68, snr: 8.5, uplink: 1247, packetLoss: 1.2, status: 'good', lastUpdate: '14:45:32' },
      { node: 'Node-02', rssi: -72, snr: 7.8, uplink: 1239, packetLoss: 2.1, status: 'good', lastUpdate: '14:45:28' },
      { node: 'Node-03', rssi: -85, snr: 5.2, uplink: 1198, packetLoss: 4.8, status: 'warning', lastUpdate: '14:45:35' },
      { node: 'Node-04', rssi: -70, snr: 8.1, uplink: 1243, packetLoss: 1.5, status: 'good', lastUpdate: '14:45:30' },
      { node: 'Node-05', rssi: -75, snr: 6.9, uplink: 1221, packetLoss: 2.9, status: 'good', lastUpdate: '14:45:33' },
      { node: 'Node-06', rssi: -92, snr: 3.8, uplink: 1156, packetLoss: 7.3, status: 'poor', lastUpdate: '14:45:29' },
    ];

    const avgRSSI = (networkData.reduce((sum, n) => sum + n.rssi, 0) / networkData.length).toFixed(1);
    const avgPacketLoss = (networkData.reduce((sum, n) => sum + n.packetLoss, 0) / networkData.length).toFixed(1);
    const activeNodes = networkData.filter(n => n.status !== 'offline').length;

    const getRSSIColor = (rssi) => {
      if (rssi >= -70) return 'text-green-600';
      if (rssi >= -80) return 'text-yellow-600';
      return 'text-red-600';
    };

    const getPacketLossColor = (loss) => {
      if (loss < 3) return 'text-green-600';
      if (loss < 5) return 'text-yellow-600';
      return 'text-red-600';
    };

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Monitoring Jaringan WSN
          </h2>
          <p className="text-gray-600">Evaluasi Kinerja Komunikasi LoRaWAN</p>
          <p className="text-sm text-gray-500 mt-1">
            Menampilkan parameter teknis jaringan WSN untuk evaluasi performa komunikasi data
          </p>
        </div>

        {/* Network Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Radio size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Node Aktif</h3>
            </div>
            <p className="text-3xl font-bold text-blue-700">{activeNodes}/6</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <Wifi size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Gateway Status</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xl font-bold text-gray-700">Online</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-500 p-2 rounded-lg">
                <TrendingUp size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Avg RSSI</h3>
            </div>
            <p className="text-3xl font-bold text-purple-700">{avgRSSI} dBm</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-700">Avg Packet Loss</h3>
            </div>
            <p className="text-3xl font-bold text-orange-700">{avgPacketLoss}%</p>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <select className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
              <option>Semua Node</option>
              <option>Node-01</option>
              <option>Node-02</option>
              <option>Node-03</option>
              <option>Node-04</option>
              <option>Node-05</option>
              <option>Node-06</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
            <RefreshCw size={18} />
            Refresh Data
          </button>
        </div>

        {/* Network Monitoring Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Node
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    RSSI (dBm)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    SNR (dB)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Uplink Packet
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Packet Loss (%)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Update Terakhir
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {networkData.map((node, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          node.status === 'good' ? 'bg-green-500' :
                          node.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                        <span className="font-mono text-sm font-medium text-gray-800">{node.node}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-mono text-sm font-semibold ${getRSSIColor(node.rssi)}`}>
                        {node.rssi}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-700">{node.snr}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-700">{node.uplink.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-mono text-sm font-semibold ${getPacketLossColor(node.packetLoss)}`}>
                        {node.packetLoss}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock size={14} />
                        <span className="font-mono">{node.lastUpdate}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signal Quality Legend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Indikator Kualitas Sinyal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-medium text-gray-600 uppercase mb-3">RSSI (Received Signal Strength Indicator)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Baik: ≥ -70 dBm</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Sedang: -70 sampai -80 dBm</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Lemah: &lt; -80 dBm</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-600 uppercase mb-3">Packet Loss</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Baik: &lt; 3%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Sedang: 3% - 5%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Buruk: &gt; 5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-1 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Catatan Teknis</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Menu ini menampilkan parameter jaringan komunikasi WSN menggunakan protokol LoRaWAN</li>
                <li>RSSI (Received Signal Strength Indicator): mengukur kekuatan sinyal yang diterima</li>
                <li>SNR (Signal-to-Noise Ratio): rasio sinyal terhadap noise dalam dB</li>
                <li>Packet Loss: persentase paket data yang hilang dalam transmisi</li>
                <li>Data ini digunakan untuk evaluasi teknis dan penelitian, bukan operasional budidaya</li>
                <li>Menu ini tidak menampilkan data sensor lingkungan (suhu/kelembapan)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Preview Laporan</h3>
          <button
            onClick={() => setShowReport(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          {/* Report Content */}
          <div className="bg-white border-2 border-gray-300 p-8 rounded">
            {/* Header Section */}
            <div className="border-b-2 border-gray-800 pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    LAPORAN HASIL ANALISIS KONDISI MAGGOT
                  </h1>
                  <p className="text-sm text-gray-600">Sistem Analisis Berbasis Machine Learning</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-gray-800">Universitas XYZ</p>
                  <p className="text-gray-600">Program Studi Informatika</p>
                </div>
              </div>
            </div>

            {/* Analysis Information */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3 bg-gray-100 px-3 py-2">
                Informasi Analisis
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600 w-1/3">ID Analisis</td>
                    <td className="py-2 text-gray-800 font-mono">BSF-2024-001234</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600">Tanggal Analisis</td>
                    <td className="py-2 text-gray-800">19 Desember 2024</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600">Waktu Analisis</td>
                    <td className="py-2 text-gray-800">14:35:22 WIB</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600">Platform</td>
                    <td className="py-2 text-gray-800">Google Cloud Platform</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Image Information */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3 bg-gray-100 px-3 py-2">
                Informasi Gambar
              </h2>
              <table className="w-full text-sm mb-4">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600 w-1/3">Nama File</td>
                    <td className="py-2 text-gray-800 font-mono">maggot_sample_001.jpg</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600">Ukuran File</td>
                    <td className="py-2 text-gray-800">2.4 MB</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-gray-600">Dimensi</td>
                    <td className="py-2 text-gray-800">1920 × 1080 pixels</td>
                  </tr>
                </tbody>
              </table>
              <div className="bg-gray-100 border border-gray-300 h-48 flex items-center justify-center rounded">
                <span className="text-gray-500 text-sm">[Preview Gambar Maggot yang Dianalisis]</span>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3 bg-gray-100 px-3 py-2">
                Hasil Analisis Machine Learning
              </h2>
              <table className="w-full text-sm border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b border-gray-300 px-3 py-2 text-left text-gray-700">Parameter</th>
                    <th className="border-b border-gray-300 px-3 py-2 text-left text-gray-700">Hasil</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">Fase Pertumbuhan</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800 font-semibold">Larva</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">Status Kondisi</td>
                    <td className="border-b border-gray-200 px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                        <CheckCircle size={16} />
                        Normal
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">Tingkat Kepercayaan</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800 font-semibold">92.3%</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600">Durasi Inferensi</td>
                    <td className="px-3 py-2 text-gray-800">2.3 detik</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Environmental Data */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3 bg-blue-100 px-3 py-2">
                Data Lingkungan Saat Analisis
              </h2>
              <table className="w-full text-sm border border-gray-300 mb-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b border-gray-300 px-3 py-2 text-left text-gray-700">Parameter</th>
                    <th className="border-b border-gray-300 px-3 py-2 text-left text-gray-700">Nilai Terukur</th>
                    <th className="border-b border-gray-300 px-3 py-2 text-left text-gray-700">Rentang Optimal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">Suhu Lingkungan</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800 font-semibold">28.5°C</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">27-30°C</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">Kelembapan</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800 font-semibold">72%</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">60-80%</td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">Sumber Data</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800">Node WSN-01</td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-600">-</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-gray-600">Waktu Pengukuran</td>
                    <td className="px-3 py-2 text-gray-800">14:35:15 WIB</td>
                    <td className="px-3 py-2 text-gray-600">-</td>
                  </tr>
                </tbody>
              </table>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-gray-700">
                <strong>Catatan:</strong> Data sensor lingkungan ditampilkan sebagai konteks pendukung interpretasi,
                bukan sebagai input model machine learning.
              </div>
            </div>

            {/* Interpretation */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3 bg-gray-100 px-3 py-2">
                Interpretasi Hasil
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 border border-gray-200 rounded">
                <p className="mb-3">
                  Berdasarkan analisis menggunakan model machine learning, maggot yang terdeteksi pada gambar
                  menunjukkan <strong>kondisi NORMAL</strong> dengan tingkat kepercayaan model sebesar 92.3%.
                  Karakteristik visual maggot sesuai dengan standar fase larva yang sehat.
                </p>
                <p className="mb-3">
                  Data lingkungan yang tercatat menunjukkan parameter yang mendukung: suhu 28.5°C berada dalam
                  rentang optimal (27-30°C) dan kelembapan 72% berada dalam rentang optimal (60-80%).
                </p>
                <p className="text-green-700 font-medium">
                  ✓ Kondisi visual maggot dan parameter lingkungan menunjukkan keadaan yang sesuai untuk
                  pertumbuhan optimal maggot BSF fase larva.
                </p>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase mb-3 bg-gray-100 px-3 py-2">
                Catatan Penting
              </h2>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded text-xs text-gray-700 leading-relaxed">
                <ul className="list-disc list-inside space-y-1">
                  <li>Laporan ini dihasilkan oleh sistem analisis berbasis machine learning untuk keperluan penelitian akademik.</li>
                  <li>Hasil analisis merupakan prediksi otomatis dan sebaiknya dikombinasikan dengan observasi manual oleh praktisi yang berpengalaman.</li>
                  <li>Tingkat kepercayaan menunjukkan tingkat keyakinan model terhadap prediksi yang dihasilkan.</li>
                  <li>Sistem ini dikembangkan sebagai alat bantu penelitian dan tidak menggantikan pemeriksaan langsung secara menyeluruh.</li>
                  <li>Untuk informasi lebih lanjut, silakan menghubungi pengembang sistem atau merujuk pada dokumentasi penelitian.</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-300 pt-4 mt-8">
              <div className="flex justify-between items-end text-xs text-gray-600">
                <div>
                  <p className="font-semibold">Sistem Analisis Kondisi Maggot BSF</p>
                  <p>Powered by Machine Learning & Google Cloud Platform</p>
                </div>
                <div className="text-right">
                  <p>Halaman 1 dari 1</p>
                  <p className="text-gray-500">Digenerate secara otomatis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setShowReport(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => alert('Dalam versi mockup, fitur download tidak berfungsi. Pada implementasi nyata, file PDF akan diunduh.')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Download size={20} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
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
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'upload' && <UploadPage />}
        {currentPage === 'result' && <ResultPage />}
        {currentPage === 'monitoring' && <MonitoringPage />}
        {currentPage === 'network' && <NetworkMonitoringPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>
      <Footer />
      {showReport && <ReportModal />}
    </div>
  );
};

export default MaggotDashboard;
