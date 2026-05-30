import MainLayout from "@/Layouts/MainLayout";
import React, { useState } from "react";
import {
    Thermometer,
    Droplets,
    Activity,
    RefreshCw,
    Clock,
    Info,
    ImageIcon,
    BarChart2,
    X,
} from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function MonitoringKolam() {
    const { poolsData = [] } = usePage().props;
    const safePools = Array.isArray(poolsData) ? poolsData : [];

    const [selectedPool, setSelectedPool] = useState(null);

    const latestTempUdara =
        safePools
            .filter((p) => p.temp_udara !== null)
            .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))[0]
            ?.temp_udara ?? 0;

    const latestHumUdara =
        safePools
            .filter((p) => p.hum_udara !== null)
            .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))[0]
            ?.hum_udara ?? 0;

    const avgCahaya =
        safePools.length > 0
            ? (
                  safePools.reduce(
                      (sum, pool) => sum + Number(pool.intensitas_cahaya || 0),
                      0,
                  ) / safePools.length
              ).toFixed(1)
            : 0;

    const activePool = safePools.find((p) => p.id === selectedPool) ?? null;

    const historyData = safePools
        .filter((p) => p.id === selectedPool || p.pool_id === selectedPool)
        .sort((a, b) => new Date(b.received_at) - new Date(a.received_at))
        .slice(0, 10);

    // ✅ Fixed: tidak lagi memanggil setDetailTab
    const handleSelectPool = (pool) => setSelectedPool(pool.id);
    const handleClose = () => setSelectedPool(null);

    return (
        <MainLayout>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .pool-card-enter { animation: fadeIn 0.35s ease forwards; }
                .detail-enter    { animation: fadeIn 0.4s ease 0.1s forwards; opacity: 0; }
            `}</style>

            <div className="w-full h-full flex flex-col px-6 py-4 gap-4">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
                            Monitoring Kondisi Kolam Maggot
                        </h2>
                        <p className="text-sm text-gray-500">
                            Data lingkungan berbasis Wireless Sensor Network (WSN)
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
                        <RefreshCw size={15} />
                        Refresh Data
                    </button>
                </div>

                {/* BODY */}
                <div className="flex gap-4 flex-1 min-h-0">

                    {/* LEFT: SUMMARY CARDS */}
                    <div className="flex flex-col gap-3 w-56 shrink-0">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-blue-500 p-1.5 rounded-lg">
                                    <Thermometer size={16} className="text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Rata-rata Suhu Udara</span>
                            </div>
                            <p className="text-3xl font-bold text-blue-700">{latestTempUdara}°C</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-green-500 p-1.5 rounded-lg">
                                    <Droplets size={16} className="text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Rata-rata Kelembapan Udara</span>
                            </div>
                            <p className="text-3xl font-bold text-green-700">{latestHumUdara}%</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-yellow-500 p-1.5 rounded-lg">
                                    <Activity size={16} className="text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Rata-rata Intensitas Cahaya</span>
                            </div>
                            <p className="text-3xl font-bold text-yellow-700">{avgCahaya}</p>
                        </div>
                    </div>

                    {/* RIGHT: POOL AREA */}
                    <div className="flex gap-4 flex-1 min-w-0">

                        {/* ── MODE NORMAL: 3 card ── */}
                        {!selectedPool && safePools.slice(0, 3).map((pool) => (
                            
                            <div
                                key={pool.id}
                                className="pool-card-enter bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col flex-1 min-w-0"
                            >
                                <div className="bg-blue-500 text-white px-4 py-2.5 rounded-t-lg">
                                    <h3 className="text-base font-semibold">{pool.name}</h3>
                                </div>
                                <div className="p-4 flex flex-col gap-3 flex-1">
                                    <div className="pb-3 border-b">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Suhu Pakan</p>
                                        <p className="text-2xl font-bold text-gray-800">{pool.temp_pakan ?? 0}°C</p>
                                    </div>
                                    <div className="pb-3 border-b">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Kelembapan Pakan</p>
                                        <p className="text-2xl font-bold text-gray-800">{pool.hum_pakan ?? 0}%</p>
                                    </div>
                                    <div className="pb-3 border-b">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Kepadatan Maggot</p>
                                        <p className="text-2xl font-bold text-gray-800">{pool.density ?? 0}%</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Clock size={13} />
                                        <span>Update: {pool.received_at || "-"} WIB</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-2.5 rounded-b-lg border-t">
                                    <button
                                        onClick={() => handleSelectPool(pool)}
                                        className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1.5 py-0.5 transition-colors"
                                    >
                                        <BarChart2 size={14} />
                                        Lihat Riwayat
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* ── MODE DETAIL: full width ── */}
                        {selectedPool && activePool && (
                            <div className="detail-enter flex-1 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col min-w-0 overflow-hidden">

                                {/* Header */}
                                <div className="bg-blue-500 text-white px-5 py-3 rounded-t-lg flex items-center justify-between shrink-0">
                                    <div>
                                        <h3 className="text-base font-semibold">
                                            Riwayat &amp; Kondisi — {activePool.name}
                                        </h3>
                                        <p className="text-xs text-blue-100">Gambar ESP-CAM &amp; data sensor historis</p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="bg-blue-400 hover:bg-blue-300 p-1.5 rounded-lg transition-colors"
                                        title="Tutup"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 overflow-hidden p-4 flex flex-col gap-3">

                                    {/* BARIS ATAS: gambar kiri + tabel riwayat kanan */}
                                    <div className="flex gap-4 flex-1 min-h-0">

                                        {/* Foto ESP-CAM */}
                                        <div className="shrink-0 w-64 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                                            {activePool.image_url ? (
                                                <img
                                                    src={activePool.image_url}
                                                    alt={`Kondisi ${activePool.name}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center text-gray-400 p-4">
                                                    <ImageIcon size={32} className="mx-auto mb-2 opacity-30" />
                                                    <p className="text-xs text-gray-400">Belum ada gambar</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Tabel riwayat */}
                                        <div className="flex-1 flex flex-col min-w-0 min-h-0">
                                            <div className="flex items-center gap-2 mb-2 shrink-0">
                                                <BarChart2 size={13} className="text-gray-400" />
                                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Riwayat Data</span>
                                            </div>
                                            {historyData.length > 0 ? (
                                                <div className="flex-1 overflow-auto rounded-lg border border-gray-200 min-h-0">
                                                    <table className="w-full text-sm">
                                                        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                                                            <tr>
                                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">Waktu</th>
                                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Suhu Pakan</th>
                                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Kel. Pakan</th>
                                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Kepadatan</th>
                                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Int. Cahaya</th>
                                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Suhu Udara</th>
                                                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Kel. Udara</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100">
                                                            {historyData.map((row, idx) => (
                                                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                                    <td className="px-3 py-2 text-xs text-gray-400 font-mono whitespace-nowrap">{row.received_at || "-"}</td>
                                                                    <td className="px-3 py-2 text-xs font-semibold text-blue-700">{row.temp_pakan ?? "-"}°C</td>
                                                                    <td className="px-3 py-2 text-xs font-semibold text-green-700">{row.hum_pakan ?? "-"}%</td>
                                                                    <td className="px-3 py-2 text-xs font-semibold text-purple-700">{row.density ?? "-"}%</td>
                                                                    <td className="px-3 py-2 text-xs font-semibold text-yellow-700">{row.intensitas_cahaya ?? "-"}</td>
                                                                    <td className="px-3 py-2 text-xs text-gray-600">{row.temp_udara ?? "-"}°C</td>
                                                                    <td className="px-3 py-2 text-xs text-gray-600">{row.hum_udara ?? "-"}%</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 border border-gray-200 rounded-lg">
                                                    <BarChart2 size={28} className="opacity-25 mb-2" />
                                                    <p className="text-sm text-gray-500">Belum ada data riwayat</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* BARIS BAWAH: 3 chip data terkini sejajar + timestamp */}
                                    <div className="flex items-center gap-3 shrink-0 pt-2 border-t border-gray-100">
                                        <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 flex items-center flex-1">
                                            <span className="text-xs text-gray-500">Suhu Pakan</span>
                                            <span className="text-base font-bold text-blue-700 ml-auto">{activePool.temp_pakan ?? 0}°C</span>
                                        </div>
                                        <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-2 flex items-center flex-1">
                                            <span className="text-xs text-gray-500">Kelembapan Pakan</span>
                                            <span className="text-base font-bold text-green-700 ml-auto">{activePool.hum_pakan ?? 0}%</span>
                                        </div>
                                        <div className="bg-purple-50 border border-purple-100 rounded-lg px-4 py-2 flex items-center flex-1">
                                            <span className="text-xs text-gray-500">Kepadatan Maggot</span>
                                            <span className="text-base font-bold text-purple-700 ml-auto">{activePool.density ?? 0}%</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                                            <Clock size={11} />
                                            <span className="whitespace-nowrap">{activePool.received_at || "-"} WIB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* INFO BAR */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                    <Info size={16} className="text-blue-600 shrink-0" />
                    <p className="text-xs text-gray-600">
                        <span className="font-medium text-gray-700">Catatan: </span>
                        Data diambil dari sensor WSN &nbsp;·&nbsp; Menampilkan kondisi real-time &nbsp;·&nbsp; Tidak ada kontrol otomatis
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
