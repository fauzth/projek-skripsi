import MainLayout from "@/Layouts/MainLayout";
import React, { useEffect, useState } from "react";
import {
    Thermometer,
    Droplets,
    Activity,
    RefreshCw,
    Clock,
    Info,
} from "lucide-react";

export default function MonitoringKolam() {
    const [sensorData, setSensorData] = useState(null);

    // Ambil data dari backend (MQTT → Cache)
    const fetchSensorData = () => {
        fetch("/sensor/latest")
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setSensorData(data);
                }
            })
            .catch((err) => console.error(err));
    };

    // Auto refresh tiap 3 detik
    useEffect(() => {
        fetchSensorData();
        const interval = setInterval(fetchSensorData, 3000);
        return () => clearInterval(interval);
    }, []);

    // Kalau data belum ada
    if (!sensorData) {
        return (
            <MainLayout>
                <div className="p-6">
                    <p>Menunggu data sensor...</p>
                </div>
            </MainLayout>
        );
    }

    // SEMENTARA: 1 data dipakai untuk semua kolam
    const poolsData = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: `Kolam ${i + 1}`,
        temp: sensorData.temperature,
        humidity: sensorData.humidity,
        lastUpdate: new Date(sensorData.received_at).toLocaleTimeString(
            "id-ID"
        ),
        status: "active",
    }));

    const avgTemp = (
        poolsData.reduce((sum, pool) => sum + pool.temp, 0) / poolsData.length
    ).toFixed(1);

    const avgHumidity = (
        poolsData.reduce((sum, pool) => sum + pool.humidity, 0) /
        poolsData.length
    ).toFixed(1);

    return (
        <MainLayout>
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
                <div className="flex flex-col gap-2 mb-8">
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
                    <button
                        onClick={fetchSensorData}
                        className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        <RefreshCw size={18} />
                        Refresh Data
                    </button>
                </div>

                {/* Pools Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {poolsData.map((pool) => (
                        <div
                            key={pool.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm"
                        >
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-t-lg">
                                <h3 className="text-lg font-semibold">
                                    {pool.name}
                                </h3>
                            </div>

                            <div className="p-5">
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500">
                                        Suhu
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {pool.temp}°C
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-xs text-gray-500">
                                        Kelembapan
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {pool.humidity}%
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock size={16} />
                                    Update: {pool.lastUpdate} WIB
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                        <Info size={20} className="text-blue-600 mt-1" />
                        <p className="text-sm text-gray-700">
                            Data ditampilkan secara real-time dari backend
                            melalui MQTT (simulasi).
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
