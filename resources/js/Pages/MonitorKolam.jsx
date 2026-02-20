import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import {
    Thermometer,
    Droplets,
    Activity,
    RefreshCw,
    Clock,
    Info,
} from "lucide-react";

import { usePage } from "@inertiajs/react";

export default function MonitoringKolam() {
    const { poolsData = [] } = usePage().props;


console.log("TYPE:", typeof poolsData);
console.log("VALUE:", poolsData);


    const safePools = Array.isArray(poolsData) ? poolsData : [];

    const avgTemp =
        safePools.length > 0
            ? (
                  safePools.reduce(
                      (sum, pool) => sum + Number(pool.temperature),
                      0,
                  ) / safePools.length
              ).toFixed(1)
            : 0;

    const avgHumidity =
        safePools.length > 0
            ? (
                  safePools.reduce(
                      (sum, pool) => sum + Number(pool.humidity),
                      0,
                  ) / safePools.length
              ).toFixed(1)
            : 0;

    console.log(poolsData);

    return (
        <MainLayout>
            {/* <h1 className="text-2xl font-bold mb-4">Monitoring Kolam</h1>
      <p>Data sensor suhu, pH, dan kondisi kolam.</p> */}

            <div className="w-full mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                        Monitoring Kondisi Kolam Maggot
                    </h2>
                    <p className="text-gray-600">
                        Data lingkungan berbasis Wireless Sensor Network (WSN)
                    </p>
                </div>

                {/* Global Summary */}
                <div className="flex flex-col gap-2 mb-8 ">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-blue-500 p-2 rounded-lg">
                                <Thermometer size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Rata-rata Suhu
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-700">
                            {avgTemp}°C
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-green-500 p-2 rounded-lg">
                                <Droplets size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Rata-rata Kelembapan
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-green-700">
                            {avgHumidity}%
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gray-500 p-2 rounded-lg">
                                <Activity size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Status Sensor
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-xl font-bold text-gray-700">
                                Aktif
                            </p>
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
                        <div
                            key={pool.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-t-lg">
                                <h3 className="text-lg font-semibold">
                                    {pool.name}
                                </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-5">
                                {/* Temperature */}
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-100 p-2 rounded-lg">
                                            <Thermometer
                                                size={20}
                                                className="text-red-600"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Suhu
                                            </p>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {pool.temperature}°C
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Humidity */}
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <Droplets
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">
                                                Kelembapan
                                            </p>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {pool.humidity}%
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Last Update */}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock size={16} />
                                    <span>Update: {pool.received_at} WIB</span>
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
                        <Info
                            size={20}
                            className="text-blue-600 mt-1 flex-shrink-0"
                        />
                        <div className="text-sm text-gray-700">
                            <p className="font-medium mb-1">
                                Catatan Monitoring
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>
                                    Data diperbarui otomatis setiap 5-10 menit
                                    dari sensor WSN
                                </li>
                                <li>
                                    Monitoring ini berfungsi sebagai visualisasi
                                    kondisi lingkungan kolam
                                </li>
                                <li>
                                    Tidak terhubung dengan sistem analisis
                                    gambar berbasis machine learning
                                </li>
                                <li>
                                    Sistem tidak melakukan pengambilan keputusan
                                    atau kontrol otomatis
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
