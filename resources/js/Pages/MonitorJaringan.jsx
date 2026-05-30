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
    Server,
} from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function MonitoringJaringan() {
    const { avgQoS = null, qosLogs = [], nodeLogs = [] } = usePage().props;

    const avgThroughput = avgQoS ? avgQoS.throughput : 0;
    const avgDelay      = avgQoS ? avgQoS.delay       : 0;
    const avgPacketLoss = avgQoS ? avgQoS.packet_loss  : 0;

    const safeQosLogs  = Array.isArray(qosLogs)  ? qosLogs  : [];
    const safeNodeLogs = Array.isArray(nodeLogs) ? nodeLogs : [];

    const nodeNames = ["Node-1 (Kolam 1)", "Node-2 (Kolam 2)", "Node-3 (Kolam 3)"];

    // End Node: pakai RSSI & SNR dari nodeLogs
    const nodeRows = nodeNames.map((name, i) => {
        const nodeId = i + 1;
        const log =
            safeNodeLogs.find((l) => Number(l.node_id) === nodeId) ??
            safeNodeLogs[i] ??
            null;

        const rssi = log?.rssi ?? "-";
        const snr  = log?.snr  ?? "-";

        const status =
            log === null    ? "offline"
            : rssi === "-"  ? "offline"
            : rssi >= -70   ? "good"
            : rssi >= -90   ? "warning"
            : "poor";

        const ts = log?.received_at ?? log?.tested_at ?? null;

        return {
            name, rssi, snr, status,
            lastUpdate: ts
                ? new Date(ts).toLocaleTimeString("id-ID", {
                      hour: "2-digit", minute: "2-digit", second: "2-digit",
                  })
                : "-",
        };
    });

    // Gateway: pakai QoS log terbaru
    const gatewayLog = safeQosLogs
        .slice()
        .sort((a, b) => new Date(b.tested_at) - new Date(a.tested_at))[0];

    // ── Warna helpers ──
    const getRSSIColor = (v) => {
        if (v === "-") return "text-gray-400";
        if (v >= -70)  return "text-green-600";
        if (v >= -90)  return "text-yellow-600";
        return "text-red-600";
    };
    const getSNRColor = (v) => {
        if (v === "-") return "text-gray-400";
        if (v >= 5)    return "text-green-600";
        if (v >= 0)    return "text-yellow-600";
        return "text-red-600";
    };
    const getThroughputColor = (v) => {
        if (v === "-") return "text-gray-400";
        if (v >= 10)   return "text-green-600";
        if (v >= 5)    return "text-yellow-600";
        return "text-red-600";
    };
    const getDelayColor = (v) => {
        if (v === "-") return "text-gray-400";
        if (v < 50)    return "text-green-600";
        if (v < 150)   return "text-yellow-600";
        return "text-red-600";
    };
    const getJitterColor = (v) => {
        if (v === "-") return "text-gray-400";
        if (v < 10)    return "text-green-600";
        if (v < 30)    return "text-yellow-600";
        return "text-red-600";
    };
    const getPacketLossColor = (v) => {
        if (v === "-") return "text-gray-400";
        if (v < 3)     return "text-green-600";
        if (v < 5)     return "text-yellow-600";
        return "text-red-600";
    };

    const statusDot = {
        good: "bg-green-500",
        warning: "bg-yellow-500",
        poor: "bg-red-500",
        offline: "bg-gray-400",
    };

    const LegendGroup = ({ label, items }) => (
        <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {label}
            </p>
            <div className="flex flex-col gap-1">
                {items.map((item) => (
                    <div key={item.text} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 ${item.color} rounded-full shrink-0`} />
                        <span className="text-xs text-gray-600">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <MainLayout>
            <div className="w-full h-full flex flex-col px-6 py-1 gap-2 ">

                {/* ── HEADER + REFRESH ── */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
                            Monitoring Jaringan WSN
                        </h2>
                        <p className="text-sm text-gray-500">
                            Evaluasi Kinerja Komunikasi LoRaWAN
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
                        <RefreshCw size={15} />
                        Refresh Data
                    </button>
                </div>

                {/* ── MAIN BODY ── */}
                <div className="flex gap-4 flex-1 min-h-0">

                    {/* LEFT: SUMMARY CARDS vertikal */}
                    <div className="flex flex-col gap-3 w-56 shrink-0">

                        {/* Gateway Status */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-green-500 p-1.5 rounded-lg">
                                    <Wifi size={16} className="text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Gateway Status</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                <p className="text-xl font-bold text-green-700">ONLINE</p>
                            </div>
                            {gatewayLog?.tested_at && (
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                    <Clock size={11} />
                                    {new Date(gatewayLog.tested_at).toLocaleTimeString("id-ID", {
                                        hour: "2-digit", minute: "2-digit", second: "2-digit",
                                    })}
                                </p>
                            )}
                        </div>

                        {/* Avg Throughput */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-purple-500 p-1.5 rounded-lg">
                                    <TrendingUp size={16} className="text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Avg Throughput</span>
                            </div>
                            <p className="text-3xl font-bold text-purple-700">{avgThroughput}</p>
                            <p className="text-xs text-purple-400">Kbps</p>
                        </div>

                        {/* Avg Delay */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-orange-500 p-1.5 rounded-lg">
                                    <AlertTriangle size={16} className="text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Avg Delay</span>
                            </div>
                            <p className="text-3xl font-bold text-orange-700">{avgDelay}</p>
                            <p className="text-xs text-orange-400">ms</p>
                        </div>

                        {/* Avg Packet Loss */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 flex-1 flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-blue-500 p-1.5 rounded-lg">
                                    <Radio size={16} className="text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-600">Avg Packet Loss</span>
                            </div>
                            <p className="text-3xl font-bold text-blue-700">{avgPacketLoss}</p>
                            <p className="text-xs text-blue-400">%</p>
                        </div>
                    </div>

                    {/* RIGHT: TABEL (atas) + LEGEND QoS (bawah) */}
                    <div className="flex flex-col gap-3 flex-1 min-w-0">

                        {/* TABEL NODE & GATEWAY */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex-1">
                            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                                <Server size={14} className="text-gray-500" />
                                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                    Status Node &amp; Gateway
                                </span>
                            </div>
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Perangkat</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Throughput (Kbps)</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Packet Loss (%)</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Delay (ms)</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Jitter (ms)</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">RSSI (dBm)</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">SNR (dB)</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Update</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">

                                    {/* GATEWAY ROW — QoS terisi, RSSI/SNR kosong */}
                                    <tr className="bg-green-50 hover:bg-green-100 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="font-mono font-medium text-gray-800 text-xs">Gateway</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`font-mono font-semibold text-xs ${getThroughputColor(gatewayLog?.throughput ?? "-")}`}>
                                                {gatewayLog?.throughput ?? "—"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`font-mono font-semibold text-xs ${getPacketLossColor(gatewayLog?.packet_loss ?? "-")}`}>
                                                {gatewayLog?.packet_loss != null ? `${gatewayLog.packet_loss}%` : "—"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`font-mono text-xs ${getDelayColor(gatewayLog?.delay ?? "-")}`}>
                                                {gatewayLog?.delay ?? "—"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`font-mono text-xs ${getJitterColor(gatewayLog?.jitter ?? "-")}`}>
                                                {gatewayLog?.jitter ?? "—"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 font-mono text-xs">—</td>
                                        <td className="px-4 py-3 text-gray-300 font-mono text-xs">—</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Clock size={11} />
                                                <span className="font-mono">
                                                    {gatewayLog?.tested_at
                                                        ? new Date(gatewayLog.tested_at).toLocaleTimeString("id-ID", {
                                                              hour: "2-digit", minute: "2-digit", second: "2-digit",
                                                          })
                                                        : "—"}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* END NODE ROWS — RSSI/SNR terisi, QoS kosong */}
                                    {nodeRows.map((node, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${statusDot[node.status]}`} />
                                                    <span className="font-mono font-medium text-gray-800 text-xs whitespace-nowrap">{node.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-300 font-mono text-xs">—</td>
                                            <td className="px-4 py-3 text-gray-300 font-mono text-xs">—</td>
                                            <td className="px-4 py-3 text-gray-300 font-mono text-xs">—</td>
                                            <td className="px-4 py-3 text-gray-300 font-mono text-xs">—</td>
                                            <td className="px-4 py-3">
                                                <span className={`font-mono font-semibold text-xs ${getRSSIColor(node.rssi)}`}>
                                                    {node.rssi !== "-" ? node.rssi : "—"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`font-mono text-xs ${getSNRColor(node.snr)}`}>
                                                    {node.snr !== "-" ? node.snr : "—"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Clock size={11} />
                                                    <span className="font-mono">{node.lastUpdate}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* INDIKATOR Kualitas Jaringan — 6 kolom */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                                Indikator Kualitas Jaringan
                            </h3>
                            <div className="grid grid-cols-6 gap-4">
                                <LegendGroup label="RSSI (dBm)" items={[
                                    { color: "bg-green-500", text: "Baik: ≥ -70" },
                                    { color: "bg-yellow-500", text: "Sedang: -90~-70" },
                                    { color: "bg-red-500", text: "Lemah: < -90" },
                                ]} />
                                <LegendGroup label="SNR (dB)" items={[
                                    { color: "bg-green-500", text: "Baik: ≥ 5" },
                                    { color: "bg-yellow-500", text: "Sedang: 0–5" },
                                    { color: "bg-red-500", text: "Buruk: < 0" },
                                ]} />
                                <LegendGroup label="Throughput (Kbps)" items={[
                                    { color: "bg-green-500", text: "Baik: ≥ 10" },
                                    { color: "bg-yellow-500", text: "Sedang: 5–10" },
                                    { color: "bg-red-500", text: "Rendah: < 5" },
                                ]} />
                                <LegendGroup label="Packet Loss (%)" items={[
                                    { color: "bg-green-500", text: "Baik: < 3%" },
                                    { color: "bg-yellow-500", text: "Sedang: 3–5%" },
                                    { color: "bg-red-500", text: "Buruk: > 5%" },
                                ]} />
                                <LegendGroup label="Delay (ms)" items={[
                                    { color: "bg-green-500", text: "Baik: < 50" },
                                    { color: "bg-yellow-500", text: "Sedang: 50–150" },
                                    { color: "bg-red-500", text: "Buruk: > 150" },
                                ]} />
                                <LegendGroup label="Jitter (ms)" items={[
                                    { color: "bg-green-500", text: "Baik: < 10" },
                                    { color: "bg-yellow-500", text: "Sedang: 10–30" },
                                    { color: "bg-red-500", text: "Buruk: > 30" },
                                ]} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* INFO BAR */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                    <Info size={15} className="text-blue-600 shrink-0" />
                    <p className="text-xs text-gray-600">
                        <span className="font-medium text-gray-700">Catatan: </span>
                        End Node: RSSI &amp; SNR (kualitas sinyal radio LoRa) · Gateway: Throughput, Packet Loss, Delay, Jitter (QoS jaringan) · Topologi: 3 End Node → 1 Gateway → Server
                    </p>
                </div>

            </div>
        </MainLayout>
    );
}
