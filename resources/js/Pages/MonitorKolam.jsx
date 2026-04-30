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

    const safePools = Array.isArray(poolsData) ? poolsData : [];

    // =========================
    // 🔥 AVERAGE (UDARA)
    // =========================
const latestTempUdara =
    safePools
        .filter(p => p.temp_udara !== null)
        .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))[0]
        ?.temp_udara ?? 0;

const latestHumUdara =
    safePools
        .filter(p => p.hum_udara !== null)
        .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))[0]
        ?.hum_udara ?? 0;

    // =========================
    // 🔥 AVERAGE CAHAYA
    // =========================
    const avgCahaya =
        safePools.length > 0
            ? (
                  safePools.reduce(
                      (sum, pool) =>
                          sum + Number(pool.intensitas_cahaya || 0),
                      0
                  ) / safePools.length
              ).toFixed(1)
            : 0;

    return (
        <MainLayout>
            <div className="w-full mx-auto px-6">
                {/* HEADER */}
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                        Monitoring Kondisi Kolam Maggot
                    </h2>
                    <p className="text-gray-600">
                        Data lingkungan berbasis Wireless Sensor Network (WSN)
                    </p>
                </div>

                {/* ========================= */}
                {/* 🔥 SUMMARY */}
                {/* ========================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                    {/* SUHU UDARA */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-blue-500 p-2 rounded-lg">
                                <Thermometer size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Rata-rata Suhu Udara
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-700">
                            {latestTempUdara}°C
                        </p>
                    </div>

                    {/* KELEMBAPAN UDARA */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-green-500 p-2 rounded-lg">
                                <Droplets size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Rata-rata Kelembapan Udara
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-green-700">
                            {latestHumUdara}%
                        </p>
                    </div>

                    {/* INTENSITAS CAHAYA */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-yellow-500 p-2 rounded-lg">
                                <Activity size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Rata-rata Intensitas Cahaya
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-yellow-700">
                            {avgCahaya}
                        </p>
                    </div>
                </div>

                {/* REFRESH */}
                <div className="flex justify-end mb-6">
                    <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg">
                        <RefreshCw size={18} />
                        Refresh Data
                    </button>
                </div>

                {/* ========================= */}
                {/* 🔥 CARD (CUMA 3 KOLAM) */}
                {/* ========================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {safePools.slice(0, 3).map((pool) => (
                        <div
                            key={pool.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm"
                        >
                            {/* HEADER */}
                            <div className="bg-blue-500 text-white px-5 py-3 rounded-t-lg">
                                <h3 className="text-lg font-semibold">
                                    {pool.name}
                                </h3>
                            </div>

                            {/* BODY */}
                            <div className="p-5">

                                {/* SUHU PAKAN */}
                                <div className="mb-4 pb-4 border-b">
                                    <p className="text-xs text-gray-500 uppercase">
                                        Suhu Pakan
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {pool.temp_pakan ?? 0}°C
                                    </p>
                                </div>

                                {/* KELEMBAPAN PAKAN */}
                                <div className="mb-4 pb-4 border-b">
                                    <p className="text-xs text-gray-500 uppercase">
                                        Kelembapan Pakan
                                    </p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {pool.hum_pakan ?? 0}%
                                    </p>
                                </div>

                                {/* UPDATE */}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock size={16} />
                                    <span>
                                        Update: {pool.received_at || "-"} WIB
                                    </span>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="bg-gray-50 px-5 py-3 rounded-b-lg border-t">
                                <button className="text-sm text-blue-600 hover:text-blue-700">
                                    Lihat Riwayat →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ========================= */}
                {/* INFO */}
                {/* ========================= */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                        <Info size={20} className="text-blue-600 mt-1" />
                        <div className="text-sm text-gray-700">
                            <p className="font-medium mb-1">
                                Catatan Monitoring
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Data diambil dari sensor WSN</li>
                                <li>Menampilkan kondisi real-time lingkungan</li>
                                <li>Tidak ada kontrol otomatis</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}