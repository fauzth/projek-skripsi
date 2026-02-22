import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import {
    Radio,
    Wifi,
    TrendingUp,
    AlertTriangle,
    RefreshCw,
    Clock,
    Info,
} from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function MonitoringJaringan() {
    const { avgQoS = null, qosLogs = [] } = usePage().props;

    const networkData = Array.isArray(qosLogs)
        ? qosLogs.map((log) => ({
              node: "Gateway",
              rssi: log.throughput ?? 0, // Kolom Throughput (Kbps)
              snr: log.delay ?? 0, // Kolom Delay (ms)
              uplink: log.jitter ?? 0, // Kolom Jitter (ms)
              packetLoss: log.packet_loss ?? 0,
              status:
                  (log.packet_loss ?? 0) < 3
                      ? "good"
                      : (log.packet_loss ?? 0) < 5
                        ? "warning"
                        : "poor",
              lastUpdate: log.tested_at
                  ? new Date(log.tested_at).toLocaleTimeString()
                  : "-",
          }))
        : [];


    const avgThroughput = avgQoS ? avgQoS.throughput : 0;
    const avgDelay = avgQoS ? avgQoS.delay : 0;
    const avgPacketLoss = avgQoS ? avgQoS.packet_loss : 0;
    const activeNodes = 6; // karena hanya 1 gateway

    const getRSSIColor = (rssi) => {
        if (rssi >= -70) return "text-green-600";
        if (rssi >= -80) return "text-yellow-600";
        return "text-red-600";
    };

    const getPacketLossColor = (loss) => {
        if (loss < 3) return "text-green-600";
        if (loss < 5) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                        Monitoring Jaringan WSN
                    </h2>
                    <p className="text-gray-600">
                        Evaluasi Kinerja Komunikasi LoRaWAN
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Menampilkan parameter teknis jaringan WSN untuk evaluasi
                        performa komunikasi data
                    </p>
                </div>

                {/* Network Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-green-500 p-2 rounded-lg">
                                <Wifi size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Gateway Status
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-xl font-bold text-gray-700">
                                ONLINE!!
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-purple-500 p-2 rounded-lg">
                                <TrendingUp size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Avg Throughput
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-700">
                            {avgThroughput} Kbps
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-orange-500 p-2 rounded-lg">
                                <AlertTriangle
                                    size={24}
                                    className="text-white"
                                />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Avg Delay
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-700">
                            {avgDelay}ms
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-blue-500 p-2 rounded-lg">
                                <Radio size={24} className="text-white" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-700">
                                Avg Packet Loss
                            </h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-700">
                            {avgPacketLoss} %
                        </p>
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-between items-center mb-6">
                    {/* <div className="flex gap-3">
                        <select className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                            <option>Semua Node</option>
                            <option>Node-01</option>
                            <option>Node-02</option>
                            <option>Node-03</option>
                            <option>Node-04</option>
                            <option>Node-05</option>
                            <option>Node-06</option>
                        </select>
                    </div> */}
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
                                        Throughput (Kbps)
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Delay (ms)
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Jitter (ms)
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
                                    <tr
                                        key={idx}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${
                                                        node.status === "good"
                                                            ? "bg-green-500"
                                                            : node.status ===
                                                                "warning"
                                                              ? "bg-yellow-500"
                                                              : "bg-red-500"
                                                    }`}
                                                ></div>
                                                <span className="font-mono text-sm font-medium text-gray-800">
                                                    {node.node}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`font-mono text-sm font-semibold ${getRSSIColor(node.rssi)}`}
                                            >
                                                {node.rssi}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm text-gray-700">
                                                {node.snr}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm text-gray-700">
                                                {node.uplink.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`font-mono text-sm font-semibold ${getPacketLossColor(node.packetLoss)}`}
                                            >
                                                {node.packetLoss}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Clock size={14} />
                                                <span className="font-mono">
                                                    {node.lastUpdate}
                                                </span>
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
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                        Indikator Kualitas Jaringan (QoS IP)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Delay */}
                        <div>
                            <h4 className="text-xs font-medium text-gray-600 uppercase mb-3">
                                Delay (ms)
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Baik: &lt; 50 ms
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Sedang: 50 – 150 ms
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Buruk: &gt; 150 ms
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Packet Loss */}
                        <div>
                            <h4 className="text-xs font-medium text-gray-600 uppercase mb-3">
                                Packet Loss (%)
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Baik: &lt; 3%
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Sedang: 3% – 5%
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Buruk: &gt; 5%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Throughput */}
                        <div>
                            <h4 className="text-xs font-medium text-gray-600 uppercase mb-3">
                                Throughput (Kbps)
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Baik: ≥ 10 Kbps
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Sedang: 5 – 10 Kbps
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Rendah: &lt; 5 Kbps
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Jitter */}
                        <div>
                            <h4 className="text-xs font-medium text-gray-600 uppercase mb-3">
                                Jitter (ms)
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Baik: &lt; 10 ms
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Sedang: 10 – 30 ms
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-gray-700">
                                        Buruk: &gt; 30 ms
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Info Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                        <Info
                            size={20}
                            className="text-blue-600 mt-1 flex-shrink-0"
                        />
                        <div className="text-sm text-gray-700">
                            <p className="font-medium mb-1">Catatan Teknis</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>
                                    Menu ini menampilkan parameter jaringan
                                    komunikasi WSN menggunakan protokol LoRaWAN
                                </li>
                                <li>
                                    RSSI (Received Signal Strength Indicator):
                                    mengukur kekuatan sinyal yang diterima
                                </li>
                                <li>
                                    SNR (Signal-to-Noise Ratio): rasio sinyal
                                    terhadap noise dalam dB
                                </li>
                                <li>
                                    Packet Loss: persentase paket data yang
                                    hilang dalam transmisi
                                </li>
                                <li>
                                    Data ini digunakan untuk evaluasi teknis dan
                                    penelitian, bukan operasional budidaya
                                </li>
                                <li>
                                    Menu ini tidak menampilkan data sensor
                                    lingkungan (suhu/kelembapan)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
